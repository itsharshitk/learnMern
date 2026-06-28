const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
    
        test("register user", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name:"Harshit",
                    email:"harshit@gmail.com",
                    password:"Password@123"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toMatch(/registered/i);
        });

        test("login",
            async () => {
                await request(app)
                .post("/auth/register")
                .send({
                    name:"Harshit",
                    email:"harshit@yopmail.com",
                    password:"Password@123"
                });

                const res = await request(app)
                                .post("/auth/login")
                                .send({
                                    email:"harshit@yopmail.com",
                                    password:"Password@123"
                                });
                                
                expect(res.statusCode).toBe(200);
                expect(res.body.message).toMatch(/successful/i);
            }
        );
});