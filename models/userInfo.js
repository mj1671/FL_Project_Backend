module.exports = (sequelize, Sequelize) => {
	const userInfo = sequelize.define("userInfo", { //테이블이랑 밑에는 칼럼
		AGE: {type: Sequelize.INTEGER},
  		ADDRESS: {type: Sequelize.STRING},
      	USERID: {
            type: Sequelize.STRING,
            primaryKey : true // id 생성안되게함
        },
        USERNAME: {type: Sequelize.STRING},
        SEX: {type: Sequelize.STRING},
        
	}, 
    {
        timestamps : false, // 다른칼럼 생성안되게함
        freezeTableName: true, // 테이블 이름 복수형x
        //tableName: "userInfo"
    });
	return userInfo
};