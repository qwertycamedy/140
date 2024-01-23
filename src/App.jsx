import AuthPage from 'pages/auth/AuthPage';
import CoursesPage from 'pages/courses/CoursesPage';
import HomePage from 'pages/home/HomePage';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import ProfilePage from 'pages/profile/ProfilePage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { authSel } from 'store/slices/auth/authSlice';

function App() {
  const {isAuth, user} = useSelector(authSel);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="site-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {
          isAuth ? (
            <Route path={`/profile/${user.slug}`} element={<ProfilePage />} />
          ) : (
            <>
            <Route path="/auth/in" element={<AuthPage />} />
            <Route path="/auth/up" element={<AuthPage />} />
            </>
          )
        }
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
