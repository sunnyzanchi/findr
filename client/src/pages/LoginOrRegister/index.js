import { h } from 'preact'
import { styled } from 'astroturf'

import { FullButton as FullButtonBase, Header } from '../../components'

const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const FullButton = styled(FullButtonBase)`
  margin-bottom: 40px;
`

const LoginOrRegister = () => {
  return (
    <Container>
      <Header />
      <ButtonGroup>
        <FullButton>Log In</FullButton>
        <FullButton>Register</FullButton>
      </ButtonGroup>
    </Container>
  )
}

export default LoginOrRegister
