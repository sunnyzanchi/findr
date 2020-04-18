import { h } from 'preact'
import styled from 'astroturf'
import { FullButton as FullButtonBase } from '../../components'
import Header from '../../components/Header'

const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const FullButton = styled(FullButtonBase)`
  margin-bottom: 60px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Home = () => (
  <Container>
    <Header />
    <ButtonGroup>
      <FullButton>Create a Game</FullButton>
      <FullButton>Find a Game</FullButton>
    </ButtonGroup>
  </Container>
)

export default Home
