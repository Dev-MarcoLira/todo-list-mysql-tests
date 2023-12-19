const test = require('node:test')
const assert = require('node:assert')
const { promisify } = require('node:util')

test('Todo Integration test suite', async(t)=>{

    const testPort = 9009

    process.env.PORT = testPort

    const { server } = await import('../../app')

    const testServerAddress = `http://localhost:${testPort}/`

    await t.test('it should create a todo', async (t) => {

        const data = {
            name: "batman",
            status: 'pending',
        }

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        assert.strictEqual(request.status, 201)

        const result = await request.json()

        assert.deepStrictEqual(
            result.status,
            'success',
            'it should return a valid text message'
        )

        assert.ok(
            result.id.length > 30,
            'it should be a valid uuid'
        )
    })

    await promisify(server.close.bind(server))()

})