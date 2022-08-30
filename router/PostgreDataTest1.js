const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op;
//const Tutorial = db.tutorials;
const Member = db.member; //
const Order = db.order; //
const UserInfo = db.userInfo; //

router.get('/userInfo', async function(req, res, next) {
    // if (!req.query.USERID) {
    //     res.status(400).send({
    //     message: "Content can not be empty!",
    //     });
    //     return;
    // }
  
    // const userInfo = {
    //     //title: req.query.title, //get써서 query 사용. post면 body 사용
    //     //description: req.query.description,
    //     //published: req.query.published ? req.query.published : false,
    //     AGE: req.query.AGE,
    //     ADDRESS: req.query.ADDRESS,
    //     USERID: req.query.USERID,
    //     USERNAME: req.query.USERNAME,
    //     SEX: req.query.SEX
    // };
    
    // // insert함. 테이블 없으면 생성까지 함
    // UserInfo.create(userInfo) 
    //     .then((data) => {
    //     res.send(data);
    //     })
    //     .catch((err) => {
    //     res.status(500).send({
    //     message:
    //     err.message || "Some error occurred while creating the userInfo.",
    //     });
    // });
    
    // Retrieve all Tutorials from the database.
    //exports.findAll = (req, res) => {
        // const USERID = req.query.USERID;
        // var condition = USERID ? { USERID: { [Op.iLike]: `%${USERID}%` } } : null;
      
        // UserInfo.findAll({ where: condition })
        //   .then((data) => {
        //     res.send(data);
        //   })
        //   .catch((err) => {
        //     res.status(500).send({
        //       message:
        //         err.message || "Some error occurred while retrieving tutorials.",
        //     });
        //   });
    //};

    /*
    UserInfo.query("SELECT * FROM userInfo", function (error, result) {
        if (error) {
          throw error;
        }
        res.status(200).json({
          data: result.rows,
        });
      });
    
    */

    const userInfoData = await UserInfo.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(userInfoData);
})


router.get('/member', async function(req, res, next) {
    // if (!req.query.MEM_NO) {
    //     res.status(400).send({
    //     message: "Content can not be empty!",
    //     });
    //     return;
    // }
  
    // const member = {
    //     MEM_NO: req.query.MEM_NO,
    //     GENDER: req.query.GENDER,
    //     AGEBAND: req.query.AGEBAND,
    //     DATE: req.query.DATE,
    //     ADDRESS: req.query.ADDRESS,
    // };

    // // insert함. 테이블 없으면 생성까지 함
    // Member.create(member) 
    //     .then((data) => {
    //     res.send(data);
    //     })
    //     .catch((err) => {
    //     res.status(500).send({
    //     message:
    //     err.message || "Some error occurred while creating the MEMBER.",
    //     });
    // });
    
    // Retrieve all Tutorials from the database.
    //exports.findAll = (req, res) => {
        // const MEM_NO = req.query.MEM_NO;
        // var condition = MEM_NO ? { MEM_NO: { [Op.iLike]: `%${MEM_NO}%` } } : null;
      
        // Member.findAll({ where: condition })
        //   .then((data) => {
        //     res.send(data);
        //   })
        //   .catch((err) => {
        //     res.status(500).send({
        //       message:
        //         err.message || "Some error occurred while retrieving tutorials.",
        //     });
        //   });
    //};

    /*
    Member.query("SELECT * FROM MEMBER", function (error, result) {
        if (error) {
          throw error;
        }
        res.status(200).json({
          data: result.rows,
        });
      });
    
    */

    const memeberData = await Member.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(memeberData);
})

router.post('/memberjoin', async function(req, res, next) {
    if (!req.body.join) {
      res.status(400).send({
      message: "Content can not be empty!",
      });
      return;
    }
  
    if(req.body.join == 'inner'){
      // member.belongsTo(order, {foreignKey: 'MEM_NO'});
      // order.hasOne(member, {foreignKey : 'MEM_NO'});
      // const memberjoinData = await order.findAll({
      //   include: [member]
      // });
      
      Member.hasOne(Order);
      // Order.belongsTo(Member);
      const memberjoinData = await Member.findAll({
          //where : queryWhere,
          include:[
            {
              attributes: ['MEM_NO'],
              required: true,
              model: Order,
              on: {
                MEM_NO : Sequelize.where(
                  Sequelize.col("MEMBER.MEM_NO"),
                  Op.eq,
                  Sequelize.col("ORDER.MEM_NO"),
                )
              }
            }
          ],
          raw:true
      })
      return res.send(memberjoinData);
    }
    else{
      res.send("파라미터 값이 틀렸습니다.");
    }
})

module.exports = router;