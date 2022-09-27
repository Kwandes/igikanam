import { ICreateAdvantageRequest } from '@igikanam/interfaces';
import { Advantage, User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

const exampleCreationObject: ICreateAdvantageRequest = {
  name: 'Test Advantage creation',
  rule: 'Test Rule',
  ap: -5,
  level: 2,
  prerequisite: '',
  isDisadvantage: false,
  sourceTagId: '2e8a66f2-8554-4377-870d-f7fbf1949e96',
};

// Source tags that get deleted: 6817d784-b4b4-462b-ba37-96ae0bf592af, 6c645a39-93b0-46b5-9125-68e587657ae2, 7183eb11-890d-48e4-820d-f27149ce2072
// Save to fetch source tag:
// - a914d6b8-e718-4445-b292-e9057fc86eb8 (created by admin, default)
// - 131a3234-88a1-4fbc-b389-ad95c8c5f431 (created by user 1, space)
// - f2a1be91-f709-4295-87ed-b9acea3e317c (created by user 2, space)

describe('AdvantageController (e2e)', () => {
  let app: INestApplication; // reference to the app instance
  let userAccessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Advantage]),
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

  describe('GET /advantages', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/advantages').expect(403);
    });

    it('returns 403 for User role', () => {
      return request(app.getHttpServer())
        .get('/advantages')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns a list of all Advantages', () => {
      return request(app.getHttpServer())
        .get('/advantages')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /advantages/me', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/advantages/me').expect(403);
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .get('/advantages/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .get('/advantages/me')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('returns a list of all Advantages of the given user', () => {
      return request(app.getHttpServer())
        .get('/advantages/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /advantages/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/advantages/131a3234-88a1-4fbc-b389-ad95c8c5f431')
        .expect(403);
    });

    it('returns 403 for User role when trying to access Advantage of another user', () => {
      return request(app.getHttpServer())
        .get('/advantages/f2a1be91-f709-4295-87ed-b9acea3e317c') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to access their own Advantage', () => {
      return request(app.getHttpServer())
        .get('/advantages/131a3234-88a1-4fbc-b389-ad95c8c5f431') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`returns 404 for Advantage that doesn't exist`, () => {
      return request(app.getHttpServer())
        .get('/advantages/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('returns a a single Advantage', () => {
      return request(app.getHttpServer())
        .get('/advantages/a914d6b8-e718-4445-b292-e9057fc86eb8') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.advantageId).toStrictEqual(
            'a914d6b8-e718-4445-b292-e9057fc86eb8'
          );
        });
    });
  });

  describe('POST /advantages', () => {
    it('returns 403 for unauthorized user', () => {
      return request(app.getHttpServer()).post('/advantages').expect(403);
    });

    it('returns 400 for invalid requests', () => {
      return request(app.getHttpServer())
        .post('/advantages')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'name should not be empty',
            'rule should not be empty',
            'ap should not be empty',
            'level must be a positive number',
            'level should not be empty',
            'prerequisite must be a string',
            'isDisadvantage should not be empty',
            'sourceTagId should not be empty',
          ]);
        });
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .post('/advantages')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .post('/advantages')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns the created Advantage', () => {
      return request(app.getHttpServer())
        .post('/advantages')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toBe(exampleCreationObject.name);
        });
    });
  });

  describe('DELETE /advantages/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .delete('/advantages/f2f20922-7a09-4919-a1f2-27a86551ad08')
        .expect(403);
    });

    it('returns 403 for User role when trying to delete Advantage of another user', () => {
      return request(app.getHttpServer())
        .delete('/advantages/813f455c-1b56-4086-8c28-e04099168a07') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to delete their own Advantage', () => {
      return request(app.getHttpServer())
        .delete('/advantages/6027b8ba-b4eb-4f44-a82d-8a2135285838') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(204);
    });

    it(`returns 404 for Advantage that doesn't exist`, () => {
      return request(app.getHttpServer())
        .delete('/advantages/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('successfully deletes the Advantage', async () => {
      await request(app.getHttpServer())
        .delete('/advantages/a857125f-2b06-4033-b351-113f22cfa03b') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);

      return request(app.getHttpServer())
        .get('/advantages/a857125f-2b06-4033-b351-113f22cfa03b') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
