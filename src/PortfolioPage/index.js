import Inferno from 'inferno';
import projects from '../data/work/projects';
import websites from '../data/work/websites';
import styles from './PortfolioPage.css';
import clients from '../data/clients';
import Slider from '../Slider';
import Component from 'inferno-component';

let SectionTitle = ({children}) => {
  return <div className={styles.sectionTitle}>{children}</div>
};

export default class PortfolioPage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let slug = this.props.params.slug;
    let model = projects[slug] || websites[slug];
    let client = clients[model.cid];
    let headerRight = null;
    let slider = null;
    
    switch(model.type) {
      case 'website':
        if (model.websites) {
          headerRight = model.websites.map(website => {
            return <a href={website} className={styles.headerWebsiteLink}>Visit {website}</a>
          });  
        }
      break;
      case 'academic':
        headerRight = <img src={model.images.thumbnail} />;
      break;
    }
    let settings = {
      className: styles.slider,
      dots: true,
      infinite: true,
      speed: 500
    };
    
    if (model.images.img) {
      slider = <Slider {...settings}>
        {model.images.img.map(img => {
          return <div><a href={img.src} target="__blank"><img src={img.thumbnail} /></a></div>;
        })}
      </Slider>;  
    }
    
    return <div className={styles.container}>
    {slider}
    <div className={styles.portfolioPage}>
      <div className={styles.headerSection}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>
            {model.title}
          </h1>
          <h2 className={styles.location}>
              {model.location}
          </h2>
          <h3 className={styles.datetime}>
              {model.datetime}
              {model.class && <span> - {model.class}</span>}
          </h3>
          
          {model.projectUrl && <h2 className={styles.projectUrl}>
            <a href={model.projectUrl}>Visit Github URL</a>
          </h2>}
        </div>
        {headerRight && <div className={styles.headerRight}>
          {headerRight}
        </div>}
      </div>
      {model.actions && <div className={styles.actionsSection}>
        <SectionTitle>What I did</SectionTitle>
        <div className={styles.actions}>
          <ul>
            {model.actions && model.actions.map(action => {
              if (typeof action === 'string') {
                return <li>{action}</li>;
              }
              
              return (<li>
                  <div className={styles.actionProject}>
                    {action.project}
                  </div>
                  <p className={styles.actionDescription}>
                    {action.description}
                  </p>
                  <ul>
                    {action.actions.map(action => <li>{action}</li>)}
                  </ul>
                </li>
              );
              
              
            })}
          </ul>
        </div>
      </div>}
      {model.technicals && <div className={styles.techSkillsSection}>
        <SectionTitle>Technical Skills Employed</SectionTitle>
        <div className={styles.technicals}>
          <ul>
            {model.technicals && model.technicals.map(t => <li>{t}</li>)}
          </ul>
        </div>
      </div>}
      {client && <div className={styles.section}>
        <SectionTitle>About {client.name}</SectionTitle>
        <p className={styles.clientAbout}>
          {client.about}
        </p>
      </div>}
      {model.projectUrl && <iframe className={styles.projectFrame} src={model.projectUrl}></iframe>}
   </div>
   </div>;
  }
}