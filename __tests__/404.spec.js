const app = require('../src/application');
const request = require('supertest');

describe("Unknown Route", () => {
    it('should reject invalid route', async function () {
        await request(app)
            .get("/uknvonwvdsfm/idontknow")
            .expect(res => {
                expect(res.body.status).toBe(false);
                expect(res.body.code).toEqual(404);
                expect(res.body.message).toContain("Not found")
            })
    });
});