const API = 'http://localhost:8000'

const call = (query, variables) =>
  fetch(`${API}/graphql`, {
    body: JSON.stringify({ query, variables }),
    headers: { ['Content-Type']: 'application/json' },
    method: 'POST',
  })

export const login = variables => {
  const query = `mutation {
    login (email: $email, password: $password)
  }`

  return call(query, variables)
}
