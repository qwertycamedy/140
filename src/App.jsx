import AuthPage from 'pages/auth/AuthPage';
import CoursePage from 'pages/course/CoursePage';
import CoursesPage from 'pages/courses/CoursesPage';
import HomePage from 'pages/home/HomePage';
import LessonPage from 'pages/lesson/LessonPage';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import ProfilePage from 'pages/profile/ProfilePage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { authSel } from 'store/slices/auth/authSlice';

function App() {
  const { isAuth, user } = useSelector(authSel);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  console.log('now front in "front"')

  return (
    <div className="site-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseName" element={<CoursePage />} />
        {isAuth ? (
          <>
            <Route path={`/profile/${user.slug}`} element={<ProfilePage />} />
            <Route path={`/${user.slug}/:course/:lesson`} element={<LessonPage />} />
          </>
        ) : (
          <>
            <Route path="/auth/in" element={<AuthPage />} />
            <Route path="/auth/up" element={<AuthPage />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
