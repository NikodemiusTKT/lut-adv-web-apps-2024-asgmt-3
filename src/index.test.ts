import {TUser, app, users} from '.';

import express from 'express';
import request from 'supertest';

let server: any


beforeAll((done) => {
    server = app.listen(3000, done)
});

afterAll((done) => {
    server.close(done)
});

describe('POST /sum', () => {
    it('should return the sum of an array of numbers', async () => {
        const response = await request(app)
            .post('/sum')
            .send({ numbers: [1, 2, 3, 4, 5] });
        
        expect(response.status).toBe(200);
        expect(response.body.sum).toBe(15);
    });

    it('should return 400 if the body is not an array of numbers', async () => {
        const response = await request(app)
            .post('/sum')
            .send({ numbers: 'not an array' });
        
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid body');
    });

    it('should return 400 if the body is missing', async () => {
        const response = await request(app)
            .post('/sum')
            .send({});
        
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid body');
    });

});
describe('GET /users', () => {
    beforeEach(() => {
        users.length = 0;
    });

    it('should return an empty array when there are no users', async () => {
        const response = await request(app).get('/users');
        
        expect(response.status).toBe(201);
        expect(response.body).toEqual([]);
    });

    it('should return an array of users', async () => {
        users.push({ name: 'Alice', email: 'alice@example.com' });
        const response = await request(app).get('/users');
        
        expect(response.status).toBe(201);
        expect(response.body).toEqual([{ name: 'Alice', email: 'alice@example.com' }]);
    });
});

describe('POST /users', () => {
    it('should add a new user and return a success message', async () => {
        const newUser: TUser = { name: 'Alice', email: 'alice@example.com' };
        const response = await request(server)
            .post('/users')
            .send(newUser);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'User successfully added'});
    });

    it('should return 400 if the body is missing required fields', async () => {
        const response = await request(server)
            .post('/users')
            .send({ name: 'Alice' }); // Missing email
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Name and email are required');
    });

});