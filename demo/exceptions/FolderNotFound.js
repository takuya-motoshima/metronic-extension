module.exports = class extends Error {
  constructor() {
    super('Folder not found');
    this.name = 'FolderNotFound';
  }
}