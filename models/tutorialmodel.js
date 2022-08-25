module.exports = (sequelize, Sequelize) => {
	const Tutorial = sequelize.define("tutorial", { //테이블이랑 밑에는 칼럼
		title: {
  			type: Sequelize.STRING
		},
  		description: {
  			type: Sequelize.STRING
		},
      	published: {
  			type: Sequelize.BOOLEAN
		}
	});

	return Tutorial
};