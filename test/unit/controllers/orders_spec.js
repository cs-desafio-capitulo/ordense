import sinon from 'sinon';
import OrdersController from '../../../src/controllers/orders';
import Order from '../../../src/models/order';

describe('Controller: Orders', () => {
  const defaultOrder = [{
    "_v": 0,
    "_id": "5a417c9895a9ac1bb5ecec13",
    "user": "56cb91bdc3464f14678934cd",
    "product": [
      {
        "product_id": "5a3d4c6a9cd05f001f009024",
        "quantity": 10
      }
    ]
  }];

  describe('get and order: getById()', () => {
    it('should return an specific book', () => {
      
    });
  });
});