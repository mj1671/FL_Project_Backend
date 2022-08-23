/*const request = require('request'); //api 사용
const express = require('express'); //서버 사용
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