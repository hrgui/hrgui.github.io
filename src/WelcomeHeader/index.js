import Inferno from 'inferno';
import styles from './WelcomeHeader.css';

export default () => {
  return <div className={styles.cover}>
    <div className={styles.welcomeHeader}>
      
    </div>
    <div className={styles.container}>
        <div className={styles.welcome}>
          Hello there!
        </div>
        <div className={styles.tagLine}>
          I love making cool and awesome web and mobile apps.
        </div>
      </div>
  </div>
};