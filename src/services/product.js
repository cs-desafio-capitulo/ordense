import axios from 'axios';
import env from '../config/env'

export default class ProductService {
  static async getProductFromService(id) {
    try {
      const { data } = await axios.get(`${env.externalServices.productService}/products/${id}`);

      return { product: data, error: null };
    } catch (err) {
      return { error: new Error(err.response.data), product: null };
    }
  }

  static async updateProduct(id, product) {
    try {
      const { data } = await axios.put(`${env.externalServices.productService}/products/${id}`, product);

      return { product: data, error: null };
    } catch (error) {
      return { error: new Error(error.response.data), product: null };
    }
  }
}
