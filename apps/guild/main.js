import { createClient } from 'phylactery'

const client = createClient({
	schema: 'paht/to/app-schema',
})

client.auth.signup(login, password)
client.auth.login(login, password)
client.auth.logout()

client.store