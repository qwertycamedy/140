import cl from './Header.module.scss';
import Logo from 'components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { headerSel, setBurger } from 'store/slices/header/headerSlice';
import { clsx } from 'clsx';
import useWindowWidth from 'hooks/windowWidth';
import MyBtn from 'components/_ui/btn/MyBtn';

const Header = ({ headerCl, containerCl, innerCl }) => {
  const dispatch = useDispatch();
  const { burger } = useSelector(headerSel);

  const closeBurger = () => {
    dispatch(setBurger(false));
  };

  const onBurger = () => {
    dispatch(setBurger(!burger));
  };

  return (
    <header className={`${cl.header} ${headerCl} fixed-block`}>
      <div className={`${containerCl} container`}>
        <div className={`${innerCl} ${cl.inner}`}>
          <Logo classNames={cl.logo} onClick={closeBurger} />
          <button
            className={clsx(cl.burger, { [cl.burger__active]: burger })}
            onClick={onBurger}
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
