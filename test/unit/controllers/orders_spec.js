import OrdersController from '../../../src/controllers/orders';
import Order from '../../../src/models/order';
import sinon from 'sinon';

describe('Controller: OrdersController', () => {
  const defaultOrder = {
		"product": [
		  {
		    "_id": "56cb91bdc3464f14678934cc",
		    "name": "Product a",
		    "price": 10,
		    "quantity": 1
		  },
		  {
		    "_id": "56cb91bdc3464f14678934dd",
		    "name": "Product b",
		    "price": 10,
		    "quantity": 1
		  }
		],
		"user": "56cb91bdc3464f14678934cd",
		"status": "Approved"
	}

  const defaultRequest = {
    params: {},
  };

  describe('create() order', () => {
    it('should call send with a new order', () => {
      
    })
  })
});
