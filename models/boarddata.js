module.exports = (sequelize, Sequelize) => {
	const boarddata = sequelize.define("Board", { //테이블이랑 밑에는 칼럼
		id : {
            type: Sequelize.INTEGER,
            primaryKey : true // id 생성안되게함
        },
        title: {type: Sequelize.STRING},
        writer: {type: Sequelize.STRING},
        date: {type: Sequelize.DATE}, //
        
    }, 
    {
        timestamps : false, // 다른칼럼 생성안되게함
        freezeTableName: true, // 테이블 이름 복수형x
        //tableName: "Board"
    });
	return boarddata
};