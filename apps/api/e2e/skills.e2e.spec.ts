import { ICreateSkillRequest } from '@igikanam/interfaces';
import { Skill, User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

const exampleCreationObject: ICreateSkillRequest = {
  name: 'Test Skill creation',
  check: 'AGI/AGI/AGI',
  quality: 'Test',
  failedCheck: 'Test',
  criticalSuccess: 'Test',
  botch: 'Test',
  improvementCost: 'A',
  applications: 'Test',
  uses: 'Test',
  newApplication: 'Test',
  category: 'Test',
  sourceTagId: '2e8a66f2-8554-4377-870d-f7fbf1949e96',
};

// Source tags that get deleted: 6817d784-b4b4-462b-ba37-96ae0bf592af, 6c645a39-93b0-46b5-9125-68e587657ae2, 7183eb11-890d-48e4-820d-f27149ce2072
// Save to fetch source tag:
// - 7d495bb5-0129-4663-a72b-428ae12d38a8 (created by admin, default)
// - 2e8a66f2-8554-4377-870d-f7fbf1949e96 (created by user 1, space)
// - a4276f17-6f3a-48b2-b98c-a60a0bbee347 (created by user 2, soomerk)

describe('SkillController (e2e)', () => {
  let app: INestApplication; // reference to the app instance
  let userAccessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Skill]),
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

  describe('GET /skills', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/skills').expect(403);
    });

    it('returns 403 for User role', () => {
      return request(app.getHttpServer())
        .get('/skills')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns a list of all skills', () => {
      return request(app.getHttpServer())
        .get('/skills')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /skills/me', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/skills/me').expect(403);
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .get('/skills/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .get('/skills/me')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('returns a list of all skills of the given user', () => {
      return request(app.getHttpServer())
        .get('/skills/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /skills/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/skills/135d9304-4ffb-4f85-bc40-39d24c5bf42e')
        .expect(403);
    });

    it('returns 403 for User role when trying to access skill of another user', () => {
      return request(app.getHttpServer())
        .get('/skills/f76de747-2e9c-4f16-85fc-445261303705') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to access their own skill', () => {
      return request(app.getHttpServer())
        .get('/skills/0d7c0610-8407-4d45-9031-7d6819f0959a') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`returns 404 for skill that doesn't exist`, () => {
      return request(app.getHttpServer())
        .get('/skills/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('returns a a single skill', () => {
      return request(app.getHttpServer())
        .get('/skills/0d7c0610-8407-4d45-9031-7d6819f0959a') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.skillId).toStrictEqual(
            '0d7c0610-8407-4d45-9031-7d6819f0959a'
          );
        });
    });
  });

  describe('POST /skills', () => {
    it('returns 403 for unauthorized user', () => {
      return request(app.getHttpServer()).post('/skills').expect(403);
    });

    it('returns 400 for invalid requests', () => {
      return request(app.getHttpServer())
        .post('/skills')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'name should not be empty',
            'check should not be empty',
            'quality should not be empty',
            'failedCheck should not be empty',
            'criticalSuccess should not be empty',
            'botch should not be empty',
            'improvementCost should not be empty',
            'applications should not be empty',
            'uses should not be empty',
            'newApplication should not be empty',
            'sourceTagId should not be empty',
            'category should not be empty',
          ]);
        });
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .post('/skills')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .post('/skills')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns the created skill', () => {
      return request(app.getHttpServer())
        .post('/skills')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toBe(exampleCreationObject.name);
        });
    });
  });

  describe('DELETE /skills/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .delete('/skills/a4af674f-94eb-487e-902d-01bfee757a44')
        .expect(403);
    });

    it('returns 403 for User role when trying to delete skill of another user', () => {
      return request(app.getHttpServer())
        .delete('/skills/2bc66689-f987-4d6d-bfe3-ca28c80b4cad') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to delete their own skill', () => {
      return request(app.getHttpServer())
        .delete('/skills/d2b704cb-d2d4-4b1b-9e4a-f203e0c9edbd') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(204);
    });

    it(`returns 404 for skill that doesn't exist`, () => {
      return request(app.getHttpServer())
        .delete('/skills/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('successfully deletes the skill', async () => {
      await request(app.getHttpServer())
        .delete('/skills/b8dca268-037f-407d-99e5-d41f63b4d628') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);

      return request(app.getHttpServer())
        .get('/skills/b8dca268-037f-407d-99e5-d41f63b4d628') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
