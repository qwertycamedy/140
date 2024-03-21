import Passing from './passing/Passing';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTest,
  setCorrectAnswersCount,
  setCurQuestion,
  setIsComplete,
  testSel,
} from 'store/slices/test/testSlice';
import Results from './results/Results';
import { useEffect } from 'react';

const Test = ({ course, lesson, userSlug }) => {
  const dispatch = useDispatch();
  const { isComplete } = useSelector(testSel);

  useEffect(() => {
    if (course?.ID && lesson?.ID) {
      dispatch(getTest({ courseId: course.ID, lessonId: lesson.ID })).then(
        (action) => {
          try {
            dispatch(setCurQuestion(action.payload.data[0]));
          } catch (err) {
            console.log('get test error: ', err);
          }
        },
      );

      dispatch(setIsComplete(false));
      dispatch(setCorrectAnswersCount(0));
    }
  }, [course, lesson]);

  return !isComplete ? (
    <Passing course={course} lesson={lesson} />
  ) : (
    <Results userSlug={userSlug} />
  );
};

export default Test;
