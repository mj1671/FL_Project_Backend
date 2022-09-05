const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op; //연산자 등호같은거

const path = require('path');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

const storage = multer.diskStorage({ // node.js에서 이미지나 파일 업로드(저장)시 multer 사용
    destination: function (req, file, cb) { //저장 위치
        cb(null, 'C:/Study/python/1')
    },
    filename: function (req, file, cb) { //저장할 파일 이름
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({ storage: storage })


router.post('/imgupload', upload.single('file'), function(req, res) {
    console.log(req.file.path)

    res.status(200).send({
        message: "ok",
        fileInfo: req.file.path //front에 보내는 data
    })
    }
)

module.exports = router;