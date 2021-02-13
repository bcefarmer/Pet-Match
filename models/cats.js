module.exports = function(sequelize, DataTypes) {
    var Cats = sequelize.define("Cats", {
      // The email cannot be null, and must be a proper email before creation
      id: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      sleepy: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });
}


// id int NOT NULL AUTO_INCREMENT,
// 	name varchar(255) NOT NULL,
// 	sleepy BOOLEAN DEFAULT false,
// 	PRIMARY KEY (id)