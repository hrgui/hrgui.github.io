import Inferno from 'inferno';
import Component from 'inferno-component';
import reset from './reset.css';
import styles from './App.css';
import Logo from './logo/Logo';
import NavBar from './navBar/NavBar';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return <div>
      <NavBar />
      <div className={styles.content}>
        {this.props.children}
        <Footer />
      </div>
    </div>
  }
}
