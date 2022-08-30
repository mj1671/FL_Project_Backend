module.exports = (sequelize, Sequelize) => {
	const member = sequelize.define("MEMBER", { //테이블이랑 밑에는 칼럼
		MEM_NO: {
            type: Sequelize.STRING,
            primaryKey : true // id 생성안되게함
        },
  		GENDER: {type: Sequelize.STRING},
      	AGEBAND: {type: Sequelize.INTEGER},
        DATE: {type: Sequelize.DATE},
        ADDRESS: {type: Sequelize.STRING},
        
    }, 
    {
        timestamps : false, // 다른칼럼 생성안되게함
        freezeTableName: true, // 테이블 이름 복수형x
        //tableName: "MEMBER"
    });
	return member
};