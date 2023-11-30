import { Link } from 'react-router-dom';
import cl from './Powered.module.scss';

const Powered = ({ classNames, linkCl }) => {
  return (
    <p className={cl.powered + ` ${classNames}`}>
      powered by{' '}
      <Link className={cl.link + ` ${linkCl} link link-ul fw-700`} to="https://qwertycamedy.ru/" target='_blank'>
        QC
      </Link>
    </p>
  );
};

export default Powered;
