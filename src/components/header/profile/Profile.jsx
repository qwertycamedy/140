import { useDispatch, useSelector } from 'react-redux';
import cl from './Profile.module.scss';
import { authSel, logout } from 'store/slices/auth/authSlice';
import profileIco from 'assets/img/profile-ico.svg';
import { clsx } from 'clsx';
import { headerSel, setProfileModal } from 'store/slices/header/headerSlice';
import { enableScroll } from 'hooks/enableScroll';
import { disableScroll } from 'hooks/disableScroll';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSel);
  const { profileModal } = useSelector(headerSel);
  const navigate = useNavigate();

  const haveImg = user.img ? user.img : profileIco;

  const onModal = () => {
    if (!profileModal) {
      disableScroll();
      dispatch(setProfileModal(true));
    } else {
      enableScroll();
      dispatch(setProfileModal(false));
    }
  };

  const onLogout = () => {
    dispatch(logout()).then(() => {
      try {
        enableScroll();
        dispatch(setProfileModal(false));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className={cl.outer}>
      <button className={cl.btn}>
        <img
          className={cl.btn_ico}
          src={haveImg}
          alt={'profile img'}
          width={45}
          height={45}
          onClick={onModal}
        />
      </button>
      <div
        className={clsx(`${cl.overlay} overlay modal__overlay`, {
          active: profileModal,
        })}
        onClick={onModal}
      ></div>
      <div
        className={clsx(`${cl.modal}`, { [cl.modal__active]: profileModal })}
      >
        <div className={cl.info}>
          <h5 className={cl.name + ' title'}>{user.name}</h5>
          <p className={cl.num}>{user.email}</p>
        </div>
        <button className={cl.exit} onClick={onLogout}>
          <svg
            className={cl.exit__ico + ' ico-24 stroke'}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={cl.exit__text}>Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
