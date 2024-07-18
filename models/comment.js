const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'comment_text', // Updated from comment_text to commentText
    },
    userId: { // Updated from user_id to userId
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Ensure this matches your User model's table name
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // Ensure this matches your Post model's table name
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;