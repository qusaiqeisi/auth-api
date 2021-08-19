// 'use strict';
// const {server} = require('../src/server');
// // I do not have to run it
// const supertest = require('supertest');
// const request = supertest(server);






// //add the name of the module that I am testing 
// describe('my API Server', ()=> {

//     // add scenarios & test cases 
//     it('handles 404 on a bad route', async () => {
       
//         const response = await request.get('/asd'); // async
//         expect(response.status).toEqual(404);
//     });


// })


'use strict';

process.env.SECRET = "toes";

const supertest = require('supertest');
const {server} = require('../src/server');
const { db } = require('../src/auth/models/index');

const mockRequest = supertest(server);

let users = {
  admin: { username: 'admin', password: 'password',role:"admin" },
  editor: { username: 'editor', password: 'password',role:"editor"  },
  user: { username: 'user', password: 'password',role:"user"  },
};

beforeAll(async () => {
  await db.sync();

});
afterAll(async () => {
  await db.drop();

});


describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        // expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        
      });

      it('can signin with basic', async () => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
       
      });

     xit('can signin with bearer', async () => {

        // First, use basic to login to get a token
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const token = response.body.token;

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer ${token}`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(200);
       
      });

    });

    describe('bad logins', () => {
      it('basic fails with known user and wrong password ', async () => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        
      });

      it('basic fails with unknown user', async () => {

        const response = await mockRequest.post('/signin')
          .auth('nobody', 'xyz')
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
        
      });

      xit('bearer fails with an invalid token', async () => {

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer foobar`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(403);
        
      })
    })

  });

});