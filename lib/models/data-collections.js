'use strict';

class DataCollections {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    if (id) {
      return await this.model.findOne({ where: { id } });
    } else {
      return await this.model.findAll();
    }
  }

  async getBy(attrib, val) {
    return await this.model.findAll({ where: { [attrib]: val } });
  }

  async create(record) {
    return await this.model.create(record);
  }

  async update(id, data) {
    try{

      let result = await this.model.update(data, { where: { id } });
      if (result[0] === 1) {
        //get the updated object from the database
        result = this.model.findOne({ where: { id } })
      }
      return result;

    } catch(err){
      return false;
    }
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }
}

module.exports = DataCollections;
