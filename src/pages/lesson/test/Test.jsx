import Passing from './passing/Passing';
import { useSelector } from 'react-redux';
import { testSel } from 'store/slices/test/testSlice';
import Results from './results/Results';

const Test = ({ lesson }) => {
  const { isComplete } = useSelector(testSel);

  return !isComplete ? <Passing lesson={lesson} /> : <Results />;
};

export default Test;
