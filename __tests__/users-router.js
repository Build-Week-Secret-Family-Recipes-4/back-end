const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

// let token;

// beforeAll(done => {
//      supertest(server).post('/auth/login')
//     .send({ username: process.env.TEST_USER, 
//             password: process.env.TEST_USER_PASSWORD 
//         })
//     .end((err, res) => {
//         token = res.body.token;
//         done();
//         });
// });

let token;

beforeAll((done) => {
    supertest(server)
      .post('/auth/login')
      .send({
        username: "rachaelray1",
        password: "password1"
      })
      .end((err, res) => {
        token = res.body.token; 
        done();
      });
 });


beforeAll(async () => {
    //await db('users').truncate()
    await db.migrate.latest()
    await db.seed.run()   
})


afterAll(async () => {
    await db.destroy()

})

describe("users integration tests", () => {
    it("get /users SUCCEED", async () => {
        const res = await supertest(server).get("/users").set(token)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(3)
    })

    it("get /users FAIL", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

    it("get /users/:id FAIL", async () => {
        const res = await supertest(server).get("/users/2")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

    // it("get /users/:id NOT FOUND", async () => {
    //     const res = await supertest(server).get("/users/220")
    //     expect(res.statusCode).toBe(404)
    // })

    it("post /users FAIL", async () => {
        const data = {
        firstname: "bob",
        lastname: "builder",
        email: "bobthebuilder@gmail.com",
        username: "bobthebuilder",
        password: "passwordbuild"
        }
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

    it("DELETE /users/:id FAIL", async () => {
        const res = await supertest(server).delete("/users/3")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")    
    })
})