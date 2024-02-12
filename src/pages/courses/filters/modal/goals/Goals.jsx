import { useSelector } from 'react-redux';
import { coursesSel, setSelectedGoal } from 'store/slices/courses/coursesSlice';
import MyRadio from 'components/_ui/radio/MyRadio';
import MyGroup from 'components/_ui/group/MyGroup';

const Goals = () => {
  const { goals, selectedGoal } = useSelector(coursesSel);

  return (
    <MyGroup title={'Цель:'}>
      <MyRadio
        name={'goals'}
        options={goals}
        selected={selectedGoal}
        setSelected={setSelectedGoal}
      />
    </MyGroup>
  );
};

export default Goals;
