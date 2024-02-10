import MyPage from 'components/_ui/page/MyPage';
import AdminCourses from 'components/courses/AdminCourses';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import {
  coursesSel,
  setCurrentAdminCourse,
} from 'store/slices/courses/coursesSlice';

const AdminPage = () => {
  const { user } = useSelector(authSel);
  const { adminCourses, currentAdminCourse } = useSelector(coursesSel);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Админка'}`}
        metaDescr={`140 | ${user ? user.name : 'Админка'}`}
      >
        <AdminCourses
          userSlug={user?.slug}
          courses={adminCourses}
          currentAdminCourse={currentAdminCourse}
          setCurrentAdminCourse={setCurrentAdminCourse}
        />
      </MyPage>
      <Footer />
    </>
  );
};

export default AdminPage;
