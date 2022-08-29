import { ICreateSpecialAbilityRequest } from '@igikanam/interfaces';
import { SpecialAbility, User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

const exampleCreationObject: ICreateSpecialAbilityRequest = {
  name: 'Test SpecialAbility creation',
  rule: 'Test',
  prerequisites: 'Test',
  apValue: 0,
  level: 0,
  category: 'Test',
  sourceTagId: '2e8a66f2-8554-4377-870d-f7fbf1949e96',
};

// Source tags that get deleted: 6817d784-b4b4-462b-ba37-96ae0bf592af, 6c645a39-93b0-46b5-9125-68e587657ae2, 7183eb11-890d-48e4-820d-f27149ce2072
// Save to fetch source tag:
// - 7d495bb5-0129-4663-a72b-428ae12d38a8 (created by admin, default)
// - 2e8a66f2-8554-4377-870d-f7fbf1949e96 (created by user 1, space)
// - a4276f17-6f3a-48b2-b98c-a60a0bbee347 (created by user 2, soomerk)

describe('SpecialAbilityController (e2e)', () => {
  let app: INestApplication; // reference to the app instance
  let userAccessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, SpecialAbility]),
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

  describe('GET /special-abilities', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/special-abilities').expect(403);
    });

    it('returns 403 for User role', () => {
      return request(app.getHttpServer())
        .get('/special-abilities')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns a list of all special-abilities', () => {
      return request(app.getHttpServer())
        .get('/special-abilities')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /special-abilities/me', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/me')
        .expect(403);
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/me')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('returns a list of all special-abilities of the given user', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /special-abilities/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/db978150-1a4d-452d-9ee3-84d4d04de55d')
        .expect(403);
    });

    it('returns 403 for User role when trying to access special-ability of another user', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/ddad8337-f5e9-4f4f-8ff9-31fc5fd3529c') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to access their own special-ability', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/219b09b9-2f24-4219-85e7-a31e384ab27d') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`returns 404 for special-ability that doesn't exist`, () => {
      return request(app.getHttpServer())
        .get('/special-abilities/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('returns a a single special-ability', () => {
      return request(app.getHttpServer())
        .get('/special-abilities/db978150-1a4d-452d-9ee3-84d4d04de55d') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.abilityId).toStrictEqual(
            'db978150-1a4d-452d-9ee3-84d4d04de55d'
          );
        });
    });
  });

  describe('POST /special-abilities', () => {
    it('returns 403 for unauthorized user', () => {
      return request(app.getHttpServer())
        .post('/special-abilities')
        .expect(403);
    });

    it('returns 400 for invalid requests', () => {
      return request(app.getHttpServer())
        .post('/special-abilities')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'name should not be empty',
            'rule should not be empty',
            'prerequisites should not be empty',
            'apValue should not be empty',
            'level should not be empty',
            'sourceTagId should not be empty',
            'category should not be empty',
          ]);
        });
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .post('/special-abilities')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .post('/special-abilities')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns the created special-ability', () => {
      return request(app.getHttpServer())
        .post('/special-abilities')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toBe(exampleCreationObject.name);
        });
    });
  });

  describe('DELETE /special-abilities/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .delete('/special-abilities/96283b62-d47e-4668-9fd0-b2e20e6bdbb9')
        .expect(403);
    });

    it('returns 403 for User role when trying to delete special-ability of another user', () => {
      return request(app.getHttpServer())
        .delete('/special-abilities/26ffbb64-4c5e-449d-8ecf-987591fe13fc') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to delete their own special-ability', () => {
      return request(app.getHttpServer())
        .delete('/special-abilities/5976be28-a434-4f24-ac45-ced5d9029bfc') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(204);
    });

    it(`returns 404 for special-ability that doesn't exist`, () => {
      return request(app.getHttpServer())
        .delete('/special-abilities/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('successfully deletes the special-ability', async () => {
      await request(app.getHttpServer())
        .delete('/special-abilities/8067fbf6-eb8c-4dfe-8657-01fffebbcab7') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);

      return request(app.getHttpServer())
        .get('/special-abilities/8067fbf6-eb8c-4dfe-8657-01fffebbcab7') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
