import Group from 'components/_ui/group/Group';
import MyModalBot from 'components/_ui/modals/modalBot/MyModalBot';
import MyRadio from 'components/_ui/radio/MyRadio';
import { Link } from 'react-router-dom';
import cl from './Burger.module.scss';
import { useSelector } from 'react-redux';
import { langsSel, setSelectedLang } from 'store/slices/lang/langSlice';

const Burger = ({ isOpen, close }) => {
  const { langs, selectedLang } = useSelector(langsSel);

  return (
    <MyModalBot modalIsOpen={isOpen} closeModal={close}>
      <Group title={'Язык:'}>
        <MyRadio
          name={'langs'}
          options={langs}
          selected={selectedLang}
          setSelected={setSelectedLang}
        />
      </Group>
      <Link className={`${cl.courses} btn btn-sb btn-g w-full`} to={'/courses'} onClick={close}>
        Наши курсы
        <svg
          className="ico-24 stroke"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="iconoir:arrow-tr">
            <path
              id="Vector"
              d="M6 19L19 6M19 6V18.48M19 6H6.52"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </Link>
      <Link className={`${cl.auth} btn btn-bg w-full`} to={'/auth/in'} onClick={close}>Войти</Link>
    </MyModalBot>
  );
};

export default Burger;
