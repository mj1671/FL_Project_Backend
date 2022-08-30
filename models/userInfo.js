module.exports = (sequelize, Sequelize) => {
	const userInfo = sequelize.define("userInfo", { //테이블이랑 밑에는 칼럼
		AGE: {type: Sequelize.INTEGER},
  		ADDRESS: {type: Sequelize.STRING},
      	USERID: {type: Sequelize.STRING,
            primaryKey : true},
        USERNAME: {type: Sequelize.STRING},
        SEX: {type: Sequelize.STRING},
        
	}, 
    {
        timestamps : false,
        freezeTableName: true,
        //tableName: "userInfo"
    });
	return userInfo
};