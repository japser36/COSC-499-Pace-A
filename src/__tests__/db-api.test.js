const httpMocks = require('node-mocks-http')
const DB = require('../pages/api/db')

//initialize the database
beforeAll(() => {
  const { req, res } = httpMocks.createMocks({
    method: 'POST',
    body: {
      reqType: 'init',
    },
  })

  DB.default(req, res)
})

//wipe the database
afterAll(() => {
  const { req, res } = httpMocks.createMocks({
    method: 'POST',
    body: {
      reqType: 'wipe',
    },
  })

  DB.default(req, res)
})

describe('POST requests', () => {
  test('Add a new org', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'addOrg',
        id: 'TESTORG',
        name: 'ORG_test',
        email: 'org@test.ca',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Add a new user', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'addUser',
        id: 'TEST1A',
        firstName: 'FN_test',
        lastName: 'LN_test',
        displayName: 'DN_test',
        email: 'test@test.ca',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Add a new mentee', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'addMentee',
        id: 'TEST1A',
        org_id: 'TESTORG',
        skills: 'testskills',
        timezone: -8,
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Add a new user', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'addUser',
        id: 'TEST2B',
        firstName: 'FN_test',
        lastName: 'LN_test',
        displayName: 'DN_test',
        email: 'test@test.ca',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Add a new mentor', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'addMentor',
        id: 'TEST2B',
        org_id: 'TESTORG',
        skills: 'testskills',
        timezone: -8,
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Set mentor', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      body: {
        reqType: 'setMentor',
        mentor_id: 'TEST2B',
        mentee_id: 'TEST1A',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })
})

describe('GET requests', () => {
  test('Get org', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      query: {
        reqType: 'getOrg',
        id: 'TESTORG',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Get mentee', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      query: {
        reqType: 'getMentee',
        id: 'TEST1A',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Get mentor', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      query: {
        reqType: 'getMentor',
        id: 'TEST2B',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Get org mentees', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      query: {
        reqType: 'getOrgMentees',
        id: 'TESTORG',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })

  test('Get org mentors', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'GET',
      query: {
        reqType: 'getOrgMentors',
        id: 'TESTORG',
      },
    })

    DB.default(req, res)
    expect(res.statusCode).toBe(200)
  })
})
