const users = [
    {
        login: 'login-1',
        email: 'email-1@mail.com',
        password: 'password-1',
    },
    {
        login: 'login-2',
        email: 'email-2@mail.com',
        password: 'password-2',
    },
    {
        login: 'login-3',
        email: 'email-3@mail.com',
        password: 'password-3',
    },
    {
        login: 'login-4',
        email: 'email-4@mail.com',
        password: 'password-4',
    },
]

const goodDeeds = [
    {
        title: 'title-1-from-user-1',
    },
    {
        title: 'title-2-from-user-1',
    },
]

const comments = [
    {
        content: 'content-1-for-gooddeed-1',
    },
    {
        content: 'content-2-for-gooddeed-1',
    },
]


class Variables {

    query = {
        pageSize: 10,
        pageNumber: 1,
    }

    createdUsers = [] 
    createdGoodDeeds = []
    createdComments = []

    accessTokens = []

    cookies = []
    devicesIds = []

    // cookies for one user in refresh-tokens case
    cookiePrev = ''
    cookieAfter = ''

    incorrectAnyObjectId = '640a31cb3acdb24a61157777'
    incorrectToken = '77777GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkyM2I5NTVlZTgwZDRkZGIyYzdlMjEiLCJkZXZpY2VJZCI6IjEwNzMxMjFjLTM1YWQtNGMyMi04ZTFhLWM2NTNmMzhkYmJmMyIsImlzc3VlZEF0IjoxNjcwNTI3ODkzMjg5LCJpYXQiOjE2NzA1Mjc4OTMsImV4cCI6MTY3MDUyODE5M30.53_vG0GlhTqXosc2sq2-TnzxEyItCLrDHw8ZJjWRSQc'

    setQuery(query: any){
        this.query = query
    }

    setCreatedUsers(createdUsers: any){
        this.createdUsers = [...this.createdUsers, ...createdUsers]
    }
    setCreatedGoodDeeds(createdGoodDeeds: any){
        this.createdGoodDeeds = [...this.createdGoodDeeds, ...createdGoodDeeds]
    }
    setCreatedComments(createdComments: any){
        this.createdComments = [...this.createdComments, ...createdComments]
    }
    
    setAccessTokens(accessToken: string[]){
        this.accessTokens = accessToken
    }
    
}

const variables = new Variables()

export {
    users, goodDeeds, comments,
    variables,
}
