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
  static async paginate(options) {
    // Initialize options.
    options = merge({
      start: 0,
      length: 30,
      order: 'name',
      dir: 'asc',
      search: {
        keyword: null,
      },
    }, options);

    // Filter conditions.
    const where = {};
    if (options.search.keyword)
      where.name = {[super.Op.like]: `%${options.search.keyword}%`};

    // Get page data.
    const data = await super.findAll({
      where,
      offset: parseInt(options.start, 10),
      limit: parseInt(options.length, 10),
      order: [super.literal(`${options.order} ${options.dir}`)],
      raw: true,
    });

    // Get the total number of records.
    const recordsTotal = await super.count();

    // Get the number of filtered records.
    const recordsFiltered = await super.count({where});
    return {data, recordsTotal, recordsFiltered};
  }
}