import { createMocks } from 'node-mocks-http'
import pool from '../lib/db'
import init from '../pages/api/init'
import getOrg from '../pages/api/org/[id]'
import getUsers from '../pages/api/org/users/[id]'

beforeAll(async () => {
  const { req, res } = createMocks()
  await init(req, res)
})

afterAll(async () => {
  const sql = `DROP TABLE users; DROP TABLE org`
  await pool.query(sql)
  pool.end()
})

describe('/api/org/[id]', () => {
  test('returns the correct org', async () => {
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
  test('returns the correct users', async () => {
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
