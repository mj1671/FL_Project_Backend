const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op; //연산자 등호같은거
const Visualdata = db.visualdata; // VisualData 테이블과 관련된 모델 visualdata.js를 불러오는게(require) db.visualdata -> 간단하게 Visualdata 로 선언


router.get('/', async function(req, res, next) {
    // if (!req.query.COMP_ID) {
    //     res.status(400).send({
    //     message: "Content can not be empty!",
    //     });
    //     return;
    // }

    const visualData = await Visualdata.findAll({
        //where : queryWhere,
        raw:true
    })

    return res.send(visualData);
})

router.post('/comp', async function(req, res, next) {
    
    let queryWhere = {};
    queryWhere.COMP_ID = { [Op.eq] : req.body.COMP_ID }; // -> queryWhere = {}에 {COMP_ID : front에서 받아온 파라미터. COMP_ID를 키로 가지는 값 'A'} 들어감
    //req.body.COMP_ID 는 front(vue)로 부터 받는 파라미터 값. 여기서 COMP_ID는 키. 즉 COMP_ID : 값 형태로 받음

    const visualData = await Visualdata.findAll({  //findAll ㅡ> select 조회하는거. 결과를 visualData 변수에 넣음
        where: queryWhere, // { : } 형태
        raw: true
    })

    return res.send(visualData); //front(vue)에 visualData를 반환함
    }
)

module.exports = router;