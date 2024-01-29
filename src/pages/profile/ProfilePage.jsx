import MyPage from 'components/_ui/page/MyPage';
import MySection from 'components/_ui/section/MySection';
import MyCourses from 'components/courses/MyCourses';
import Similar from 'components/courses/similar/Similar';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { coursesSel, setCurrentMyCourse } from 'store/slices/courses/coursesSlice';

const ProfilePage = () => {
  const { user } = useSelector(authSel);
  const { courses, myCourses, currentMyCourse } = useSelector(coursesSel);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Личный кабинет'}`}
        metaDescr={`140 | ${user ? user.name : 'Личный кабинет'}`}
      >
        <MyCourses courses={myCourses} currentMyCourse={currentMyCourse} setCurrentMyCourse={setCurrentMyCourse} />
        <Similar courses={courses} />
      </MyPage>
      <Footer />
    </>
  );
};

export default ProfilePage;
