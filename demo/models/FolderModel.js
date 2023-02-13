const Model = require('express-sweet').database.Model;
const FolderNotFound = require('../exceptions/FolderNotFound');

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

  static async getChildren(parent) {
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

  static async createFolder(parent, text) {
    return super.create({parent, text});
  }

  static async deleteFolder(folderId) {
    // console.log(`Delete the folder with ID ${folderId}`);
    const folder = await this.#getFolder(folderId);
    if (!folder)
      throw new FolderNotFound();
    return folder.destroy();
    // return super.destroy({where: {id: folderId}});
  }

  static async renameFolder(folderId, text) {
    const folder = await this.#getFolder(folderId);
    if (!folder)
      throw new FolderNotFound();
    folder.text = text;
    await folder.save();
  }

  static async #getFolder(folderId) {
    return super.findOne({where: {id: folderId}});
  }
}