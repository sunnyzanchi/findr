import { h } from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'

import FullButton from '../../components/FullButton'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Title from '../../components/Title'
import styled from 'astroturf'

const BetweenText = styled.p`
  margin: 16px;
`

const ButtonContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 46px 32px;
`

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  height: 62px;
  justify-content: space-between;
`

const ListName = styled.p`
  color: #333;
  font-size: 14px;
  font-weight: 700;
`

const ListPoints = styled.p`
  color: #777;
  font-size: 14px;
`

const PointsGroup = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`

const PointsInput = styled(Input)`
  text-align: center;
  width: 70px;
`

const PointsText = styled.p`
  margin-left: 12px;
`

const TitleText = styled(Title)`
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

const getPlaceholderName = (existing = []) => {
  let items = [
    'Gargoyle',
    'A convertible',
    'Five way intersection',
    'Pharmacy',
    'Tree carving',
    'A poorly parked car',
    'A bad bumper sticker',
  ]

  items = items.filter(i => !existing.includes(i))

  return items[Math.floor(Math.random() * items.length)]
}

const getPlaceholderPoints = () => Math.floor(Math.random() * 20) * 5

const CreateList = ({ onBack, onSave }) => {
  const nameInput = useRef()
  const pointsInput = useRef()
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [points, setPoints] = useState('')

  // Placeholders
  // They're in state so they don't regenerate and update everytime we type something
  const [namePh, setNamePh] = useState(getPlaceholderName())
  const [pointsPh, setPointsPh] = useState(getPlaceholderPoints())

  // Reset state when a new item is added
  useEffect(() => {
    setName('')
    setPoints('')
    setNamePh(getPlaceholderName(list.map(i => i.name)))
    setPointsPh(getPlaceholderPoints())
  }, [list])

  const onKeyDownName = e => {
    if (e.key !== 'Enter') return

    if (name === '' && namePh != null) {
      setName(namePh)
    }

    if (name !== '') {
      pointsInput.current && pointsInput.current.focus()
    }
  }

  const onKeyDownPoints = e => {
    if (e.key !== 'Enter') return

    let currentPoints = points
    if (points === '') {
      currentPoints = pointsPh
    }

    setList(l => [{ name, points: Number(currentPoints) }].concat(l))
    nameInput.current && nameInput.current.focus()
  }

  return (
    <Wrapper>
      <Header showArrow onArrow={onBack} />
      <Container>
        <TitleText>Creating List</TitleText>
        <Input
          onInput={e => setName(e.target.value)}
          onKeyDown={onKeyDownName}
          ref={nameInput}
          placeholder={namePh}
          value={name}
        />
        <BetweenText>worth</BetweenText>

        <PointsGroup>
          <PointsInput
            onInput={e => setPoints(e.target.value)}
            onKeyDown={onKeyDownPoints}
            placeholder={pointsPh}
            ref={pointsInput}
            type="number"
            value={points}
          />
          <PointsText>points</PointsText>
        </PointsGroup>

        <ul>
          {list.map(item => (
            <ListItem key="item">
              <ListName>{item.name}</ListName>
              <ListPoints>{item.points} points</ListPoints>
            </ListItem>
          ))}
        </ul>
      </Container>

      <ButtonContainer>
        <FullButton disabled={list.length === 0} onClick={() => onSave(list)}>
          Save
        </FullButton>
      </ButtonContainer>
    </Wrapper>
  )
}

export default CreateList
