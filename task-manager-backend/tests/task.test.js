import request from 'supertest';
import { app, sequelize } from '../src/app.js';

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
            username: 'tester',
            email: 'test@example.com',
            password: '123456',
        });

    if (registerRes.statusCode !== 201) {
        throw new Error(`Registro fallido: ${registerRes.body.message}`);
    }

    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@example.com',
            password: '123456',
        });

    if (!loginRes.body.data || !loginRes.body.data.token) {
        throw new Error(`Login fallido: ${loginRes.body.message}`);
    }

    token = loginRes.body.data.token;
});

describe('Tareas API', () => {
    test('Crear tarea', async () => {
        const res = await request(app)
            .post('/api/tareas')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Mi primera tarea' });

        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe(true);
        expect(res.body.data.title).toBe('Mi primera tarea');
    });

    test('Obtener lista de tareas', async () => {
        const res = await request(app)
            .get('/api/tareas')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('Debe fallar al crear tarea sin título (400)', async () => {
        const res = await request(app)
            .post('/api/tareas')
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'Falta título' });

        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe(false);
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0]).toHaveProperty('field', 'title');
    });

    test('Debe rechazar solicitud sin token (401)', async () => {
        const res = await request(app).get('/api/tareas');

        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toMatch(/token requerido/i);
    });
});

afterAll(async () => {
    await sequelize.close();
});
