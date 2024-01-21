import path from 'node:path'
import { test } from 'node:test'
import { Database } from '../Database.js'

const db = new Database({
	path: path.resolve('__tests__/db')
})

test('up without errors', async () => {
	await db.up()

	console.dir(db, { depth: null })
})