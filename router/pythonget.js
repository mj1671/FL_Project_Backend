const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const db = require("../models");
const { member, sequelize } = require('../models');
const Op = db.Sequelize.Op; //연산자 등호같은거

//밑에 get에 필요
const {spawn} = require('child_process');
const PythonShell = require('python-shell');

//밑에 post에 필요
const path = require('path');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' })
const fs = require('fs');


const storage = multer.diskStorage({ // node.js에서 이미지나 파일 업로드(저장)시 multer 사용
    destination: function (req, file, cb) { //저장 위치
        cb(null, 'C:/Study/python/1')
    },
    filename: function (req, file, cb) { //저장할 파일 이름
        cb(null, file.fieldname + '-' + Date.now() + '.jpg') // jpg 파일로 저장
    }
});

const upload = multer({ storage: storage })

router.post('/imgupload', upload.single('file'), function(req, res) { //파일 한개 single, 여러개는 field 또는 
    const options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        //args: ['테스트1', 'test2', 'test3'] //
        args: [req.file.filename]
    };

    PythonShell.PythonShell.run('python/python.py', options, function(err, results){
        if(err) throw err;
        console.log('results: %j', results);
        //res.send('CNN 모델에서 나온 결과 값 : ' + results)
        res.send(results)

    });
    
    // console.log(req.file.path)

    // res.status(200).send({ //key : value 형태라서 {}로 묶어줌. 그냥 results 보내는 거면 {} 없어야함
    //     //message: "ok",
    //     //fileInfo: req.file.path //front에 보내는 data
    // })
})

router.get('/', function(req, res, next){ // python 실행하는 코드
    let dataToSend;
    const python = spawn('python3', ['../python/python.py']);
    python.stdout.on('data', (data) => {
        dataToSend = data.toString();
        console.log(data.toString())
    })
    python.on('close', (code) =>{
        res.send(dataToSend)
    })
})

// router.get('/t1', function(req, res, next){ // python 실행하는 코드
//     const options = {
//         mode: 'text',
//         pythonPath: '',
//         pythonOptions: ['-u'],
//         scriptPath: '',
//         args: ['테스트1', 'test2', 'test3']
//     };

//     PythonShell.PythonShell.run('python/python.py', options, function(err, results){
//         if(err) throw err;
//         console.log('results: %j', results);
//         res.send('CNN 모델에서 나온 결과 값 : ' + results)
//     });
// })

module.exports = router;