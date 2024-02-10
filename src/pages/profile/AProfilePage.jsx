import MyPage from 'components/_ui/page/MyPage';
import MyCourses from 'components/courses/MyCourses';
import Similar from 'components/courses/similar/Similar';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import {
  coursesSel,
  setCurrentMyCourse,
} from 'store/slices/courses/coursesSlice';

const AProfilePage = () => {
  const { user } = useSelector(authSel);
  const { courses, myCourses, currentMyCourse } = useSelector(coursesSel);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Админка'}`}
        metaDescr={`140 | ${user ? user.name : 'Админка'}`}
      >
        Привет из админки
      </MyPage>
      <Footer />
    </>
  );
};

export default AProfilePage;
