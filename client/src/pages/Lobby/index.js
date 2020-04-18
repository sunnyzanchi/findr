import { h } from 'preact'
import styled from 'astroturf'

import {
  FullButton,
  Header,
  Subtitle as SubtitleBase,
  Title as TitleBase,
} from '../../components'
import TeamHeader from './TeamHeader'

const Avatar = styled.img`
  border-radius: 50%;
  height: 41px;
  flex-shrink: 0;
  margin-right: 9px;
  width: 41px;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 22px 32px;
`

const ListItem = styled.li`
  align-items: center;
  color: #333;
  display: flex;
  margin-bottom: 17px;
`

const Subtitle = styled(SubtitleBase)`
  margin-bottom: 22px;
`

const TeamContainer = styled.div`
  width: 100%;
`

const TeamList = styled.ul`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 42px;
  text-overflow: ellipsis;

  &.small {
    display: grid;
    grid-template-columns: 50% 50%;
    font-size: 13px;

    ${Avatar} {
      height: 32px;
      width: 32px;
    }
  }
`

const Text = styled.p`
  overflow: hidden;
  margin-right: 10px;
  white-space: nowrap;
`

const Title = styled(TitleBase)`
  margin-bottom: 4px;
`

const Lobby = ({ onStart, showStart, subtitle, teams, title }) => {
  return (
    <div>
      <Header />
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        {teams.map(team => (
          <TeamContainer key={team.name}>
            <TeamHeader color={team.color} name={team.name} />

            <TeamList small={team.players.length > 4}>
              {team.players.map(p => (
                <ListItem key={p.name}>
                  <Avatar src={p.img} />
                  <Text>@{p.name}</Text>
                </ListItem>
              ))}
            </TeamList>
          </TeamContainer>
        ))}

        {showStart && <FullButton onClick={onStart}>Start Game</FullButton>}
      </Container>
    </div>
  )
}

export default Lobby
