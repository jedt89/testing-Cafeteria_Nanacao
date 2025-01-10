const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto', async () => {
    const resultado = await request(server).get('/cafes');
    const statusCode = resultado.statusCode;

    expect(statusCode).toBe(200);
    expect(resultado.body).toBeInstanceOf(Array);
    expect(resultado.body.length).toBeGreaterThan(0);
  });

  it('Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe', async () => {
    const resultado = await request(server)
      .delete('/cafes/789')
      .set('Authorization', `Bearer ${token}`);

    expect(resultado.statusCode).toBe(404);
  });

  it('Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.', async () => {
    const params = {
      id: 7,
      nombre: 'Americano_2'
    };
    const resultado = await request(server).post('/cafes').send(params);

    expect(resultado.statusCode).toBe(201);
  });

  it('Prueba que la ruta PUT /cafes devuelve un status code 404 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.', async () => {
    const params = {
      id: 4,
      nombre: 'Americano_2'
    };

    const resultado = await request(server)
      .post('/cafes/3')
      .set('Authorization', `Bearer ${token}`)
      .send(params);

    expect(resultado.statusCode).toBe(404);
  });
});
