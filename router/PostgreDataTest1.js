const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op; //연산자 등호같은거
//const Tutorial = db.tutorials; // tutorials 테이블과 관련된 모델 tutorialmodel.js를 불러오는게(require) db.tutorials -> 간단하게 Tutorial 로 선언
const Member = db.member; // MEMBER 테이블과 관련된 모델 member.js를 불러오는게(require) db.member -> 간단하게 Member 로 선언
const Order = db.order; //
const UserInfo = db.userInfo; //

router.get('/userInfo', async function(req, res, next) {
    
    const userInfoData = await UserInfo.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(userInfoData);
})


router.get('/member', async function(req, res, next) {
    
    const memeberData = await Member.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(memeberData);
})

router.post('/memberjoin', async function(req, res, next) {
    //↓ 원래 req.body.join인데 json.parse(req.body.join)로 변경. 왜? front에서 post방식으로 보내면 json형식으로 받아서?
    if (!JSON.parse(req.body.join)) { //front에서 받은 데이터(info -> json.parse(req.body.join) )가 없으면(!느낌표) 
      res.status(400).send({
      message: "Content can not be empty!",
      });
      return;
    }

    if(JSON.parse(req.body.join) == 'inner'){ //front에서 받은 데이터(info -> json.parse(req.body.join) )가 inner 랑 같으면
      // Member.hasOne(Order, {foreignKey : 'MEM_NO'});
      // Order.belongsTo(Member, {foreignKey: 'MEM_NO'});
      // const memberjoinData = await Member.findAll({
      //   include: [Order]
      // });
      
      Member.hasOne(Order); //Member랑 Order 1:1 관계 -> hasOne, 1:다수 관계 -> hasMany
      // Order.belongsTo(Member);
      const memberjoinData = await Member.findAll({  //findAll ㅡ> select 조회하는거. 밑에 include 즉, join한 결과를 memberjoinData 변수에 넣음
          include:[
            {
              attributes: ['MEM_NO'], // attribues: 특정 칼럼
              required: true,
              model: Order, // await 뒤에적힌 Member 랑 join할 모델(테이블)
              on: {
                MEM_NO : Sequelize.where( //where 조건
                  Sequelize.col("MEMBER.MEM_NO"), //MEMBER 테이블의 MEM_NO 칼럼
                  Op.eq, //같다
                  Sequelize.col("ORDER.MEM_NO"), //ORDER 테이블의 MEM_NO 칼럼
                )
              }
            }
          ],
          raw:true
      })
      return res.send(memberjoinData); //front(vue)에 memberjoinData를 반환함
    }
    else{
      res.send("파라미터 값이 틀렸습니다.");
    }
})

module.exports = router;