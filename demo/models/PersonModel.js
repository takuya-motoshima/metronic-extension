const Model = require('express-sweet').database.Model;
const {merge} = require('deep-fusion');

module.exports = class extends Model {
  static get table() {
    return 'person';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: this.DataTypes.STRING,
      position: this.DataTypes.STRING,
      office: this.DataTypes.STRING,
      age: this.DataTypes.INTEGER,
      startDate: this.DataTypes.DATE,
      salary: this.DataTypes.DECIMAL(10, 2),
    };
  }

  /**
   * Get page data.
   */
  static async paginate(paginationOptions) {
    // Initialize options.
    paginationOptions = merge({
      start: 0,
      length: 30,
      order: 'name',
      dir: 'asc',
      search: {
        keyword: null,
      },
    }, paginationOptions);

    // Filter conditions.
    const where = {};
    if (paginationOptions.search.keyword)
      where.name = {[super.Op.like]: `%${paginationOptions.search.keyword}%`};

    // Get page data.
    const data = await super.findAll({
      where,
      offset: parseInt(paginationOptions.start, 10),
      limit: parseInt(paginationOptions.length, 10),
      order: [
        [super.col(paginationOptions.order), paginationOptions.dir],
      ],
      raw: true,
    });

    // Get the total number of records.
    const recordsTotal = await super.count();

    // Get the number of filtered records.
    const recordsFiltered = await super.count({where});
    return {data, recordsTotal, recordsFiltered};
  }
}