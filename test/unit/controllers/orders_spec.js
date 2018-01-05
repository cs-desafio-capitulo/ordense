import { OrdersController } from '../../../src/controllers/orders';

context('Controller: Order', () => {
  /**
   * Everything works as expected
   */
  describe('Good path', () => {
    describe('When an creating order', () => {
      
    });

    describe('When an getting order', () => {
      it("should return an empty object when don't find an order", async ()  => {
        const mockReq = { params: { id: 'a-fake-id' } };
        const mockRes = {
          status: (code) => {
            return {
              json: (value) => value
            }
          }
        };
        const mockOrderModel = {
          find: (param) => [],
        };

        const foundOrder = await OrdersController(mockOrderModel).getById(mockReq, mockRes);
        expect(foundOrder).to.be.an('array').that.is.empty;
      });

      it("should return an object with order's id, user and status", async () => {
        const mockReq = { params: { id: 'a-fake-id' } };
        const mockRes = {
          status: (code) => {
            return {
              json: (value) => value
            }
          }
        };

        const mockOrderModel = {
          find: (param) => [
            {
              "_id": "5a4f6c16efc12a048058c556",
              "user": "56cb91bdc3464f14678934cd",
              "products": [
                  {
                      "product_id": "5a45141f5e651c001fc3b7aa",
                      "quantity": 1,
                      "status": false,
                      "total_cost": 100
                  }
              ],
              "total_cost": 100,
              "__v": 0,
              "status": "denied",
              "date": "2018-01-05T12:14:05.150Z"
            }
          ],
        };

        const foundOrder = await OrdersController(mockOrderModel).getById(mockReq, mockRes);
        expect(foundOrder).to.be.an('array').that.is.not.empty;
        expect(foundOrder[0]).to.be.an('object');
        expect(foundOrder[0]).to.have.a.property('user').that.is.not.empty;
        expect(foundOrder[0]).to.have.a.property('_id');
        expect(foundOrder[0]).to.have.a.property('_id');
      });
    });
  });

  /**
   * Things doesn't work as expected
   */
  describe('Bad path', () => {
    describe('When an creating order', () => {
      
    });
    
    describe('When an getting order', () => {
      
    });
  });
});