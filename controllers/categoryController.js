'use strict';


var mongoose = require('mongoose'),
Categories = mongoose.model('Categories');


 var path = require('path');
 var multer = require('multer');

// var diskStorage = multer.diskStorage({
//         // destination: (req, file, fileCallback) => {
//         //   fileCallback(null, './Uploads/Category');
//         // },
//         filename:(req,file,fileCallback) => {
//          // console.log(req.file);
//          // req.body.categoryImage=req.file.buffer;         
//           var fileName = path.basename(file.originalname,path.extname(file.originalname));
//           var fullFileName = fileName +"_"+ Date.now() + path.extname(file.originalname);                 
//           fileCallback(null,fullFileName);
//           // var filePath = './Uploads/Category/' + fullFileName;
//           // console.log(filePath);
//           // req.body.categoryImageUrl = req.body.categoryImageUrl + filePath;
//          // console.log(req.body.categoryImageUrl);
//           // console.log(fullFileName.valueOf());
//         }
//   });

  //var upload = multer({storage: diskStorage}).single('uploads');
 
  var upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
        return cb(new Error('This is not a correct format of the file'))
        cb(undefined,true)
    }
    }).single('uploads');


exports.all = function(req, res) {
    var query = {isActive : true};

    Categories.find(query, function(err, categories) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Roles Response: "+ roles);
      //set for all collection before response
      categories.forEach(function(item,i,arr){
        item.categoryImageBase64 = Buffer.from(item.categoryImage, 'binary').toString('base64');
        item.categoryImage = null;
      });     
    res.json({status:"0", message: "success", data:{categories}});
  });
};

//get category for id
exports.getCategoryById = function(req,res){
    const id = req.params.id.toString();
    var query = {_id : id};
    Categories.findOne(query,function(err,categories){
      if(err)
        res.send({status:"1", message: err, data:null});
        categories.categoryImageBase64 = Buffer.from(categories.categoryImage, 'binary').toString('base64');
        categories.categoryImage = null;
      res.json({status:"0", message: "success", data:{categories}});
  });
};

exports.createCategory = function(req, res) {
  //res.set('Content-Type','application/json');
  try {
   //check if this category already exists
   var query = {isActive : true, theme: req.body.theme, level: req.body.level, category:req.body.category};

      Categories.find(query, function(err, categories) {
        if(err)
          res.send({status:"1", message: err, data:null});
        if(categories.length > 0) {
          res.send({status:"1", message: "Category already exists!", data:null});
        }
        else{
          upload(req,res,function(err){
            if(err)
            res.send({status:"1", message: err, data:null});
            var newCategory = new Categories(req.body);
            newCategory.categoryImage=req.file.buffer;
            newCategory.save(function(err, category) {
              if (err)
              res.send({status:"1", message: err, data:null});
              category.categoryImageBase64 = Buffer.from(category.categoryImage, 'binary').toString('base64');
              category.categoryImage = null;
              res.json({status:"0", message: "success", data:{category}});
            });
          });
        }
      });
    }
    catch(e){
      console.log(e);
      res.send({status:"1", message: "Please try again later!", data:null});
    }
  };

  exports.updateCategory = function(req,res){
    let id = req.body._id;
    if(id == null || id == "")
    res.send({status:"1", message: "Not Exists!", data:null});
    var query = {_id : id};
    upload(req,res,function(err){
      if(err)
      res.send({status:"1", message: err, data:null});
    var newQuery = {$set:{ theme: req.body.theme, level: req.body.level, category: req.body.category,
        categoryImage: req.file.buffer, description: req.body.description, 
        isApproved:req.body.isApproved,isActive:req.body.isActive,updatedBy:req.body.updatedBy,updatedDate:req.body.updatedDate}};
        Categories.updateOne(query,newQuery,function(err, updateResponse){
     if(err)
      res.send({status:"1", message: err, data:null});
     res.json({status:"0", message: "success", data: null});
    });
  });
  };

  // exports.getImage = function(req,res){
  //   let imageId = req.params.id.toString();
  //   console.log(imageId);
  //   try {
  //     var query = {isActive : true};
  //     Categories.find(query, function(err, categories) {
  //       if(err)
  //        res.send({status:"1", message: err, data:null});
  //       //res.set('Content-Type', 'image/jpg')

  //       var base64data = Buffer.from(categories[0].categoryImage, 'binary').toString('base64');
  //       res.send(base64data);
  //     });
  //     // var query = {_id : imageId};
  //     // Categories.find(query,function(err,categories) {
  //     //   if(err)
  //     //   res.send({status:"1", message: err, data:null});
  //     //   console.log(categories);
  //     //   if (!categories || !categories[0].categoryImage)
  //     //     throw new Error();
  //     //     res.set('Content-Type', 'image/jpg')
  //     //     res.send(categories.categoryImage);
  //     // });
  //   } catch (e) {
  //     res.status(404).send()
  //   }
  // };