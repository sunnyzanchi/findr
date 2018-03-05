import { h } from 'preact';
import picostyle from 'picostyle';

const style = picostyle(h);

const Logo = style('div')(props => ({
  'background-image': `url(${props.src})`,
  'background-repeat': 'round',
  height: '40vw',
  width: '40vw',
}));

const Icon = style(Logo)({
  height: '64px',
  width: '64px',
});

const Page = style('div')({
  'align-items': 'center',
  display: 'flex',
  'flex-direction': 'column',
  padding: '24px',
  width: '100%',
});

const Section = style('section')({
  'align-items': 'center',
  display: 'flex',
  'flex-direction': 'column',
  'margin-top': '32px',
});

const sections = [
  {
    image: 'http://placehold.it/64/64',
    text: 'Cupidatat non deserunt duis Lorem in nostrud sint ad dolor veniam aliquip pariatur cillum veniam.',
  },
];

const PublicHome = () => (
  <Page>
    <h1>Scavenge</h1>
    <Logo src="https://placehold.it/200/200" />
    <main>
      {sections.map(section => (
        <Section>
          <Icon src={section.image} />
          <p>{section.text}</p>
        </Section>
      ))}
    </main>
  </Page>
);

export default PublicHome;
