module.exports = (sequelize, Sequelize) => {
	const Tutorial = sequelize.define("tutorial", { //테이블이랑 밑에는 칼럼. tutorial이라 적었어도 tutorials 복수형으로 테이블 생성됨
		title: {
  			type: Sequelize.STRING
		},
  		description: {
  			type: Sequelize.STRING
		},
      	published: {
  			type: Sequelize.BOOLEAN
		}
	} 
    //{
    //    timestamps : false, // 다른칼럼 생성안되게함
    //    freezeTableName: true, // 테이블 이름 복수형x
    //    //tableName: "userInfo"
    //}
	);

	return Tutorial
};