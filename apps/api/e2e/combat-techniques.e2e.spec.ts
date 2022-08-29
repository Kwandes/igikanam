import { ICreateCombatTechniqueRequest } from '@igikanam/interfaces';
import { CombatTechnique, User } from '@igikanam/models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

const exampleCreationObject: ICreateCombatTechniqueRequest = {
  name: 'Test CombatTechnique creation',
  rating: 0,
  improvementCost: 'A',
  primaryAttribute: 'STR',
  category: 'Test',
  sourceTagId: '2e8a66f2-8554-4377-870d-f7fbf1949e96',
};

// Source tags that get deleted: 6817d784-b4b4-462b-ba37-96ae0bf592af, 6c645a39-93b0-46b5-9125-68e587657ae2, 7183eb11-890d-48e4-820d-f27149ce2072
// Save to fetch source tag:
// - 7d495bb5-0129-4663-a72b-428ae12d38a8 (created by admin, default)
// - 2e8a66f2-8554-4377-870d-f7fbf1949e96 (created by user 1, space)
// - a4276f17-6f3a-48b2-b98c-a60a0bbee347 (created by user 2, soomerk)

describe('CombatTechniqueController (e2e)', () => {
  let app: INestApplication; // reference to the app instance
  let userAccessToken: string;
  let adminAccessToken: string;

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, CombatTechnique]),
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

  describe('GET /combat-techniques', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer()).get('/combat-techniques').expect(403);
    });

    it('returns 403 for User role', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns a list of all CombatTechniques', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /combat-techniques/me', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/me')
        .expect(403);
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/me')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('returns a list of all CombatTechniques of the given user', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/me')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });
  });

  describe('GET /combat-techniques/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/92aedc84-e0d8-4ff4-9549-f1ccabb55de3')
        .expect(403);
    });

    it('returns 403 for User role when trying to access CombatTechnique of another user', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/f45a0689-be2d-474c-9927-8b73c3075856') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to access their own CombatTechnique', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/949e7a97-3dae-4d6a-add6-8441fc48b231') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(200);
    });

    it(`returns 404 for CombatTechnique that doesn't exist`, () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('returns a a single CombatTechnique', () => {
      return request(app.getHttpServer())
        .get('/combat-techniques/92aedc84-e0d8-4ff4-9549-f1ccabb55de3') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.combatTechniqueId).toStrictEqual(
            '92aedc84-e0d8-4ff4-9549-f1ccabb55de3'
          );
        });
    });
  });

  describe('POST /combat-techniques', () => {
    it('returns 403 for unauthorized user', () => {
      return request(app.getHttpServer())
        .post('/combat-techniques')
        .expect(403);
    });

    it('returns 400 for invalid requests', () => {
      return request(app.getHttpServer())
        .post('/combat-techniques')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(400)
        .expect((response) => {
          expect(response.body.message).toStrictEqual([
            'name should not be empty',
            'rating should not be empty',
            'improvementCost should not be empty',
            'primaryAttribute should not be empty',
            'category should not be empty',
            'sourceTagId should not be empty',
          ]);
        });
    });

    it('returns 200 for the User role', () => {
      return request(app.getHttpServer())
        .post('/combat-techniques')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns 200 for the Admin role', () => {
      return request(app.getHttpServer())
        .post('/combat-techniques')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(exampleCreationObject)
        .expect(201);
    });

    it('returns the created CombatTechnique', () => {
      return request(app.getHttpServer())
        .post('/combat-techniques')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(exampleCreationObject)
        .expect(201)
        .expect((response) => {
          expect(response.body.name).toBe(exampleCreationObject.name);
        });
    });
  });

  describe('DELETE /combat-techniques/:id', () => {
    it('returns 401 for unauthorized user', () => {
      return request(app.getHttpServer())
        .delete('/combat-techniques/f2f20922-7a09-4919-a1f2-27a86551ad08')
        .expect(403);
    });

    it('returns 403 for User role when trying to delete CombatTechnique of another user', () => {
      return request(app.getHttpServer())
        .delete('/combat-techniques/d9bdb336-cc27-49e4-b1b4-a262a4f3a465') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(403);
    });

    it('returns 200 for User role when trying to delete their own CombatTechnique', () => {
      return request(app.getHttpServer())
        .delete('/combat-techniques/b1fc3fd7-53a6-4925-a290-5bbd37123135') // set through the seeding service
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(204);
    });

    it(`returns 404 for CombatTechnique that doesn't exist`, () => {
      return request(app.getHttpServer())
        .delete('/combat-techniques/afba26a3-c387-4e52-876f-72f713025524') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('successfully deletes the CombatTechnique', async () => {
      await request(app.getHttpServer())
        .delete('/combat-techniques/b973707f-5879-4842-ab09-d481f6f702a4') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);

      return request(app.getHttpServer())
        .get('/combat-techniques/b973707f-5879-4842-ab09-d481f6f702a4') // set through the seeding service
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
