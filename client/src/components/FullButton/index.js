import { styled } from 'astroturf'

const FullButton = styled.button`
  align-items: center;
  background: #1ac8ff;
  border: 0;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-weight: 700;
  height: 60px;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: 160ms background-color;
  width: 80%;

  &:disabled {
    background: #999;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: #27c0f0;
  }
`

export default FullButton
