import { User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

describe('AuthController (e2e)', () => {
  let app: INestApplication; // reference to the app instance

  beforeEach(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    // Start the Nestjs app instance to perform requests on
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    // request body validation
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        // Strip data of properties without decorators
        whitelist: true,

        // Throw an error if non-whitelisted values are provided
        forbidNonWhitelisted: true,

        // Throw an error if unknown values are provided
        forbidUnknownValues: true,
      })
    );
    await app.init();
  });

  describe('POST /auth/login', () => {
    it("returns 401 when user doesn't exist", () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'non-existent@example.com',
          password: 'abcDEF123',
        })
        .expect(401);
    });

    it('returns the access token on succesful login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'user@example.com',
          password: 'abcDEF123',
        })
        .expect(200)
        .expect((response) => {
          expect(response.body).toHaveProperty('accessToken');
        });
    });
  });

  describe('POST /auth/signup', () => {
    it('requires email and password', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'email should not be empty',
            'password should not be empty',
          ]);
        });
    });
    it('returns 400 when user already exists', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'user@example.com',
          password: 'abcDEF123',
        })
        .expect(400);
    });

    it('returns the access token on succesful signup', () => {
      const randomNum = Math.floor(Math.random() * 999);
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: `signup-test.${randomNum}@example.com`,
          password: 'abcDEF123',
        })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('accessToken');
        });
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
