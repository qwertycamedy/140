import MyPage from 'components/_ui/page/MyPage';
import UserCourses from 'components/courses/UserCourses';
import Similar from 'components/courses/similar/Similar';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import {
  coursesSel,
  setCurrentUserCourse,
} from 'store/slices/courses/coursesSlice';

const ProfilePage = () => {
  const { user } = useSelector(authSel);
  const { courses, userCourses, currentUserCourse } = useSelector(coursesSel);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Личный кабинет'}`}
        metaDescr={`140 | ${user ? user.name : 'Личный кабинет'}`}
      >
        <UserCourses
          userSlug={user?.slug}
          courses={userCourses}
          currentUserCourse={currentUserCourse}
          setCurrentUserCourse={setCurrentUserCourse}
        />
        <Similar courses={courses} />
      </MyPage>
      <Footer />
    </>
  );
};

export default ProfilePage;
