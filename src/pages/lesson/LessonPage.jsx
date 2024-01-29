import MyPage from 'components/_ui/page/MyPage';
import Header from 'components/header/Header';
import Read from './read/Read';

const LessonPage = () => {

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Личный кабинет'}`}
        metaDescr={`140 | ${user ? user.name : 'Личный кабинет'}`}
      >
        <Read />
      </MyPage>
    </>
  );
};

export default LessonPage;
