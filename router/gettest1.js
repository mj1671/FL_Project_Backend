/*const request = require('request'); //api 사용
const express = require('express'); //서버 사용
const router = express.Router(); //express 라이브러리 안에 있는 기능
/*
router.get('/', function(req,res){
    //res.redirect('https://www.naver.com')
})
*/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

router.get('/tutorial', async function(req, res, next) {
    
    //Create and save a new tutorial
    //exports.create = (req, res) => { //res 값 위에랑 중복되서 안써야함
    if (!req.query.title) {
      res.status(400).send({
      message: "Content can not be empty!",
      });
      return;
    }

    const tutorial = {
        title: req.query.title, //get써서 query 사용. post면 body 사용
        description: req.query.description,
        published: req.query.published ? req.query.published : false,
    };

    // insert함. 테이블 없으면 생성까지 함
    Tutorial.create(tutorial) 
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the tutorial.",
        });
        });
    }
)

/* GET */
router.get('/', function(req, res) { // next
    var gender = req.query.gender;
    var age = req.query.age;

    if (age >= 10 && age < 20) {
        ageband = 10
        res.send(ageband + '대 ' + gender + '이 접속했습니다.')
    }
    else if (age >= 20 && age < 30) {
        ageband = 20
        res.send(ageband + '대' + gender + '이 접속했습니다.')
    }
    else if (age >= 30 && age < 40) {
        ageband = 30
        res.send(ageband + '대' + gender + '이 접속했습니다.')
    }
    else if (age >= 40) {
        ageband = 40
        res.send(ageband + '대 이상 ' + gender + '이 접속했습니다.')
    }
    else
        res.send('10대 미만 ' + gender + '이 접속했습니다.')
    

    //res.send(age + '대' + gender + '이 접속했습니다.')
    //res.render('gettest1', { title: 'Express', gender : gender, age : age, method: "get" });
    //console.log("이 접속했습니다.");
});

module.exports = router;