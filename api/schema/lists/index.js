const getList = require('./getList');
const getLists = require('./getLists');
const upsertList = require('./upsertList');
const { List, ListInputType } = require('./type');

const queries = {
  list: getList,
  lists: getLists,
};

const mutations = {
  list: upsertList,
};

module.exports = {
  List,
  ListInputType,
  mutations,
  queries,
};
