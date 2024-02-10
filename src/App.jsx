import AdminPage from 'pages/admin/AdminPage';
import AuthPage from 'pages/auth/AuthPage';
import CoursePage from 'pages/course/CoursePage';
import CoursesPage from 'pages/courses/CoursesPage';
import HomePage from 'pages/home/HomePage';
import LessonPage from 'pages/lesson/LessonPage';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import ProfilePage from 'pages/profile/ProfilePage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { authSel } from 'store/slices/auth/authSlice';

function App() {
  const { isAuth, isAdmin, user } = useSelector(authSel);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  console.log('now front in "front"');

  return (
    <div className="site-container">
      <Routes>
        {!isAdmin && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseName" element={<CoursePage />} />
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
            <Route path={`/profile/${user.slug}`} element={<ProfilePage />} />
            <Route
              path={`/${user.slug}/:course/:lesson`}
              element={<LessonPage />}
            />
          </>
        )}

        {isAuth && isAdmin && (
          <>
            <Route path="/" element={<Navigate to={`/admin/${user.slug}`} />} />
            <Route index path={`/admin/${user.slug}`} element={<AdminPage />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
