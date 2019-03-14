var express = require("express");
var router = express.Router();
var UserModel = require("../modal/password").UserModel;
const RestResult = require('./RestResult');

//更新用户信息,param 为userInfo,userId
router.post('/password', function (req, res, next) {
  var resData = new RestResult();
  var param = req.body;
  var userId = param.userId;
  var password = param.password;
  UserModel.findOne({userId: userId}, function (err, doc) {
    if (err) {
        resData.code = 5;
        resData.errorReason = RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION;
        res.send(resData);
        return;
    }
    if (doc) {
      UserModel.update({userId: userId},
        {
            $set: {
                userId: userId,
                password: password,
            }
        },
        function (err, doc) {
            if (err) {
                resData.code = 5;
                resData.errorReason = RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION;
                res.send(resData);
            }
            else {
                res.send('success');
            }
        }
    );
    }
    else {
        var userEntity;
            userEntity = new UserModel({
                userId: userId,
                password: password
            })
        userEntity.save(function (err, doc) {
            if (err) {
                resData.code = 5;
                resData.errorReason = RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION;
                res.send(resData);
            }
            else {
                res.send('success');
            }
        });
    }
});
});
module.exports = router;