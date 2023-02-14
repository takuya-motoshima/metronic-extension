const Model = require('express-sweet').database.Model;
const FileNotFound = require('../exceptions/FileNotFound');

module.exports = class extends Model {
  static get table() {
    return 'file';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      folderId: this.DataTypes.INTEGER,
      text: this.DataTypes.STRING,
    };
  }

  static async createFile(folderId, text) {
    return super.create({folderId, text});
  }

  static async deleteFile(fileId) {
    // console.log(`Delete the file with ID ${fileId}`);
    const file = await this.#getFile(fileId);
    if (!file)
      throw new FileNotFound();
    return file.destroy();
  }

  static async renameFile(fileId, text) {
    const file = await this.#getFile(fileId);
    if (!file)
      throw new FileNotFound();
    file.text = text;
    await file.save();
  }

  static async #getFile(fileId) {
    return super.findOne({where: {id: fileId}});
  }
}