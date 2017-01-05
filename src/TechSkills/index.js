import styles from './TechSkills.css';
import Inferno from 'inferno';
import Icon from '../Icon';
import {otherSkills} from '../data/skills';

export default () => {
  let otherSkillEls = Object.keys(otherSkills).map((key) => {
    let items = otherSkills[key];
    
    return <div className={styles.otherSkillsCategory}>
      <h3>{key}</h3>
      <ul>
        {items.map(item => <li>{item}</li>)}
      </ul>
    </div>
  });
  
  
  return <div>
  <div className={styles.topSkills}>
    <div className={styles.topSkillsContainer}>
      <div className={styles.circles}>
        <div className={styles.htmlCircle}> <Icon icon="html5" /></div>
        <div className={styles.cssCircle}><Icon icon="css3" /></div>
        <div className={styles.jsCircle}>JS</div>
      </div>
      <div className={styles.topSkillsTagline}>
        <div>
          <h1>I am passionate about frontend technologies because I love making beautiful and functional web applications.</h1>
          <h3>HTML5? <Icon icon="check" /> CSS3? <Icon icon="check" /> JavaScript? <Icon icon="check" /> Responsiveness? <Icon icon="check" /> Other skills? <Icon icon="check" /></h3>
        </div>
      </div>
      </div>
    </div>
    <div className={styles.otherSkills}>
      <div className={styles.container}>
        {otherSkillEls}
      </div>
    </div>  
  </div>  
};