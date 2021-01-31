const httpMocks = require('node-mocks-http')
const DB = require('../pages/api/db')

describe('POST requests', () => {
  it('Adds a new mentee', async () => {
    const { req, res } = httpMocks.createMocks({
      method: 'POST',
      params: {
        reqType: 'addMentee',
        id: 'TEST1A',
        firstName: 'FN_test',
        lastName: 'LN_test',
        displayName: 'DN_test',
        email: 'test@test.ca',
        org_id: 'TESTORG',
        skills: 'testskills',
        timezone: -8,
      },
    })

    await DB(req, res)
    expect(res.body).toHaveProperty('post')
  })
})
