import { h } from 'preact'
import { useState } from 'preact/hooks'
import { styled } from 'astroturf'
import FullButton from '../../components/FullButton'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Title from '../../components/Title'

const At = styled.p`
  color: #222;
  left: 0;
  position: absolute;
  transform: translate(-25%, 40%);
  top: 0;
`

const AtContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  margin: 46px 37px;
`

const FullButtonBottom = styled(FullButton)`
  margin-bottom: 0;
`

const InputGroup = styled.div`
  margin-bottom: 44px;
`

const InvalidHint = styled.p`
  color: #ff5959;
  font-size: 10px;
  padding-left: 12px;
  visibility: hidden;

  &.visible {
    visibility: visible;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const TitleText = styled(Title)`
  margin-bottom: 71px;
`

const TopGroup = styled.div`
  width: 100%;
`

const validateEmail = email => email !== '' && /.+@.+\..+/.test(email)
const validatePassword = password => password !== '' && password.length > 5
const validateUsername = username =>
  username !== '' && /^[a-zA-Z0-9_]+$/.test(username)

const Register = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  // Used to make sure we don't highlight a field as invalid while
  // the user is still editing it
  const [blurred, setBlurred] = useState(new Set())

  const updateBlurred = name => () => setBlurred(b => new Set(b).add(name))

  const submittable =
    validateEmail(email) &&
    validatePassword(password) &&
    validateUsername(username)

  const emailInvalid = blurred.has('email') && !validateEmail(email)
  const passwordInvalid = blurred.has('password') && !validatePassword(password)
  const usernameInvalid = blurred.has('username') && !validateUsername(username)

  return (
    <Page>
      <Header />
      <Container>
        <TopGroup>
          <TitleText>Register for Findr!</TitleText>

          <InputGroup>
            <Input
              invalid={emailInvalid}
              onBlur={updateBlurred('email')}
              onInput={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              value={email}
            />
            <InvalidHint visible={emailInvalid}>
              Email must include an @ symbol and a period
            </InvalidHint>
          </InputGroup>

          <InputGroup>
            <Input
              invalid={passwordInvalid}
              onBlur={updateBlurred('password')}
              onInput={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <InvalidHint visible={passwordInvalid}>
              Password must be atleast 6 characters
            </InvalidHint>
          </InputGroup>

          <InputGroup>
            <AtContainer>
              <At>@</At>
              <Input
                invalid={usernameInvalid}
                onBlur={updateBlurred('username')}
                onInput={e => setUsername(e.target.value)}
                placeholder="username"
                type="text"
                value={username}
              />
            </AtContainer>
            <InvalidHint visible={usernameInvalid}>
              Username can only contain letters, numbers, and underscores
            </InvalidHint>
          </InputGroup>
        </TopGroup>

        <FullButtonBottom
          disabled={!submittable}
          onCLick={() => onSubmit({ email, password, username })}
        >
          Register
        </FullButtonBottom>
      </Container>
    </Page>
  )
}

export default Register
