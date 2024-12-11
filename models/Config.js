const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const configuration = sequelize.define("Config", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
});