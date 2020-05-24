const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db('users').truncate()
    await db.migrate.latest()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()

})


describe("recipes integration tests", () => {
    it("get /recipes", async () => {
        const res = await supertest(server).get("/")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
    })

    it("get /recipes/:id FAIL", async () => {
        const res = await supertest(server).get("/recipes/2")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        //expect(res.body.title).toBe("Dirty P's Garlic-Ginger Chicken Thighs")
    })

    it("post /recipes FAIL", async () => {
        const data = { title: "cereal & milk", source: "me", ingredients: "any kind of cereal & milk", categoriy_id: 1}
        const res = await supertest(server).post("/").send(data)
        expect(res.statusCode).toBe(404)
        //expect(res.type).toBe("application/json")
    })

    it("delete /recipes/:id FAIL", async () => {
        const res = await supertest(server).delete("/recipes/5")
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })

    it("put /recipes/:id FAIL", async () => {
        const data = {title: "just food"}
        const res = await supertest(server).put("/recipes/1").send(data)
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })
})

