import Inferno from 'inferno';
import styles from './Logo.css';
import cx from 'classnames';

export default (props) => {
  let newProps = Object.assign({className: ''}, props);
  newProps.className = cx(newProps.className,styles.logo); 
  
  return <div {...newProps}>
    hr<span className={styles.gui}>gui</span>
  </div>
};