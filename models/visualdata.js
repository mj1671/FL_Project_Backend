module.exports = (sequelize, Sequelize) => {
	const visualdata = sequelize.define("VisualData", { //테이블이랑 밑에는 칼럼
		DATE_T: {type: Sequelize.DATE},
        COMP_ID: {
            type: Sequelize.STRING,
            primaryKey : true // id 생성안되게함
        },
        TOTALCNT: {type: Sequelize.STRING}, // INTEGER?
        
    }, 
    {
        timestamps : false, // 다른칼럼 생성안되게함
        freezeTableName: true, // 테이블 이름 복수형x
        //tableName: "VisualData"
    });
	return visualdata
};