const mongoose = require('mongoose');
Fish = mongoose.model('Fish');

exports.list_all_fishs = function (req, res) {
  Fish.find({})
         .then(fishs => {
              if (!fishs) {
                  res.status(404);
                  return res.json({
                      status: "404",
                      message: "Could not find fishs."
                  });
              } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "fishs fetched successfully.",
                    fishs: fishs
                });
              }
         })
         .catch(err => {
              res.status(500);
              return res.json({
                  status: "500",
                  message: "Something went wrong."
              });
         });
}

exports.create_fish = function (req, res) {
  var new_fish = new Fish(req.body);
  Fish.findOne({nom:new_fish.nom})
      .then(fish => {
          if (!fish) {
              new_fish.save(function(err, fish) {
                  if (err) {
                      res.status(400);
                      return res.json({
                        status: "400",
                        message: "Could not create fish."
                      });
                  } else {
                      res.status(201);
                      return res.json({
                          status: "201",
                          message: "fish created.",
                          fish: fish
                      });
                  }
              });
          } else {
              res.status(403);
              return res.json({
                  status: "403",
                  message: "fish already exist.",
                  fish: req.body
              });
          }
      })
      .catch(err => {
          res.status(500);
          return res.json({
              status: "500",
              message: "Something went wrong."
          });
      });
}

exports.get_fish = function (req, res) {
  Fish.findOne({_id:req.params.id})
         .then(fish => {
              if (!fish) {
                  res.status(404);
                  return res.json({
                      status: "404",
                      message: "Could not find fish."
                  });
              } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "fish fetched successfully.",
                    fish: fish
                });
              }
         })
         .catch(err => {
              res.status(500);
              return res.json({
                  status: "500",
                  message: "Something went wrong."
              });
         });
}

exports.update_fish = function (req, res) {
  Fish.findOne({_id:req.params.id})
         .then(fish => {
            if (!fish) {
                res.status(404);
                return res.json({
                    status: "404",
                    message: "fish not found.",
                    fish: req.body
                });
            } else {
              Fish.updateOne(fish, req.body, function(err, result) {
                  if (err) {
                      res.status(400);
                      return res.json({
                          status: "400",
                          message: "Could not update fish.",
                          fish: req.body,
                      });
                   } else {
                     res.status(200);
                     return res.json({
                         status: "200",
                         message: "fish updated.",
                         fishOld: fish,
                         fishNew: req.body
                     });
                   }
              });
            }
         })
         .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something went wrong."
            });
         });
}

exports.delete_fish = function (req, res) {
  Fish.findOne({_id:req.params.id})
         .then(fish => {
            if (!fish) {
                res.status(404);
                return res.json({
                    status: "404",
                    message: "fish not found."
                });
            } else {
              Fish.deleteOne({_id:req.params.id}, function(err, result){
                  if (err) {
                      res.status(400);
                      return res.json({
                          status: "400",
                          message: "Could not delete fish.",
                          fishId: req.params.id
                      });
                   } else {
                     res.status(200);
                     return res.json({
                         status: "200",
                         message: "fish deleted.",
                         fishId: req.params.id
                     });
                   }
              });
            }
         })
         .catch(err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something went wrong."
            });
         });
}