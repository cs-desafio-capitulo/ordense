import Order from '../../../src/models/order';

describe('Routes: Orders', () => {
  let request;

  before(async () => {
    const app = await setupApp();
    request = supertest(app);
  });

  afterEach(() => Order.remove({}));

  const defaultId = '5a3be326421b5a4dcba8c133';
  const defaultOrder = {
    product: [
      {
        "name": "Product a",
        "price": 10,
        "quantity": 1,
      },
      {
        "name": "Product b",
        "price": 10,
        "quantity": 1,
      }
    ],
    user: "56cb91bdc3464f14678934cd",
    date: "2017-12-21T17:24:23.178Z",
	  status: "approved",
  };

  describe('POST /order', () => {
    context('when posting an order', () => {
      it('should return a new order with status code 201', (done) => {
        const newOrder = Object.assign({}, { __v: 0, _id: '5a3befb6bca41853f97d12d3' }, defaultOrder);
        const expectedSavedOrder = {
          "__v": 0,
          "_id": "5a3befb6bca41853f97d12d3",
          "product": [
              {
                  "quantity": 1,
                  "price": 10,
                  "name": "Product a",
              },
              {
                  "quantity": 1,
                  "price": 10,
                  "name": "Product b",
              }
          ],
          "user": "56cb91bdc3464f14678934cd",
          "status": "approved",
          "date": "2017-12-21T17:24:23.178Z"
      };

        request
          .post('/order')
          .send(newOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedOrder);
            done(err);
          });
      });
    });
  });
});