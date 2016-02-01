FacilityPolicy = new Mongo.Collection('facilityPolicy');
FacilityTransactions = new Mongo.Collection('facilityTransactions');
AdminRegistration = new Mongo.Collection('adminRegistration');

FacilityPolicy.allow({ 
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});