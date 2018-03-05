import { h } from 'preact';
import picostyle from 'picostyle';
import { colors } from '../theme';

const style = picostyle(h);

const Header = style('h1')({
  background: colors.primary,
  color: '#fff',
  margin: 0,
  padding: '12px',
  'text-align': 'center',
});

export default Header;
