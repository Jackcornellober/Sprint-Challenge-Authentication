const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
    it('db environment set to testing', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

    describe('POST /api/register', () => {
        it('should return 201 Created', () => {
            const user = { username: 'user1', password: 'password' }
            return request(server)
            .post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
                
            })
        });
    }); 

    let token = '';
    describe('POST /api/login', () => {
        it('should return 200 OK', () => {
            const user = { username: 'user1', password: 'password' }
            return request(server)
            .post('/api/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(200);
                token = res.body.token;
            })
        });
    }); 

    describe('GET /api/jokes', () => {
        it('should return 200 OK', () => {
            return request(server)
            .get('/api/jokes')
            .set('Authorization', token)
            .then(res => {
                expect(res.status).toBe(401);
            })
        });
    });
  }); 