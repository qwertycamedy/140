import MyBtn from 'components/_ui/btn/MyBtn';
import cl from './GoBack.module.scss'
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate();
  return (
    <MyBtn classNames={`${cl.btn} btn-g btn-ico`} onClick={() => navigate(-1)}>
      <svg
        className="ico-24 fill"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.305 11.625L7.26 14.58C7.37053 14.683 7.45918 14.8072 7.52067 14.9452C7.58216 15.0832 7.61522 15.2322 7.61789 15.3832C7.62055 15.5343 7.59277 15.6843 7.53618 15.8244C7.4796 15.9645 7.39539 16.0917 7.28856 16.1986C7.18173 16.3054 7.05448 16.3896 6.9144 16.4462C6.77431 16.5028 6.62427 16.5306 6.47322 16.5279C6.32216 16.5252 6.17319 16.4922 6.03519 16.4307C5.89719 16.3692 5.77299 16.2805 5.67 16.17L0.795 11.295L0 10.5L0.795 9.70501L5.67 4.83001C5.88326 4.63129 6.16533 4.52311 6.45678 4.52825C6.74824 4.53339 7.02631 4.65146 7.23243 4.85758C7.43855 5.0637 7.55662 5.34178 7.56176 5.63323C7.5669 5.92468 7.45872 6.20675 7.26 6.42001L4.305 9.37501H19.125C20.4179 9.37501 21.6579 9.88863 22.5721 10.8029C23.4864 11.7171 24 12.9571 24 14.25C24 15.5429 23.4864 16.7829 22.5721 17.6972C21.6579 18.6114 20.4179 19.125 19.125 19.125H16.125C15.8266 19.125 15.5405 19.0065 15.3295 18.7955C15.1185 18.5845 15 18.2984 15 18C15 17.7016 15.1185 17.4155 15.3295 17.2045C15.5405 16.9935 15.8266 16.875 16.125 16.875H19.125C19.8212 16.875 20.4889 16.5985 20.9812 16.1062C21.4734 15.6139 21.75 14.9462 21.75 14.25C21.75 13.5538 21.4734 12.8861 20.9812 12.3939C20.4889 11.9016 19.8212 11.625 19.125 11.625H4.305Z"
          fill="currentColor"
        />
      </svg>
    </MyBtn>
  );
};

export default GoBack;