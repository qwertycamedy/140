import cl from './Search.module.scss';
import { clsx } from 'clsx';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import Loader from 'components/loader/Loader';
import { loadStatus } from 'store/loadStatus';

const Search = ({
  searchValue,
  setSearchValue,
  onDebFilter,
  curCategory,
  filtersLoadStatus,
  placeholder,
}) => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    onDebFilter({
      category: curCategory ? curCategory.value : '',
      searchValue: e.target.value,
    });
  };

  const onClear = () => {
    dispatch(setSearchValue(''));
  };

  return (
    <div className={cl.search}>
      <div className={`input-outer`}>
        <label className={`input-label`}>
          <input
            type={'text'}
            className={`input radius-mobile`}
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onChange(e)}
          />
          <span className={' input-placeholder'}>{placeholder}</span>
        </label>
      </div>
      <Loader
        outerCl={clsx(cl.loader_outer, {
          [cl.loader_outer_active]: filtersLoadStatus === loadStatus.pending,
        })}
        loaderCl={cl.loader}
      />
      <button
        className={clsx(cl.clear, {
          [cl.clear__active]: searchValue.length > 0,
        })}
        onClick={onClear}
      >
        <svg
          className="ico-24 fill"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_166_210)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 13.414L17.6571 19.071C17.8457 19.2532 18.0983 19.354 18.3605 19.3517C18.6227 19.3494 18.8735 19.2443 19.0589 19.0588C19.2443 18.8734 19.3495 18.6226 19.3517 18.3604C19.354 18.0982 19.2532 17.8456 19.0711 17.657L13.4141 12L19.0711 6.34303C19.2532 6.15443 19.354 5.90182 19.3517 5.63963C19.3495 5.37743 19.2443 5.12662 19.0589 4.94121C18.8735 4.7558 18.6227 4.65063 18.3605 4.64835C18.0983 4.64607 17.8457 4.74687 17.6571 4.92903L12.0001 10.586L6.34307 4.92903C6.15362 4.75137 5.90248 4.65439 5.6428 4.65861C5.38311 4.66283 5.13526 4.76791 4.95168 4.95162C4.76809 5.13533 4.66319 5.38326 4.65915 5.64295C4.65512 5.90263 4.75228 6.1537 4.93007 6.34303L10.5861 12L4.92907 17.657C4.83356 17.7493 4.75738 17.8596 4.70497 17.9816C4.65256 18.1036 4.62497 18.2348 4.62382 18.3676C4.62266 18.5004 4.64796 18.6321 4.69825 18.755C4.74853 18.8779 4.82278 18.9895 4.91667 19.0834C5.01057 19.1773 5.12222 19.2516 5.24511 19.3018C5.36801 19.3521 5.49969 19.3774 5.63247 19.3763C5.76525 19.3751 5.89647 19.3475 6.01847 19.2951C6.14048 19.2427 6.25082 19.1665 6.34307 19.071L12.0001 13.414Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_166_210">
              <rect width="24" height="24" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default Search;
