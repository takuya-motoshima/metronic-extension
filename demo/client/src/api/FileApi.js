import {Api} from 'metronic-extension';

export default class extends Api {
  constructor(origin = undefined) {
    super('/api/files', origin);
  }

  async createFile(parent, formData) {
    return this.client.post(`/${parent}`, formData);
  }
}