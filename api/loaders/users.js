const DataLoader = require('dataloader');
const { db } = require('../db');

const userLoader = () => new DataLoader(async ids => {
  const users = await db.table('users').getAll(...ids).run();
  return ids.map(id => users.find(u => u.id === id) || null);
});

module.exports = userLoader;
