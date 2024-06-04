import User from './user';
import Post from './post';
import Comment from './comment';

// A user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// A user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// A comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };