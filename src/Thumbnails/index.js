import Inferno from 'inferno';
import {Link} from 'inferno-router';
import styles from './Thumbnails.css';

export default ({title, items}) => {
  if (!(items instanceof Array)) {
    items = Object.keys(items).map(key => items[key]);
  }
  
  
  return <div className={styles.thumbnails}>
    <h2 className="emphasis">{title}</h2>
    <div className={styles.thumbnailItems}>
      {items && items.map(item => <div className={styles.item}>
        <Link to={`/portfolio/${item.slug}`}>
          <img src={item.images.thumbnail} className={styles.img} />
          <div className={styles.itemTitle}>{item.title}</div>
        </Link>
      </div>)}
    </div>
  </div>
};