const { DATE } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Day extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        subject: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaulValue: Sequelize.NOW,
        },
        minutes: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaulValue: 0,
        },
        hostName: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaulValue: 'UNKNOWN',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Day',
        tableName: 'Days',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Day.belongsTo(db.Subject);
  }
};
