import { h } from 'preact'
import styled from 'astroturf'

const Block = styled('div').attrs(({ color }) => ({
  style: `background-color:${color};`,
}))`
  height: 22px;
  margin-right: 4px;
  width: 8px;
`

const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid #ddd;
  color: #333;
  display: flex;
  font-size: 18px;
  margin-bottom: 22px;
  padding: 0 0 4px;
`

const TeamHeader = ({ color, name }) => (
  <Container>
    <Block color={color} />
    <p>{name}</p>
  </Container>
)

export default TeamHeader
