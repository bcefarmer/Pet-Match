  
module.exports = function(sequelize, DataTypes) {
    var pets = sequelize.define("pets", {
    
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    // -----------------
    {timestamps: false, define:{freezeTableName: true}
    // ----------------
    
  },);
    
   
return pets;
  };
  