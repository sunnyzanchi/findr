import { h } from 'preact'
import { action } from '@storybook/addon-actions'

import Lobby from '.'
import TeamHeader from './TeamHeader'

export default {
  title: 'Lobby',
  component: Lobby,
}

const teams = [
  {
    color: '#ff4c4c',
    name: 'Yung Squad',
    players: [
      { img: 'https://placehold.it/64/64', name: 'juansolo' },
      { img: 'https://placehold.it/64/64', name: 'derek414' },
      { img: 'https://placehold.it/64/64', name: 'turboswamp' },
      { img: 'https://placehold.it/64/64', name: 'crunchwrapsupreme' },
    ],
  },
  {
    color: '#4183E5',
    name: 'Best_Team_Evr 😤💪',
    players: [
      { img: 'https://placehold.it/64/64', name: 'ashleyyyyyyy' },
      { img: 'https://placehold.it/64/64', name: 'trucks' },
      { img: 'https://placehold.it/64/64', name: 'i_rob_people' },
      { img: 'https://placehold.it/64/64', name: 'swoleteamsix' },
      { img: 'https://placehold.it/64/64', name: 'bernie_can_still_win' },
      { img: 'https://placehold.it/64/64', name: 'superpro' },
    ],
  },
]

export const Default = () => (
  <Lobby
    onStart={action('Clicked start')}
    showStart
    subtitle="List of 34 items"
    teams={teams}
    title="Juan's Game"
  />
)
export const Header = () => <TeamHeader color="#ff4c4c" name="The A Team" />
