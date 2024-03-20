import Passing from './passing/Passing';
import { useDispatch, useSelector } from 'react-redux';
import { getTest, testSel } from 'store/slices/test/testSlice';
import Results from './results/Results';
import { useEffect } from 'react';

const Test = ({ course, lesson, userSlug }) => {
  const dispatch = useDispatch();
  const { isComplete, } = useSelector(testSel);

  useEffect(() => {
    dispatch(getTest({courseId: course.ID, lessonId: lesson.ID}))
  }, [])

  return !isComplete ? <Passing course={course} lesson={lesson} /> : <Results userSlug={userSlug} />;
};

export default Test;
