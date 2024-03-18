import { useDispatch, useSelector } from 'react-redux';
import cl from './Categories.module.scss';
import {
  coursesSel,
  filterCourses,
  setCurCategory,
} from 'store/slices/courses/coursesSlice';
import { clsx } from 'clsx';
import MyGroup from 'components/_ui/group/MyGroup';
import MyBtn from 'components/_ui/btn/MyBtn';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, curCategory, searchValue } = useSelector(coursesSel);

  const onCategory = (category) => {
    dispatch(setCurCategory(category));
    dispatch(filterCourses({ category: category.value, searchValue }));
  };

  return (
    <MyGroup title={'Направление:'} groupCl={cl.categories}>
      {categories?.map((category) => (
        <MyBtn
          classNames={clsx('fz-12', {
            'btn-g': curCategory?.id !== category.id,
            'btn-bg': curCategory?.id === category.id,
          })}
          key={category.id}
          onClick={() => onCategory(category)}
        >
          {category.label}
        </MyBtn>
      ))}
    </MyGroup>
  );
};

export default Categories;
