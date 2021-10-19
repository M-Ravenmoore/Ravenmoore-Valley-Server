const userModel = require('./userModel')

class UserCollection {

  constructor() {
    this.model = userModel;
  }
  
  get(_id) {
    if (_id){
      return this.model.findOne({_id});
    }
    else {
      return this.model.find({});
    }
  }

  getByEmail(email){
      return this.model.findOne({email});
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
const users =new UserCollection();
module.exports = users
