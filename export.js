print("key,id,classification");
db.Surveys.find().forEach(function(sur){
  print(sur.key+","+sur._id.valueOf()+","+sur.classification);
});