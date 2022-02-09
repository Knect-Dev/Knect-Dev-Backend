'use strict';

class DataCollections {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    if (id) {
      return await this.model.query('id').eq(id).exec();
    } else {
      return await this.model.scan().exec();
    }
  }

  async create(record) {
    return await this.model.create(record);
  }

  async update(id, data) {
    return await this.model.update({ id }, data);
  }

  async delete(id) {
    return await this.model.delete({ id });
  }
}

module.exports = DataCollections;