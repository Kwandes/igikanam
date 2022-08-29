import { SourceTag, User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

describe('SourceTagController (e2e)', () => {
  let app: INestApplication; // reference to the app instance
  let userAccessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, SourceTag]),
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
    // Set access tokens
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user@example.com',
        password: 'abcDEF123',
      })
      .expect((response) => {
        userAccessToken = response.body.accessToken;
      });
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'abcDEF123',
      })
      .expect((response) => {
        adminAccessToken = response.body.accessToken;
      });
  });

  describe('GET /source-tags', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/source-tags').expect(403);
    });

    it('returns 403 for User role', () => {
      return request(app.getHttpServer())
        .get('/source-tags')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns a list of all source tags', () => {
      return request(app.getHttpServer())
        .get('/source-tags')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /source-tags/me', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/source-tags/me').expect(403);
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .get('/source-tags/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .get('/source-tags/me')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('returns a list of all source tags of the given user', () => {
      return request(app.getHttpServer())
        .get('/source-tags/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /source-tags/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/source-tags/7d495bb5-0129-4663-a72b-428ae12d38a8')
        .expect(403);
    });

    it('returns 403 for User role when trying to access tag of another user', () => {
      return request(app.getHttpServer())
        .get('/source-tags/a4276f17-6f3a-48b2-b98c-a60a0bbee347') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to access their own tag', () => {
      return request(app.getHttpServer())
        .get('/source-tags/2e8a66f2-8554-4377-870d-f7fbf1949e96') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`returns 404 for source tag that doesn't exist`, () => {
      return request(app.getHttpServer())
        .get('/source-tags/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('returns a a single source tag', () => {
      return request(app.getHttpServer())
        .get('/source-tags/2e8a66f2-8554-4377-870d-f7fbf1949e96') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.tagId).toStrictEqual(
            '2e8a66f2-8554-4377-870d-f7fbf1949e96'
          );
        });
    });
  });

  describe('POST /source-tags', () => {
    it('returns 403 for unauthorized user', () => {
      return request(app.getHttpServer()).post('/source-tags').expect(403);
    });

    it('returns 400 for invalid requests', () => {
      return request(app.getHttpServer())
        .post('/source-tags')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'name should not be empty',
          ]);
        });
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .post('/source-tags')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send({ name: 'Test User Role' })
        .expect(201);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .post('/source-tags')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({ name: 'Test Admin Role' })
        .expect(201);
    });

    it('returns the created tag', () => {
      return request(app.getHttpServer())
        .post('/source-tags')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send({ name: 'Test Tag creation' })
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toBe('Test Tag creation');
        });
    });
  });

  describe('DELETE /source-tags/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .delete('/source-tags/afba26a3-c387-4e52-876f-72f713025524') // ID doesn't actually exist
        .expect(403);
    });

    it('returns 403 for User role when trying to delete tag of another user', () => {
      return request(app.getHttpServer())
        .delete('/source-tags/6817d784-b4b4-462b-ba37-96ae0bf592af') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to delete their own tag', () => {
      return request(app.getHttpServer())
        .delete('/source-tags/6c645a39-93b0-46b5-9125-68e587657ae2') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(204);
    });

    it(`returns 404 for source tag that doesn't exist`, () => {
      return request(app.getHttpServer())
        .delete('/source-tags/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('successfully deletes the tag', async () => {
      await request(app.getHttpServer())
        .delete('/source-tags/7183eb11-890d-48e4-820d-f27149ce2072') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);

      return request(app.getHttpServer())
        .get('/source-tags/7183eb11-890d-48e4-820d-f27149ce2072') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
