"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Users",
      {
        UserID: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        UserName: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        Password: {
          type: Sequelize.STRING
        },
        FirstName: {
          type: Sequelize.STRING,
          validate: {
            isAlpha: true
          }
        },
        LastName: {
          type: Sequelize.STRING,
          validate: {
            isAlpha: true
          }
        },
        Email: {
          type: Sequelize.STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        LastLogin: {
          type: Sequelize.DATE
        },
        DateCreated: {
          type: Sequelize.DATE
        },
        DateUpdated: {
          type: Sequelize.DATE
        },
        DateDeleted: {
          type: Sequelize.DATE
        }
      },
      {
        timestamps: true,
        createdAt: "DateCreated",
        updatedAt: "DateUpdated",
        deletedAt: "DateDeleted",
        paranoid: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
