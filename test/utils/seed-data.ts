import * as request from 'supertest';
import * as constants from './constants';

export const seedUsers = async (server: any) => {

  const users = []
  const accessTokens = []
  for await (const user of constants.users){
    const response = await request(server).post('/auth/registration')
      .send(user)
    users.push(response.body)
    
    const accessToken = await request(server).post('/auth/login')
      .send({loginOrEmail: user.login, password: user.password})
    accessTokens.push(accessToken.body.accessToken)
    
  }
  constants.variables.setCreatedUsers(users)
  constants.variables.setAccessTokens(accessTokens)

}

export const seedGoodDeeds = async (server: any, token: string) => {

  const goodDeeds = []
  for await (const goodDeed of constants.goodDeeds){
    const response = await request(server).post('/goodDeeds')
      .set('Authorization', `Bearer ${token}`)
      .send(goodDeed)
    goodDeeds.push(response.body)
  }
  constants.variables.setCreatedGoodDeeds(goodDeeds)
}

export const seedComments = async (server: any, token: string, goodDeedId: string) => {

  const comments = []
  for await (const comment of constants.comments){
    const response = await request(server).post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({...comment, goodDeedId})
    comments.push(response.body)
  }
  constants.variables.setCreatedComments(comments)

}