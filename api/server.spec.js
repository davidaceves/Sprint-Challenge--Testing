const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('GET /games', () => {
    it('should return 200', () => {
        return request(server)
            .get('/games')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})