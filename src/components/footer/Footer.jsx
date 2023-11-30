import Powered from 'components/powered/Powered';
import  cl from './Footer.module.scss';
import Logo from 'components/logo/Logo';

const Footer = () => {

  return (
    <footer className={cl.footer + " footer"}>
      <div className="container">
        <div className={cl.inner}>
          <Logo classNames={cl.logo} />
          <Powered />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
