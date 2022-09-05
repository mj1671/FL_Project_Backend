/*const request = require('request'); //api 사용
const express = require('express'); //서버 사용. express 모듈을 가져옴
const router = express.Router(); //express 라이브러리 안에 있는 기능

router.post('/', function(req,res){
    res.send('post 요청 받아 회신 드림')
    //res.redirect('https://www.naver.com')
})

router.get('/', function(req,res){
    res.send('get 요청 받아 회신 드림')
})
*/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { query } = require('express');
const Op = db.Sequelize.Op; //연산자 등호같은거
const Tutorial = db.tutorials;

router.post('/tutorial', async function(req, res, next) {
    
    //Create and save a new tutorial
    //exports.create = (req, res) => { //res 값 위에랑 중복되서 안써야함
    if (!req.body.title) {
      res.status(400).send({
      message: "Content can not be empty!",
      });
      return;
    }

    let queryWhere = {};
    queryWhere.title = {
        [Op.eq] : req.body.title,
    };

    const tutorialData = await Tutorial.findAll({
        where: queryWhere,
        raw:true
    })

    return res.send(tutorialData);
    }
)

/* POST */
router.post('/', function(req, res) { // next
    var from = req.body.from;
    var to = req.body.to;
    // var result = req.body; 하나만 선언하고 body에서 파라미터(from, to) 설정하면 result.from, result.to 로도 사용할 수 있음

    let sum = 0;
    for (let i=from; i<=to; i++){ // i = result.from; i <= result.to;
        sum += i;
    }

    res.send(from + ' ~ ' + to + ' 총 합 : '+ sum) // result.from, result.to
    //res.render('posttest1', { title: 'Express', gender : gender, age : age, method: "post" });
    //console.log(" ");
});

module.exports = router;