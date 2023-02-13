module.exports = class extends Error {
  constructor() {
    super('File not found');
    this.name = 'FileNotFound';
  }
}