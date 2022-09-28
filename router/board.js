const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op; //연산자 등호같은거
//const Visualdata = db.visualdata; // VisualData 테이블과 관련된 모델 visualdata.js를 불러오는게(require) db.visualdata -> 간단하게 Visualdata 로 선언
const Boarddata = db.boarddata; //

router.get('/', async function(req, res, next) {
    // if (!req.query.COMP_ID) {
    //     res.status(400).send({
    //     message: "Content can not be empty!",
    //     });
    //     return;
    // }

    const boardData = await Boarddata.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(boardData);
})

router.get('/create', async function(req, res, next) {
    
    const add = {
        id: Number(req.query.id), //Number() 사용해서 다시 숫자로 바꿔주기
        title: req.query.title, //get써서 query 사용. post면 body 사용
        writer: req.query.writer,
        date: req.query.date
    };

    await Boarddata.create( //추가 'const boardData = ' 앞부분 필요없음
        add
    )

    return res.send("성공");
})

router.get('/change', async function(req, res, next) {
    const add = {
        //id: Number(req.query.id), //Number() 사용해서 다시 숫자로 바꿔주기
        title: req.query.title, //get써서 query 사용. post면 body 사용
        writer: req.query.writer,
        date: req.query.date
    };

    let queryWhere = {}; //
    queryWhere.id = { [Op.eq] : Number(req.query.id)}; // -> queryWhere = {}에 {COMP_ID : front에서 받아온 파라미터. COMP_ID를 키로 가지는 값 'A'} 들어감
    //axios로 받아온 쿼리파라미터는 숫자가 문자로 바뀌니까 다시 Number()로 숫자로 바꿔주고 []로 감싸서 다시 배열형태로 만들어줘야함
    //queryWhere.id 즉 postgreSQL 데이터에 있는 id칼럼은 interger 숫자이므로 오른쪽을 같은 형태로 만들어줘야함
    
    await Boarddata.update(add, { //수정 'const boardData = ' 앞부분 필요없음 저장하거나 다시 보낼 필요 없으니까
        where : queryWhere
        //raw:true
    })

    return res.send("성공");
})

router.get('/delete', async function(req, res, next) {
    
    let queryWhere = {}; //[Op.in] 배열에 포함되면
    
    let data = (req.query.id).split(',')
    console.log(data)
    console.log(Number([data]))
    console.log(Number(data))
    console.log([Number(data)])

    queryWhere.id = { [Op.in] : data }; // -> queryWhere = {}에 {COMP_ID : front에서 받아온 파라미터. COMP_ID를 키로 가지는 값 'A'} 들어감
    //axios로 받아온 쿼리파라미터는 숫자가 문자로 바뀌니까 다시 Number()로 숫자로 바꿔주고 []로 감싸서 다시 배열형태로 만들어줘야함
    //queryWhere.id 즉 postgreSQL 데이터에 있는 id칼럼은 interger 숫자이므로 오른쪽을 같은 형태로 만들어줘야함

    await Boarddata.destroy({ //삭제 'const boardData = ' 앞부분 필요없음 저장하거나 다시 보낼 필요 없으니까
        where : queryWhere
        //raw:true
    })

    return res.send("성공");
})
/*
router.post('/board', async function(req, res, next) {
    
    //let queryWhere = {};
    //queryWhere.COMP_ID = { [Op.eq] : req.body.COMP }; // -> queryWhere = {}에 {COMP_ID : front에서 받아온 파라미터. COMP_ID를 키로 가지는 값 'A'} 들어감
    // req.body.COMP_ID 는 front(vue)로 부터 받는 파라미터 값. 여기서 COMP_ID는 키. 즉 COMP_ID : 값 형태로 받음
    //queryWhere.DATE_T = { [Op.between] : [req.body.from, req.body.to] }; // [Op.between] : [ , ] 형태
    // between A B -> A <= X < B 따라서 B가 포함안되므로 포함되게 하기위해서 front에서 to: await this.month(this.todate.to) 에서 todate.to로 수정
    
    const boardData = await Boarddata.findAll({  //findAll ㅡ> select 조회하는거. 결과를 boardData 변수에 넣음
        //where: queryWhere, // { : } 형태
        raw: true
    })

    return res.send(boardData); //front(vue)에 boardData를 반환함
    }
)
*/
module.exports = router;