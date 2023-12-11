import AuthPage from 'pages/auth/AuthPage';
import CoursesPage from 'pages/courses/CoursesPage';
import HomePage from 'pages/home/HomePage';
import NotFoundPage from 'pages/notFound/NotFoundPage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="site-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/auth/in" element={<AuthPage />} />
        <Route path="/auth/up" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
