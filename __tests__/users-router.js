const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")


let token;

beforeAll((done) => {
    supertest(server)
      .post('/auth/login')
      .send({
        username: "user",
        password: "pw"
      })
      .end((err, res) => {
        token = res.body.token; 
        done();
      });
  });

beforeAll(async () => {
    //await db('auth').truncate()
    await db.migrate.latest()
    await db.seed.run()   
})


afterAll(async () => {
    await db.destroy()

})

describe("users integration tests", () => {
    it("get /users SUCCEED", async () => {
        const res = await supertest(server).get("/users").set('authorization', `${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(3)
    })

    it("get /users FAIL", async () => {
        const res = await supertest(server).get("/users").set('authorization', `${token}`)
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })
})