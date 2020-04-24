const API = 'http://localhost:8000'

const gql = (query, variables) =>
  fetch(`${API}/graphql`, {
    body: JSON.stringify({ query, variables }),
    headers: { ['Content-Type']: 'application/json' },
    method: 'POST',
  })
    .then(r => r.json())
    .then(r => {
      if (r.errors) throw r.errors[0].message

      return r.data
    })

export const login = variables => {
  const query = `mutation($email: String!, $password: String!) {
    login (email: $email, password: $password)
  }`

  return gql(query, variables)
}
