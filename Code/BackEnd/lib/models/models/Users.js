/**
 * @swagger
 *  components:
 *    schemas:
 *      Users:
 *        type: object
 *        properties:
 *          UserID:
 *            type: integer
 *            required: true
 *            description: Unique User Indentifier
 *          UserName:
 *            type: string
 *            required: true
 *            description: User inputted value used for future logins
 *          Password:
 *            type: string
 *            format: password
 *            required: true
 *            description: Hashed user password, is required
 *          FirstName:
 *            type: string
 *            nullable: true
 *            description: User's First Name.
 *          LastName:
 *            type: string
 *            nullable: true
 *            description: User's Last Name.
 *          Email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          LastLogin:
 *            type: string
 *            format: date-time
 *            description: Timestamp of last time a user logged in.
 *          DateCreated:
 *            type: string
 *            format: date-time
 *            description: Timestamp of when the user's account was created.
 *          DateUpdated:
 *            type: string
 *            format: date-time
 *            description: Timestamp of when the user's account was last updated.
 *          DateDeleted:
 *            type: string
 *            format: date-time
 *            description: Timestamp of when user's account was deleted. Active accounts will have a null value.
 *        example:
 *          UserID: 1
 *          UserName: Aelam
 *          Password: ABCDEFGH1234$%
 *          FirstName: Alex
 *          LastName: Elam
 *          Email: "james@alexelam.dev"
 *          LastLogin: 2020-03-24 12:12:00.2010000 -05:00
 *          DateCreated: 2020-03-24 11:31:00.5230000 -05:00
 *          DateUpdated: 2020-03-24 13:00:00.6030000 -05:00
 *          DateDeleted: null
 */

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      UserName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      FirstName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true
        }
      },
      LastName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true
        }
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      LastLogin: {
        type: DataTypes.DATE
      },
      DateCreated: {
        type: DataTypes.DATE
      },
      DateUpdated: {
        type: DataTypes.DATE
      },
      DateDeleted: {
        type: DataTypes.DATE
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

  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
