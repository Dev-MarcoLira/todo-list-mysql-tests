const test = require('node:test')
const assert = require('node:assert')
const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

const { routes } = require('../../routes/todoRoutes')

test('Todo routes - endpoints test suite', async (t) => {

    await t.test('it should call / route', async () => {

        const databaseMock = [{
            "id": "90bf10a3-c9fb-406a-a35a-3e4a8db0fbf8",
            "status": "pending",
            "name": "morning buddy",
        }]

        const endpoint = '/'
        const request = {}
        const response = {

            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                })

                assert.strictEqual(
                    item,
                    expected,
                    'write should be called with the correct payload'
                )
            }),

            end: callTracker.calls(item =>{
                assert.strictEqual(
                    item,
                    undefined,
                    'end should be called without params'
                )
            })
        }

        const route = endpoints[endpoint]
        await route(request, response)

    })

    await t.todo('it should call /heroes:post route')

})