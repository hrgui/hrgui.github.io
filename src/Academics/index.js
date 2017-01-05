import styles from './Academics.css';
import Inferno from 'inferno';
import Icon from '../Icon';

export default () => {
  return <div className={styles.academics}>
    <div className={styles.school}>
    <div className={styles.tagLine}>
      I graduated from...
    </div>
    <div className={styles.gradInfo}>
      <h3>University of Southern California</h3>
      B.S. Computer Science and Engineering <br/>
      Magna Cum Laude <br/>
      2010-2013 <br/>
    </div>
    </div>

  </div>
};
