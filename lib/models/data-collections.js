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
    // return await this.model.scan(attrib).eq(val).exec();
    //need to find a way to query for a given attribute
    // return await this.model.findAll({ where: { attrib: val } });
    // return await this.model.findAll({ attributes: [attrib], where: { firstName: val } });
    return await this.model.findAll({ where: { [Op.or]: [{ firstName: val }, { lastName: val }, { email: val }] } });
  }

  async create(record) {
    return await this.model.create(record);
  }

  async update(id, data) {
    try{
      return await this.model.update({ data }, { where: { id }, returning: true });
    } catch(err){
      return false;
    }
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }
}

module.exports = DataCollections;
