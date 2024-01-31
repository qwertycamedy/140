import MyPage from 'components/_ui/page/MyPage';
import Header from 'components/header/Header';
import Read from './read/Read';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { useParams } from 'react-router-dom';
import Download from './download/Download';
import Test from './test/Test';

const LessonPage = () => {
  const { user } = useSelector(authSel);
  const { lesson } = useParams();

  const lessonFormat = 'test';

  return (
    <>
      <Header goBack={true} />
      <MyPage
        metaTitle={`140 | Урок ${lesson}`}
        metaDescr={`140 | Урок ${lesson}`}
      >
        {lessonFormat === 'read' ? (
          <Read lesson={lesson} />
        ) : lessonFormat === 'test' ? (
          <Test lesson={lesson} />
        ) : lessonFormat === 'download' ? (
          <Download lesson={lesson} />
        ) : (
          'Урок не найден'
        )}
      </MyPage>
    </>
  );
};

export default LessonPage;
