import MyPage from 'components/_ui/page/MyPage';
import UserCourses from 'components/courses/UserCourses';
import Similar from 'components/courses/similar/Similar';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import {
  coursesSel,
  getRandomCourses,
  getUserCourses,
  setCurrentUserCourse,
} from 'store/slices/courses/coursesSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSel);
  const { userCourses, userCoursesLoadStatus, randomCourses, randomCoursesLoadStatus, currentUserCourse } = useSelector(coursesSel);

  useEffect(() => {
    dispatch(getUserCourses());
    dispatch(getRandomCourses());
  }, []);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Личный кабинет'}`}
        metaDescr={`140 | ${user ? user.name : 'Личный кабинет'}`}
      >
        <UserCourses
          userSlug={user?.ID}
          courses={userCourses}
          coursesLoadStatus={userCoursesLoadStatus}
          currentUserCourse={currentUserCourse}
          setCurrentUserCourse={setCurrentUserCourse}
        />
        <Similar courses={randomCourses} coursesLoadStatus={randomCoursesLoadStatus} />
      </MyPage>
      <Footer />
    </>
  );
};

export default ProfilePage;
