import { useDispatch, useSelector } from 'react-redux';
import cl from './Guides.module.scss';
import {
  coursesSel,
  setSelectedGuide,
} from 'store/slices/courses/coursesSlice';
import { clsx } from 'clsx';
import MyGroup from 'components/_ui/group/MyGroup';
import MyBtn from 'components/_ui/btn/MyBtn';

const Guides = () => {
  const dispatch = useDispatch();
  const { guides, selectedGuide } = useSelector(coursesSel);

  const onGuide = (guide) => {
    dispatch(setSelectedGuide(guide));
  };

  return (
    <MyGroup title={'Направление:'} groupCl={cl.guides}>
      {guides?.map((guide) => (
        <MyBtn
          classNames={clsx('fz-12', {
            'btn-g': selectedGuide.id !== guide.id,
            'btn-bg': selectedGuide.id === guide.id,
          })}
          key={guide.id}
          onClick={() => onGuide(guide)}
        >
          {guide.label}
        </MyBtn>
      ))}
    </MyGroup>
  );
};

export default Guides;
