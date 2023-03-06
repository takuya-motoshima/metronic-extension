import {Api} from 'metronic-extension';

export default class extends Api {
  constructor(origin = undefined) {
    super('/api/persons', origin);
  }

  async createPerson(formData) {
    return this.client.post('/', formData);
  }

  async updatePerson(personId, formData) {
    return this.client.put(`/${personId}`, formData);
  }

  async getPerson(personId) {
    return this.client.get(`/${personId}`);
  }

  async deletePerson(personId) {
    return this.client.delete(`/${personId}`);
  }
}