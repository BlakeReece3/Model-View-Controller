const sequelize = require('../config/connection');
const { User, Page, comments } = require('../models');

const commentData = require('./commentData.json');
const userData = require('./userData.json');
const pageData = require('./pageData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const page of pageData) {
    await Page.create({
      ...page,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();