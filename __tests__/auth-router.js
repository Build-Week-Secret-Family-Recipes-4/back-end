const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    //await db('users').truncate()
    await db.migrate.latest()
    await db.seed.run()
  })
afterAll(async () => {
    await db.destroy()

})

describe("auth integration tests", () => {
    it("POST /register SHOULD SUCCEED", async () =>{
        const data = {firstname: "bob",
        lastname: "builder",
        email: "bobthebuilder@gmail.com",
        username: "bobthebuilder",
        password: "passwordbuild"
       }
       const res = await supertest(server).post("/auth/register").send(data)
       expect(res.statusCode).toBe(201)
       expect(res.type).toBe("application/json")
       expect(res.body.username).toBe("bobthebuilder")
    })

    it("POST /register SHOULD FAIL", async () =>{
        const data = {firstname: "bob",
        lastname: "builder",
        email: "bobthebuilder@gmail.com",
        username: "bobthebuilder",
        password: "passwordbuild"
       }
       const res = await supertest(server).post("/auth/register").send(data)
       expect(res.statusCode).toBe(409)
       
    })

    it("POST /login SHOULD SUCCEED", async () => {
        const data = {username: "bobthebuilder", password: "passwordbuild"}
        const res = await supertest(server).post("/auth/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
    })

    it("POST /login SHOULD FAIL", async () => {
        const data = {username: "bobbuilder", password: "passwordbuild"}
        const res = await supertest(server).post("/auth/login").send(data)
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

})