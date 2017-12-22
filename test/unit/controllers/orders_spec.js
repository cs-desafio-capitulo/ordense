import sinon from 'sinon';
import OrdersController from '../../../src/controllers/orders';
import Order from '../../../src/models/order';

describe('Controller Orders', () => {
  const defaultOrderIdTest = '5a3befb6bca41853f97d12d3';
  const defaultOrder = [{
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
  }];

  describe('get(:id) order', () => {
    it('should return a specific order', () => {
      const request = {
        params: {
          id: defaultOrderIdTest
        }
      };
      const response = {
        send: sinon.spy()
      };
      const orderController = new OrdersController();
      orderController.getById(request, response);

      expect(response.send.called).to.be.true;
      expect(response.send.calledWith(defaultOrder)).to.be.true;
    });
  });
});