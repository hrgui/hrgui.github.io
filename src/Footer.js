import Inferno from 'inferno';
import styles from './Footer.css';
import Icon from './Icon';

function getCurrentYear() {
  let date = new Date();
  return date.getFullYear();
}

export default () => {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <Icon icon='copyright' /> {getCurrentYear()} hrgui
    </div>
  </footer>
};