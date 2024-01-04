import MyPage from 'components/_ui/page/MyPage';
import MySection from 'components/_ui/section/MySection';
import Similar from 'components/courses/similar/Similar';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { coursesSel } from 'store/slices/courses/coursesSlice';

const ProfilePage = () => {
  const { user } = useSelector(authSel);
  const { courses } = useSelector(coursesSel);

  return (
    <>
      <Header />
      <MyPage
        metaTitle={`140 | ${user ? user.name : 'Личный кабинет'}`}
        metaDescr={`140 | ${user ? user.name : 'Личный кабинет'}`}
      >
        <MySection>{user.name}</MySection>

        <Similar courses={courses} />
      </MyPage>
    </>
  );
};

export default ProfilePage;
