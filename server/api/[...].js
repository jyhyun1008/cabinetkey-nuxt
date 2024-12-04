import { createRouter, useBase } from "h3"
const router = createRouter()

// route를 직접 작성할 경우
router.get('/db', defineEventHandler(async (event) => {
    async function getUsers() {
      const sql = usePostgres()
      try {
        const result = await sql`SELECT * FROM pg_catalog.pg_tables;`
        return result
      } catch (e) {
        return 'error: ' + e
      }
    }
    return {
      response: await getUsers()
    }
}))

export default useBase('/api', router.handler)