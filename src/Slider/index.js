import Inferno from 'inferno';
import Component from 'inferno-component';
import styles from './Slider.css';
import Icon from '../Icon';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {currentSlide: 0};
  }

  onChangeSlide(index) {
    if (index < 0) {
      index = this.props.children.length - 1;
    }

    if (index >= this.props.children.length) {
      index = 0;
    }

    this.setState({currentSlide: index});
  }

  componentDidMount() {
    // if (this.props.speed) {
    //   setInterval(() => {
    //     this.onChangeSlide(this.state.currentSlide + 1);
    //   }, this.props.speed);
    // }
    
  }
  
  render() {

    /*
    className: styles.slider,
      dots: true,
      infinite: true,
      speed: 500
    */

    let slides = this.props.children;

    let pager = (<div className={styles.sliderPager}>
      <a onClick={this.onChangeSlide.bind(this, this.state.currentSlide - 1)}><Icon icon="angle-left" /></a>
      {slides.map((slide, i) => (<a onClick={this.onChangeSlide.bind(this,i)} className={this.state.currentSlide === i && styles.sliderLinkActive}>{i+1}</a>))}
      <a onClick={this.onChangeSlide.bind(this, this.state.currentSlide + 1)}><Icon icon="angle-right" /></a>
    </div>)

    return <div {...this.props}>
      {slides[this.state.currentSlide]}
      {pager}
    </div>
  }
}