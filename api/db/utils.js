// In retrospect this seems dumb, probably want to remove this
const createLimitedQuery = query => limit =>
  limit ? query.limit(limit) : query

module.exports = {
  createLimitedQuery,
}
