const createLimitedQuery = query => limit =>
  limit ? query.limit(limit) : query;

module.exports = {
  createLimitedQuery,
};
