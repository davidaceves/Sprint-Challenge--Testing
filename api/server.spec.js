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

    afterEach( async () => {
        await db('games').truncate();
      });

    it('should hit endpoint', async () => {
        const res = await request(server).get('/games');
        expect(res.body).toEqual([]);
    })

    it('should return all games in db', async () => {
        const games = [
            { id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
            { id: 2, title: 'Super Mario Bros.', genre: 'Platformer', releaseYear: 1985}
        ];

        await db('games').insert(games);

        const res = await request(server).get('/games');
        expect(res.body).toEqual(games);
    })
})