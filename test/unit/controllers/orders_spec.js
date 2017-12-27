import sinon from 'sinon';
import OrdersController from '../../../src/controllers/orders';
import Order from '../../../src/models/order';

context('Controller: Orders', () => {
  const defaultOrder = [{
    "_v": 0,
    "_id": "5a417c9895a9ac1bb5ecec13",
    "user": "56cb91bdc3464f14678934cd",
    "product": [
      {
        "product_id": "5a3d4c6a9cd05f001f009024",
        "quantity": 10,
        "total_cost": 1000,
        "status": true,
      },
    ],
    "date": "1209321093UTC",
    "status": true,
  }];

  describe('Get an order: getById()', () => {
    const fakeId = '5a417c9895a9ac1bb5ecec13';
    const request = {
      params: {
        id: fakeId,
      },
    };

    const response = {
      json: sinon.spy(),
      status: sinon.stub(),
    };

    it('Should call send with one product',  (done) => {
      Order.find = sinon.stub();
      Order.find.withArgs({ _id: fakeId }).resolves(defaultOrder);

      const ordersController = new OrdersController(Order);
      
      response.status.withArgs(200).returns(response);

      return ordersController.getById(request, response)
        .then((data) => {
          sinon.assert.calledWith(response.json, defaultOrder);

          done(data);
        }).catch(err => {
          console.log('Error >>>', err);
          done(err);

        })
    });

    // it('When an order is not found');
  });

  // describe('creating a new order: create()', () => {
  //   it('When an order is successfuly created');

  //   it('When a creating order fails');
  // });
});