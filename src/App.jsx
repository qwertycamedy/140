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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
