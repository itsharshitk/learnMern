const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
    
        test("register user", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name:"Harshit",
                    email:`test${Date.now()}@gmail.com`,
                    password:"Password@123",
                });

            expect(res.statusCode).toBe(201);
            // expect(res.body.message).toMatch("/successfully/i");
        });

        // test("login",
        //     async () => {
        //         const res = await request(app)
        //                         .post("/auth/login")
        //                         .send({
        //                             email:"test@gmail.com",
        //                             password:"12345678"
        //                         });
                                
        //         expect(res.statusCode).toBeDefined();
        //     }
        // );
});