const User = require('./User');
const Page = require('./Page');
const comment = require('./comments');

Page.belongsTo(User, {
    foreignKey: 'user_id'
  });
comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
Page.hasMany(comment, {
    foreignKey: 'page_id',
});

module.exports = { User, Page, comment };