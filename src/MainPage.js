import Inferno from 'inferno';
import WelcomeHeader from './WelcomeHeader';
import MarketMe from './MarketMe';
import TechSkills from './TechSkills';
import Academics from './Academics';
import Thumbnails from './Thumbnails';
import projects from './data/work/projects';
import websites from './data/work/websites';
import {Element, Events} from 'react-scroll';
import Component from 'inferno-component';

export default class MainPage extends Component {
  componentDidMount() {

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

  }
  
  render() {
    return <div>
      <Element name="welcome">
        <WelcomeHeader />
      </Element>
      <Element name="interests">
        <MarketMe />
      </Element>
      <Element name="technical-skills">
        <TechSkills />
      </Element>
      <Element name="academics">
        <Academics />
      </Element>
      <Element name="portfolio">
        <Thumbnails title="Academic and Github Projects" items={projects} />
        <Thumbnails title="Portfolio" items={websites}  />
      </Element>
    </div>
  }
}
