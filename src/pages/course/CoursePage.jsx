import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useSelector } from 'react-redux';
import Hero from './hero/Hero';
import Benefits from './benefits/Benefits';
import Requirements from './requiremets/Requirements';
import Similar from 'components/courses/similar/Similar';
import { coursesSel } from 'store/slices/courses/coursesSlice';

const CoursePage = () => {
  const {courses} = useSelector(coursesSel);

  return (
    <>
      <Header goBack={true} />
      <MyPage metaTitle="140 | Страница курса" metaDescr="140 | Страница курса">
        <Hero />
        <Benefits />
        <Requirements />
        <Similar courses={courses} />
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursePage;
