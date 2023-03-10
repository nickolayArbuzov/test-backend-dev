import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as constants from './utils/constants';
import { createAppandServerForTests } from './utils/app';
import { seedUsers, seedGoodDeeds, seedComments } from './utils/seed-data';
import { generatePagination, generateQueryPagination, slicedEntityArray } from './utils/helpers';

jest.setTimeout(60000)
describe('AppController', () => {
  let app: INestApplication
  let server: any
  beforeAll(async () => {
    app = await createAppandServerForTests()
    server = app.getHttpServer()
  });

  afterAll(async () => {
    app.close()
  })

  describe('tests', () => {
    it('should delete all data', async () => {
      await request(server).delete('/delete-all-data').expect(200)
    })

    it('should seed data', async () => {
      await seedUsers(server)
      await seedGoodDeeds(server, constants.variables.accessTokens[0])
      await seedGoodDeeds(server, constants.variables.accessTokens[1])
      await seedComments(server, constants.variables.accessTokens[0], constants.variables.createdGoodDeeds[0]._id)
      await seedComments(server, constants.variables.accessTokens[1], constants.variables.createdGoodDeeds[1]._id)
    });

    it('find good deeds by user', async () => {
      await request(server).get(`/gooddeeds`)
        .set('Authorization', `Bearer ${constants.variables.accessTokens[0]}`)
    })

    it('update specific comment', async () => {
      await request(server).put(`/comments/${constants.variables.createdComments[3]._id}`).expect(401)

      await request(server).put(`/comments/${constants.variables.incorrectAnyObjectId}`)
        .set('Authorization', `Bearer ${constants.variables.accessTokens[1]}`)
        .expect(400)

      await request(server).put(`/comments/${constants.variables.incorrectAnyObjectId}`)
        .send({content: 'new-content'})
        .set('Authorization', `Bearer ${constants.variables.accessTokens[1]}`)
        .expect(404)
    })

    it('delete specific comment', async () => {
      await request(server).delete(`/comments/${constants.variables.createdComments[3]._id}`).expect(401)

      await request(server).delete(`/comments/${constants.variables.incorrectAnyObjectId}`)
        .set('Authorization', `Bearer ${constants.variables.accessTokens[1]}`)
        .expect(404)
    })

  });
});
