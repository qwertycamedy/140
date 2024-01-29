import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MySection from 'components/_ui/section/MySection';
import cl from './CoursesPage.module.scss';
import Filters from './filters/Filters';
import Similar from 'components/courses/similar/Similar';
import { useSelector } from 'react-redux';
import { coursesSel } from 'store/slices/courses/coursesSlice';
import Courses from 'components/courses/Courses';

const CoursesPage = () => {
  const { courses } = useSelector(coursesSel);
  return (
    <>
      <Header />
      <MyPage metaTitle="140 | Наши курсы" metaDescr="140 | Наши курсы">
        <MySection classNames={cl.section}>
          <h1 className={`${cl.title} title title-page`}>Все курсы</h1>
          <Filters />
          <Courses courses={courses} />
        </MySection>
        <Similar title={'Популярные курсы:'} courses={courses} />
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursesPage;
