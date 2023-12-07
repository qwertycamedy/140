import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Items from './items/Items';
import MySection from 'components/_ui/section/MySection';
import cl from './CoursesPage.module.scss';
import Filters from './filters/Filters';

const CoursesPage = () => {
  return (
    <>
      <Header />
      <MyPage metaTitle="140 | Наши курсы" metaDescr="140 | Наши курсы">
        <MySection classNames={cl.section}>
          <h1 className={`${cl.title} title title-page`}>Все курсы</h1>
          <Filters />
          <Items />
        </MySection>
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursesPage;
