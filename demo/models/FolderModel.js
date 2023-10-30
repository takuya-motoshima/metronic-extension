const Model = require('express-sweet').database.Model;

module.exports = class extends Model {
  static get table() {
    return 'folder';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parent: this.DataTypes.INTEGER,
      text: this.DataTypes.STRING,
    };
  }

  static async createNode(parent, text) {
    return super.create({parent, text});
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

  static async findChildren(parent) {
    return parent === '#' ?
        super.query(
          `SELECT
            '#' parent, 'folder' type, \`text\`, id, if (counter.folderId IS NOT NULL, true, false) children
          FROM
            folder LEFT JOIN (
              SELECT
                folderId
              FROM
                (SELECT parent folderId FROM folder WHERE parent IS NOT NULL
                  UNION ALL SELECT folderId FROM file) t
              GROUP BY
                folderId
            ) counter ON folder.id = counter.folderId
          WHERE
            folder.parent is null`, {type: this.QueryTypes.SELECT}) :
        super.query(
          `SELECT
            parent, 'folder' type, \`text\`, id, if (counter.folderId IS NOT NULL, true, false) children
          FROM
            folder LEFT JOIN (
              SELECT
                folderId
              FROM
                (SELECT parent folderId FROM folder WHERE parent IS NOT NULL
                  UNION ALL SELECT folderId FROM file) t
              GROUP BY
                folderId
            ) counter ON folder.id = counter.folderId
          WHERE
            folder.parent = :parent
          UNION ALL
          SELECT
            folderId parent, 'file' type, \`text\`, id, NULl children
          FROM
            file
          WHERE
            folderId = :parent`, {type: this.QueryTypes.SELECT, replacements: {parent}});
  }
}