const newsModel = require('./newsModel')

class NewsCollection {

  constructor() {
    this.model = newsModel;
  }
  get(_id) {
    if (_id){
      return this.model.findOne({_id});
    }
    else {
      return this.model.find({});
    }
  }
  create(record){
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  update(_id,record){
    return this.model.findByIdAndUpdate(_id, record, {new: true});
  }

  delete(_id){
    return this.model.findByIdAndDelete(_id);
  }
}

const newsletter =new NewsCollection();
module.exports = newsletter
