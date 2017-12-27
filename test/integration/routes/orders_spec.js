import Order from '../../../src/models/order';

describe('Routes: Orders', () => {
  let request;

  before(async () => {
    const app = await setupApp();
    request = supertest(app);
  });

  after(async () => {
    Order.remove({}, {
      multi: true
    });
  });

  const defaultOrder = {
    "user": "56cb91bdc3464f14678934cd",
    "products": [
      {
        "product_id": "5a3d4c6a9cd05f001f009024",
        "quantity": 1,
      },
    ],
  };

  describe('POST /order', () => {
    context('when posting an order',  () => {
      it('should return a new order with status code 201, with status "approved"', (done) => {
        const newOrder = Object.assign({}, { _id: "5a3be326421b5a4dcba8c133", __v: 0, date: "2017-12-25T22:32:56.657Z" }, defaultOrder);
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "products": [
              {
                  "status": true,
                  "quantity": 1,
                  "product_id": "5a3d4c6a9cd05f001f009024",
                  "total_cost": 100,
              }
          ],
          "status": "approved",
          "total_cost": 100,
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

      it('When quantity desired is bigger than available', (done) => {
        const wrongOrder = {
          "user": "56cb91bdc3464f14678934cd",
          "products": [
            {
              "product_id": "5a3d4c6a9cd05f001f009024",
              "quantity": 23,
            },
          ],
        };

        const newOrder = Object.assign({}, { _id: "5a3be326421b5a4dcba8c143", __v: 0, date: "2017-12-25T22:32:56.657Z" }, wrongOrder);
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "products": [
              {
                  "status": false,
                  "quantity": 23,
                  "product_id": "5a3d4c6a9cd05f001f009024",
                  "total_cost": 2300,
              }
          ],
          "status": "denied",
          "total_cost": 2300,
          "_id": "5a3be326421b5a4dcba8c143",
          "date": "2017-12-25T22:32:56.657Z"
        };

        request
          .post('/order')
          .send(newOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedOrder);
            console.log(res);
            expect(res.body.products).to.be.an.instanceof(Array);
            
            done(err);
          });
      });
    });

    context('when posting an order',  () => {
      it('should return a new order with status code 201, with status "denied"', (done) => {
        const newOrder = { _id: "5a3be326421b5a4dcba8c134", "user": "56cb91bdc3464f14678934cd", __v: 0, date: "2017-12-25T22:32:56.657Z" };
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "status": "denied",
          "total_cost": 0,
          "_id": "5a3be326421b5a4dcba8c134",
          "date": "2017-12-25T22:32:56.657Z"
        };

        request
          .post('/order')
          .send(newOrder)
          .end((err, res) => {
            expect(res.statusCode).to.eql(400);
            
            
            done(err);
          });
      });
    });
  });

  
  describe('GET /order/:id',  () => {
    context('when getting an order', () => {
      it('should return an specific', (done) => {
        const expectedSavedOrder = {
          "__v": 0,
          "user": "56cb91bdc3464f14678934cd",
          "products": [
              {
                  "status": true,
                  "quantity": 1,
                  "product_id": "5a3d4c6a9cd05f001f009024",
                  "total_cost": 100,
              }
          ],
          "status": "approved",
          "_id": "5a3be326421b5a4dcba8c133",
          "date": "2017-12-25T22:32:56.657Z",
          "total_cost": 100,
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
