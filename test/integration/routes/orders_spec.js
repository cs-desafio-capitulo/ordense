import Order from '../../../src/models/order';

describe('Routes: Orders', () => {
  let request;

  const before = async () => {
    const app = await setupApp();
    request = supertest(app);
  };

  const after = () => Order.remove({});

  const defaultOrder = {
    product: [
      {
        name: 'Product a',
        price: 10,
        quantity: 1,
      },
      {
        name: 'Product b',
        price: 10,
        quantity: 1,
      },
    ],
    user: '56cb91bdc3464f14678934cd',
    date: '2017-12-21T17:24:23.178Z',
  };

  const expectedSavedOrder = {
    __v: 0,
    _id: '5a3befb6bca41853f97d12d3',
    product: [
      {
        quantity: 1,
        price: 10,
        name: 'Product a',
      },
      {
        quantity: 1,
        price: 10,
        name: 'Product b',
      },
    ],
    user: '56cb91bdc3464f14678934cd',
    status: 'approved',
    date: '2017-12-21T17:24:23.178Z',
  };

  describe('POST /order', () => {
    context('when posting an order', () => {
      it('should return a new order with status code 201', (done) => {
        const newOrder = Object.assign({}, { __v: 0, _id: '5a3befb6bca41853f97d12d3' }, defaultOrder);
        
        request
          .post('/order')
          .send(newOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedOrder);
            done(err);
          });
      });

      it('should return an message error with status code 400', (done) => {
        const wrongOrder = Object.assign({}, defaultOrder);
        delete wrongOrder.product;

        request
          .post('/order')
          .send(wrongOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(400);
            expect(res.body.message).to.eql('No products were sent');

            done(err);
          });
      });
    });
  });

  describe('GET /order/:id', () => {
    context('when getting a specific order', () => {
      it('should return an order array, with status 201', (done) => {
        request
          .get(`/order/${expectedSavedOrder._id}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body[0]).to.eql(expectedSavedOrder);

            done(err);
          });
      });

      it('should return an empty array, with status 201', (done) => {
        const wrongId = expectedSavedOrder._id.replace(/5/g, '0');
        request
          .get(`/order/${wrongId}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql([]);

            done(err);
          });
      });
    });
  });
});
