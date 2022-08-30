module.exports = (sequelize, Sequelize) => {
	const order = sequelize.define("ORDER", { //테이블이랑 밑에는 칼럼
		ORDER_NO: {
            type: Sequelize.STRING,
            primaryKey : true // id 생성안되게함
        },
        MEM_NO: {type: Sequelize.STRING},
  		ORDER_DATE: {type: Sequelize.DATE},
      	SHOP_CODE: {type: Sequelize.INTEGER},
        PRODUCT_CODE: {type: Sequelize.INTEGER},
        SALES_AMT: {type: Sequelize.INTEGER},
        
	}, 
    {
        timestamps : false, // 다른칼럼 생성안되게함
        freezeTableName: true,  // 테이블 이름 복수형x
        //tableName: "ORDER"
    });
	return order
};