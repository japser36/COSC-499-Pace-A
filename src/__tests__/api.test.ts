import { createMocks } from 'node-mocks-http'
import pool from '../lib/db'
import init from '../pages/api/init'
import getOrg from '../pages/api/org/[id]'
import getUsers from '../pages/api/org/users/[id]'
import addOrg from '../pages/api/org/insert'
import getUser from '../pages/api/user/[id]'
import addUser from '../pages/api/user/insert'
import setMentor from '../pages/api/user/set-mentor'

beforeAll(async () => {
  const { req, res } = createMocks({
    method: 'POST',
  })
  await init(req, res)
})

afterAll(async () => {
  const sql = `DROP TABLE users; DROP TABLE org`
  await pool.query(sql)
  pool.end()
})

describe('/api/org/[id]', () => {
  test.skip('returns the correct org', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'TESTORG1',
      },
    })
    await getOrg(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({
      success: true,
      rows: [{ id: 'TESTORG1', org_name: 'ORGNAME1', email: 'org1@test.ca' }],
    })
  })
})

describe('/api/org/users/[id]', () => {
  test.skip('returns the correct users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'TESTORG1',
      },
    })
    await getUsers(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({ success: true, rows: [{ id: 'MENTEE1' }, { id: 'MENTOR1' }] })
  })
})

describe('/api/org/insert', () => {
  test.skip('inserts request data as new entry in org', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'TESTORG3',
        org_name: 'ORGNAME3',
        email: 'org3@test.ca',
      },
    })
    await addOrg(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({ success: true, rows: [] })
  })
})

describe('/api/user/[id]', () => {
  test.skip('returns the correct user', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'MENTEE1',
      },
    })
    await getUser(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({
      success: true,
      rows: [
        {
          id: 'MENTEE1',
          email: 'mentee1@test.ca',
          org_id: 'TESTORG1',
        },
      ],
    })
  })
})

describe('/api/user/insert', () => {
  test.skip('inserts request data as new entry in user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'MENTEE3',
        firstName: 'FNmentee3',
        lastName: 'LNmentee3',
        displayName: 'DNmentee3',
        email: 'mentee3@test.ca',
        skills: 'noskills',
        timezone: -8,
        org_id: 'TESTORG2',
        userType: 'mentee',
      },
    })
    await addUser(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({ success: true, rows: [] })
  })
})

describe('/api/user/set-mentor', () => {
  test.skip('updates mentee user with new mentor_id', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        mentor_id: 'MENTOR1',
        mentee_id: 'MENTEE1',
      },
    })
    await setMentor(req, res)
    const data = res._getJSONData()
    expect(res._getStatusCode()).toBe(200)
    expect(data).toMatchObject({ success: true, rows: [] })
  })
})
