import Inferno from 'inferno';

const ScrollLink = require('react-scroll').Link;

import styles from './NavBar.css';
import Logo from '../logo/Logo';
import {Link} from 'inferno-router';
import sections from '../data/sections';
import cx from 'classnames';
import Component from 'inferno-component';

let NavBarLinks = (props) => {
  return <nav className={cx(styles.navbarLinks, props.isMobileHidden && styles.navbarLinksHidden)} {...props}>{props.children}</nav>;
};

let NavBarLink = (props) => {
  return <ScrollLink {...props}
                    activeClass={styles.active}
                    smooth={true}
                    spy={true}
                    offset={-70}
                    className={styles.navbarLink}>
            {props.children}
         </ScrollLink>
};

let NavBarToggle = ({onClick}) => {
  return <div className={styles.navbarToggle} onClick={onClick}>
    <div className={styles.iconBar}></div>
    <div className={styles.iconBar}></div>
    <div className={styles.iconBar}></div>
  </div>;
};


export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {linksShown: true};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({linksShown: !this.state.linksShown});
  }

  render() {
    const navbarLinks = Object.keys(sections).map(sectionKey => {
      let section = sections[sectionKey];
      return <NavBarLink to={section.route} key={sectionKey}>{section.title}</NavBarLink>;
    });

    return (<div className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/"><Logo className={styles.logo} /></Link>
        <NavBarToggle onClick={this.toggle} />
        <NavBarLinks isMobileHidden={this.state.linksShown}>
          {navbarLinks}
        </NavBarLinks>
      </div>
    </div>)
  }
}
