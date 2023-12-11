import MyBtn from 'components/_ui/btn/MyBtn';
import MyInput from 'components/_ui/input/MyInput';
import cl from './Filters.module.scss';
import Modal from './modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  coursesSel,
  setFiltersModal,
  setSearchValue,
} from 'store/slices/courses/coursesSlice';
import { disableScroll } from 'hooks/disableScroll';
import { enableScroll } from 'hooks/enableScroll';
import Search from 'components/search/Search';

const Filters = () => {
  const dispatch = useDispatch();
  const { searchValue, filtersModal, courses } = useSelector(coursesSel);

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
        <Search searchValue={searchValue} setSearchValue={setSearchValue} placeholder={'Что ищете?'} />
        <MyBtn classNames={cl.btn + ' btn btn-bg fz-12'} onClick={openFilters}>
          Фильтры
        </MyBtn>
      </div>
      <Modal modalIsOpen={filtersModal} closeModal={closeFilters} courses={courses} />
    </>
  );
};

export default Filters;
