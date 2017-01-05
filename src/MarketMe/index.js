import {marketMeInterests} from '../data/interests';
import Inferno from 'inferno';
import styles from './MarketMe.css';

export default () => {
  return <div className={styles.cards}>
    {marketMeInterests.map(marketMeInterest => {
      return <div className={styles.card}>
        <h2>{marketMeInterest.title}</h2>
        <p>
          {marketMeInterest.desc}
        </p>
      </div>
    })}
  </div>
};