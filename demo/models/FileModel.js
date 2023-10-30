const Model = require('express-sweet').database.Model;

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

  static async createNode(folderId, text) {
    return super.create({folderId, text});
  }

  static async deleteNode(id) {
    const node = await super.findOne({where: {id}});
    if (!node)
      throw new Error('Data not found');
    return node.destroy();
  }

  static async renameNode(id, text) {
    const node = await super.findOne({where: {id}});
    if (!node)
      throw new Error('Data not found');
    node.text = text;
    await node.save();
  }
}