import { h } from 'preact'
import styled, { css } from 'astroturf'

import { LeftArrow, Menu } from '../Icons'

const PADDING = 12

const Wrapper = styled.div`
  align-items: center;
  background: #ff9839;
  color: #fff;
  display: flex;
  height: 72px;
  justify-content: center;
  margin: 0;
  padding: ${PADDING}px;
  text-align: center;
`

const H1 = styled.h1`
  font-size: 36px;
  text-align: center;
  user-select: none;
`

const styles = css`
  .icon {
    border-radius: 50%;
    cursor: pointer;
    fill: white;
    position: absolute;
    left: ${PADDING}px;
    transition: 160ms background;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`

const noop = () => {}

const Header = ({
  onArrow = noop,
  onMenu = noop,
  showArrow = false,
  showMenu = false,
}) => (
  <Wrapper>
    {showArrow && (
      <LeftArrow
        className={styles.icon}
        height={32}
        onClick={onArrow}
        width={32}
      />
    )}
    {showMenu && (
      <Menu className={styles.icon} height={32} onClick={onMenu} width={32} />
    )}
    <H1>Findr</H1>
  </Wrapper>
)

export default Header
