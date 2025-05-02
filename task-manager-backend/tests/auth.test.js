import request from 'supertest';
import { app, sequelize } from '../src/app.js';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Auth API', () => {
    test('Debe registrar un nuevo usuario', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'authuser',
                email: 'vell@example.com',
                password: 'securepass',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe(true);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('email', 'vell@example.com');
    });

    test('Debe rechazar un registro con email duplicado', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'vell',
                email: 'vell@example.com',
                password: 'securepass',
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toMatch(/ya está registrado/i);
    });

    test('Debe iniciar sesión con credenciales válidas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'vell@example.com',
                password: 'securepass',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.data).toHaveProperty('token');
    });

    test('Debe fallar al iniciar sesión con credenciales incorrectas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'vell@example.com',
                password: 'wrongpassword',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toMatch(/credenciales/i);
    });
});

afterAll(async () => {
    await sequelize.close();
});
