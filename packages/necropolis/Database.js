import process from 'node:process'
import path from 'node:path'
import { readFile, readdir } from 'node:fs/promises'

export class Database {
	constructor(options) {
		this.path = options.path
		this.locked = false
		this.queue = []
		this.collections = {}
		this.meta = {}
	}

	async up() {
		try {
			await this._loadMeta()
			await this._loadCollections()
		} catch (error) {
			console.log(error)
			process.exit(1)
		}
	}
	
	async down() {}

	async create(type, input) {}

	async read(type, id) {}

	async update(type, id, update) {}

	async delete(type, id) {}

	async find(type, filter) {}

	async _write() {}

	async _loadMeta() {
		const file = await readFile(path.join(this.path, 'meta.json'), 'utf-8')
		const meta = JSON.parse(file)
		this.meta = meta
	}

	async _loadCollections() {
		const dir = await readdir(path.join(this.path, 'collections'))

		for (const fileName of dir) {
			const { name } = path.parse(fileName)
			const collectionMeta = this.meta.collections[name]

			if (collectionMeta.file === fileName) {
				const file = await readFile(path.join(this.path, 'collections', fileName))
				const collection = JSON.parse(file)

				if (collectionMeta.type === collection.type) {
					this.collections[name] = collection
				}
			}
		}
	}
}