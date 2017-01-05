let fontAwesomeStyles = require('font-awesome/css/font-awesome.css');
let cx = require('classnames');
import Inferno from 'inferno';

export default ({icon, size}) => {
  let iconProp = `fa-${icon}`;
  let classes = [fontAwesomeStyles['fa'], fontAwesomeStyles[iconProp]];
  
  if (size) {
    classes.push(fontAwesomeStyles[`fa-` + size]);
  }
  
  return <i className={cx.apply(this, classes)}></i>;
}