import { h } from 'preact'
import { useState } from 'preact/hooks'
import styled from 'astroturf'

import { FullButton, Header, Input as InputBase, Title } from '../../components'
import * as api from '../../api'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 48px 37px 32px;
`
const Input = styled(InputBase)`
  margin-bottom: 38px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Login = () => {
  // TODO: Fix astroturf double styled ref issue
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    api.login({ email, password }).then(x => console.log(x))
  }

  return (
    <Page>
      <Header />
      <Container>
        <Title>Login to Findr</Title>

        <InputGroup>
          <Input
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            value={email}
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            value={password}
          />
        </InputGroup>

        <FullButton onClick={login}>Log In</FullButton>
      </Container>
    </Page>
  )
}
export default Login
