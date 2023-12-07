import { useSelector } from 'react-redux';
import { coursesSel, setSelectedGoal } from 'store/slices/courses/coursesSlice';
import MyRadio from 'components/_ui/radio/MyRadio';
import Group from 'components/_ui/group/Group';

const Goals = () => {
  const { goals, selectedGoal } = useSelector(coursesSel);

  return (
    <Group title={'Цель:'}>
      <MyRadio
        name={'goals'}
        options={goals}
        selected={selectedGoal}
        setSelected={setSelectedGoal}
      />
    </Group>
  );
};

export default Goals;
