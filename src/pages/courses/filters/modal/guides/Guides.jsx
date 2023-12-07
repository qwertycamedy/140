import { useDispatch, useSelector } from 'react-redux';
import cl from './Guides.module.scss';
import {
  coursesSel,
  setSelectedGuide,
} from 'store/slices/courses/coursesSlice';
import { clsx } from 'clsx';
import Group from 'components/_ui/group/Group';
import MyBtn from 'components/_ui/btn/MyBtn';

const Guides = () => {
  const dispatch = useDispatch();
  const { guides, selectedGuide } = useSelector(coursesSel);

  const onGuide = (guide) => {
    dispatch(setSelectedGuide(guide));
  };

  return (
    <Group title={'Направление:'} groupCl={cl.guides}>
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
    </Group>
  );
};

export default Guides;
