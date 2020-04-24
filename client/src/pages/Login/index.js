import { h } from 'preact'
import { useState } from 'preact/hooks'
import styled from 'astroturf'

import { FullButton, Header, Input as InputBase, Title } from '../../components'
import * as api from '../../api'

import ERRORS from '../../../../api/schema/errorCodes'

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

  &.error {
    border-bottom: 1px solid red;
  }
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
  const [error, setError] = useState(null)

  // TODO: Show error messages for these, fix border color
  const emailError = error === ERRORS.EMAIL_NOT_FOUND
  const passwordError = error === ERRORS.INCORRECT_PASSWORD

  const login = () => {
    api
      .login({ email, password })
      .then(x => console.log(x))
      .catch(setError)
  }

  const onKeyDownPassword = e => {
    if (e.key === 'Enter') {
      login()
    }
  }

  return (
    <Page>
      <Header />
      <Container>
        <Title>Login to Findr</Title>

        <InputGroup>
          <Input
            error={emailError}
            onInput={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            value={email}
          />
          <Input
            error={passwordError}
            onInput={e => setPassword(e.target.value)}
            onKeyDown={onKeyDownPassword}
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
