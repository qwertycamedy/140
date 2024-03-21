import AdminPage from 'pages/admin/AdminPage';
import AuthPage from 'pages/auth/AuthPage';
import CoursePage from 'pages/course/CoursePage';
import CoursesPage from 'pages/courses/CoursesPage';
import CreateCourse from 'pages/createCourse/CreateCourse';
import CreateLesson from 'pages/createLesson/CreateLesson';
import HomePage from 'pages/home/HomePage';
import LessonPage from 'pages/lesson/LessonPage';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import ProfilePage from 'pages/profile/ProfilePage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { authSel, getProfile } from 'store/slices/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuth, isAdmin, user } = useSelector(authSel);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [location]);

  useEffect(() => {
    const storedIsAuth = localStorage.getItem('is_auth');
    if (storedIsAuth) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <div className="site-container">
      <Routes>
        {!isAdmin && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePage />} />
          </>
        )}

        {!isAuth && (
          <>
            <Route path="/auth/in" element={<AuthPage />} />
            <Route path="/auth/up" element={<AuthPage />} />
            <Route path="/auth/admin" element={<AuthPage />} />
          </>
        )}

        {isAuth && !isAdmin && (
          <>
            <Route path={`/profile/${user.ID}`} element={<ProfilePage />} />
            <Route path={`/:courseId/:lessonId`} element={<LessonPage />} />
          </>
        )}

        {isAuth && isAdmin && (
          <>
            <Route path="/" element={<Navigate to={`/admin/${user.slug}`} />} />
            <Route index path={`/admin/${user.slug}`} element={<AdminPage />} />
            <Route
              index
              path={`/admin/${user.slug}/createCourse`}
              element={<CreateCourse />}
            />
            <Route
              index
              path={`/admin/${user.slug}/:courseId/createLesson`}
              element={<CreateLesson />}
            />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
