import axios from 'axios';
import env from '../config/env'

export default class LogService {
  static async sendInformationToLogService(log) {
    try {
      const { data } = await axios.post(`${env.externalServices.logService}/log`, log);

      return { product: data, error: null };
    } catch (error) {
      return { error: new Error(error.response.data), product: null };
    }
  }
}
