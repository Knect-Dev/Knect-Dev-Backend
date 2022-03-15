'use strict';

class DataCollections {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    if (id) {
      try {
        return await this.model.findOne({ where: { id } });
      } catch (err) {
        return false;
      }
    } else {
      try {
        return await this.model.findAll();
      } catch (err) {
        return false;
      }
    }
  }

  async getBy(attrib, val) {
    try {
      return await this.model.findAll({ where: { [attrib]: val } });
    } catch (err) {
      return false;
    }
  }

  async create(record) {
    try {
      return await this.model.create(record);
    } catch (err) {
      // return err.message;
      return err;
    }
  }

  async update(id, data) {
    try {
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
    try {
      return await this.model.destroy({ where: { id } });
    } catch (err) {
      return false;
    }
  }
}

module.exports = DataCollections;
