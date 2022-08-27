import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication; // reference to the app instance

  beforeEach(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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

  it('GET /healthcheck returns API status', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200) // verify HTTP code
      .expect((response) => {
        // verify response body
        expect(response.body).toHaveProperty('status');
        expect(response.body?.status).toEqual('Running');
      });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
