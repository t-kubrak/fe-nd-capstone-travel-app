const request = require("supertest");
const app = require("src/server/app");

describe("Test default path", () => {
    test("Testing the default path", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});