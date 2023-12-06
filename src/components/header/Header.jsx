import cl from './Header.module.scss';
import Logo from 'components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { headerSel, setBurger } from 'store/slices/header/headerSlice';
import { clsx } from 'clsx';
import MyModalBot from 'components/_ui/modals/modalBot/MyModalBot';
import Burger from './burger/Burger';
import { disableScroll } from 'hooks/disableScroll';
import { enableScroll } from 'hooks/enableScroll';

const Header = ({ headerCl, containerCl, innerCl }) => {
  const dispatch = useDispatch();
  const { burger } = useSelector(headerSel);

  const closeBurger = () => {
    dispatch(setBurger(false));
    enableScroll();
  };

  const openBurger = () => {
    dispatch(setBurger(true));
    disableScroll();
  };

  return (
    <>
      <header className={`${cl.header} ${headerCl} fixed-block`}>
        <div className={`${containerCl} container`}>
          <div className={`${innerCl} ${cl.inner}`}>
            <Logo classNames={cl.logo} />
            <button
              className={clsx(cl.burger, { [cl.burger__active]: burger })}
              onClick={openBurger}
            ></button>
          </div>
        </div>
      </header>
      <Burger isOpen={burger} close={closeBurger} />
    </>
  );
};

export default Header;
