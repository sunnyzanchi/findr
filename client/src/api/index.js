const API = 'http://localhost:8000'

const call = query =>
  fetch(`${API}/graphql`, { body: JSON.stringify({ query }), method: 'POST' })

export const login = ({ email, password }) => {
  const query = `{
    mutation {
      login (email: "${email}", password: "${password}")
    }
  }`

  return call(query)
}
