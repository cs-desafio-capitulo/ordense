import axios from 'axios';

export default class OrderService {
  async getProductFromService(id) {
    try {
      const { data } = await axios.get(`https://shrouded-shelf-58966.herokuapp.com/products/${id}`)
      
      return { product: data, error: null }
    }
    catch(err) {
      // err.response.data
      return { error: new Error(err.response.data), product: null }
    }
  }
};
