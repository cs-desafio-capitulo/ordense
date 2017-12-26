import Order from '../../../src/models/order';

describe('Routes: Orders', () => {
  let request;

  beforeEach(async () => {
    const app = await setupApp();
    request = supertest(app);
  });

  after(async () => {
    Order.remove({});
  });

  const defaultOrder = {
    "user": "56cb91bdc3464f14678934cd",
    "products": [
      {
        "product_id": "5a3d4c6a9cd05f001f009024",
        "quantity": 9,
      },
    ],
  };

  describe('POST /order', () => {
    context('when posting an order', () => {
      it('should return a new order with status code 201', (done) => {
        const newOrder = Object.assign({}, { _id: "5a3be326421b5a4dcba8c133", __v: 0, date: "2017-12-25T22:32:56.657Z" }, defaultOrder);
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "products": [
              {
                  "status": true,
                  "quantity": 9,
                  "product_id": "5a3d4c6a9cd05f001f009024"
              }
          ],
          "status": "approved",
          "_id": "5a3be326421b5a4dcba8c133",
          "date": "2017-12-25T22:32:56.657Z"
        };

        request
          .post('/order')
          .send(newOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedOrder);
            
            expect(res.body.products).to.be.an.instanceof(Array);
            
            done(err);
          });
      });

      
    });
  });

  
  describe('GET /order/:id', () => {
    context('when getting an order', () => {
      it('should return an specific', (done) => {
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "products": [
              {
                  "status": true,
                  "quantity": 9,
                  "product_id": "5a3d4c6a9cd05f001f009024"
              }
          ],
          "status": "approved",
          "_id": "5a3be326421b5a4dcba8c133",
          "date": "2017-12-25T22:32:56.657Z"
        };

        request
          .get('/order/5a3be326421b5a4dcba8c133')
          .end((err, res) => {
            expect(res.body[0]).to.eql(expectedSavedOrder);
            done(err);
          });
      });

      
    });
  });
});
