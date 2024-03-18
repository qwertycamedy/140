import MyBtn from 'components/_ui/btn/MyBtn';
import cl from './Filters.module.scss';
import Modal from './modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  coursesSel,
  filterCourses,
  setFiltersModal,
  setSearchValue,
} from 'store/slices/courses/coursesSlice';
import { disableScroll } from 'hooks/disableScroll';
import { enableScroll } from 'hooks/enableScroll';
import Search from 'components/search/Search';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const Filters = () => {
  const dispatch = useDispatch();
  const {
    searchValue,
    filtersLoadStatus,
    filtersModal,
    courses,
    curCategory,
  } = useSelector(coursesSel);
  
  const onDebFilter = useCallback(debounce(({category, searchValue}) => {
    dispatch(filterCourses({ category, searchValue }));
  }, 500), []);

  const openFilters = () => {
    dispatch(setFiltersModal(true));
    disableScroll();
  };

  const closeFilters = () => {
    dispatch(setFiltersModal(false));
    enableScroll();
  };

  return (
    <>
      <div className={cl.filters}>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onDebFilter={onDebFilter}
          curCategory={curCategory}
          filtersLoadStatus={filtersLoadStatus}
          placeholder={'Что ищете?'}
        />
        <MyBtn classNames={cl.btn + ' btn btn-bg fz-12'} onClick={openFilters}>
          Фильтры
        </MyBtn>
      </div>
      <Modal
        modalIsOpen={filtersModal}
        closeModal={closeFilters}
        courses={courses}
      />
    </>
  );
};

export default Filters;
