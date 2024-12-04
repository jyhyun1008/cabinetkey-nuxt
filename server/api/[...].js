import { createRouter, useBase } from "h3"
const router = createRouter()
const sql = usePostgres()

// 테스트
router.get('/db', defineEventHandler(async (event) => {
    async function getData() {
      try {
        const result = await sql`SELECT * FROM pg_catalog.pg_tables;`
        return result
      } catch (e) {
        return 'error: ' + e
      }
    }
    return {
      rows: await getData()
    }
}))

//사용자 조회
router.post('/users/show', defineEventHandler(async (event) => {
  var params = await readBody(event)
  console.log(params)
  async function getData(username) {
    try {
      const result = await sql`SELECT * FROM USERS WHERE username=${username}::text;`
      return result
    } catch (e) {
      return 'error: ' + e
    }
  }
  return {
    rows: await getData(params.username)
  }
}))

//사용자 조회 - 로그인 시 소셜핸들로 조회하기
router.post('/users/show-by-social-handle', defineEventHandler(async (event) => {
  var params = await readBody(event)
  console.log(params)
  async function getData(socialHandle) {
    try {
      const result = await sql`SELECT * FROM USERS WHERE socialHandle=${socialHandle}::text;`
      return result
    } catch (e) {
      return 'error: ' + e
    }
  }
  return {
    rows: await getData(params.socialHandle)
  }
}))

//사용자 조회 - 이메일로 조회하기
router.post('/users/show-by-email', defineEventHandler(async (event) => {
  var params = await readBody(event)
  console.log(params)
  async function getData(email) {
    try {
      const result = await sql`SELECT * FROM USERS WHERE email=${email}::text;`
      return result
    } catch (e) {
      return 'error: ' + e
    }
  }
  return {
    rows: await getData(params.email)
  }
}))

//사용자 추가
router.post('/users/create', defineEventHandler(async (event) => {
  var params = await readBody(event)
  async function getData(username, knownName, socialType, socialHandle, email, avatarUrl, bannerUrl) {
    try {
      const result = await sql`INSERT INTO USERS (username, knownName, socialType, socialHandle, email, createdAt, avatarUrl, bannerUrl) VALUES (${username}, ${knownName}, ${socialType}, ${socialHandle}, ${email}, to_timestamp(${Date.now()} / 1000.0), ${avatarUrl}, ${bannerUrl});`
      return result
    } catch (e) {
      return 'error: ' + e
    }
  }
  return {
    rows: await getData(params.username, params.knownName, params.socialType, params.socialHandle, params.email, params.avatarUrl, params.bannerUrl)
  }
}))

//사용자 변경
router.post('/users/update', defineEventHandler(async (event) => {
  var params = await readBody(event)
  async function getData(username, knownName = '', email = '', bio = '', avatarUrl = '', bannerUrl = '') {
    try {
      const origin = await sql`SELECT * FROM USERS WHERE username=${username}::text;`
      knownName ? knownName : origin[0].knownName
      email ? email : origin[0].email
      bio ? bio : origin[0].bio
      avatarUrl ? avatarUrl : origin[0].avatarUrl
      bannerUrl ? bannerUrl : origin[0].bannerUrl
      const result = await sql`UPDATE USERS SET knownName=${knownName}, email=${email}, bio=${bio}, avatarUrl=${avatarUrl}, bannerUrl=${bannerUrl}, lastLogin=to_timestamp(${Date.now()} / 1000.0) WHERE username=${username}::text;`
      const changed = await sql`SELECT * FROM USERS WHERE username=${username}::text;`
      return changed
    } catch (e) {
      return 'error: ' + e
    }
  }
  return {
    rows: await getData(params.username, params.knownName, params.email, params.bio, params.avatarUrl, params.bannerUrl)
  }
}))

export default useBase('/api', router.handler)