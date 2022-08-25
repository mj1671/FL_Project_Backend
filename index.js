//index.js
const express = require('express') //3번 단계에서 다운받았던 express 모듈을 가져온다.
const app = express() //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다.
const port = 3010 //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 3010번 포트를 백 서버로 두겠다.
const sequelize = require('sequelize')

app.use(express.json({
  limit:"50mb",
}));

app.use(express.urlencoded({
  limit:"50mb",
  extended: false
}));

const db = require('./models') // 추가. db연결할때 필요함
db.sequelize.sync() // 추가. db연결할때 필요함

const gettest1 = require('./router/gettest1')
const posttest1 = require('./router/posttest1')

app.use('/api/gettest1', gettest1)
app.use('/api/posttest1', posttest1)

// app.get('/test', (req, res) => { //express 앱(app)을 넣고, root directory에 오면, 
//   res.send('Hello World!') //"Hello World!" 를 출력되게 해준다.
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) //포트 3010번에서 이 앱을 실행한다.