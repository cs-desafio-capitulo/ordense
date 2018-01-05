import Order from '../../../src/models/order';
import mongoose from 'mongoose';

describe('Routes: Orders', () => {
  let request;

  before(async () => {
    const app = await setupApp();
    request = supertest(app);
  });

  after(async () => {
    Order.remove({}, { multi: true });

    mongoose.connection.close();
  });

  const defaultOrder = {
    "user": "56cb91bdc3464f14678934cd",
      "products": [
        {
          "product_id": "5a45141f5e651c001fc37e57",
          "quantity": 1
        }
      ]
  };

  const expectedSavedOrder = {
    "_id": "56cb91bdc3464f14677e57ed",
    "user": "56cb91bdc3464f14678934cd",
    "products": [
        {
            "product_id": "5a45141f5e651c001fc37e57",
            "quantity": 1,
            "status": true,
            "total_cost": 100
        }
    ],
    "total_cost": 100,
    "__v": 0,
    "status": "approved",
    "date": "2018-01-05T12:14:05.150Z"
  };

  describe('POST /order',  () => {
    it('should return a new order with status code 201', (done) => {
      const customId = '56cb91bdc3464f14677e57ed';
      const newOrder = Object.assign({}, { _id: customId, __v: 0, date: "2018-01-05T12:14:05.150Z" }, defaultOrder);

      request
        .post('/order')
        .send(newOrder)
        .expect(201, expectedSavedOrder, done);
    });
  });
});
