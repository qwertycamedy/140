import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hero from './hero/Hero';
import Benefits from './benefits/Benefits';
import Requirements from './requiremets/Requirements';

const CoursePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <Header goBack={true} />
      <MyPage metaTitle="140 | Страница курса" metaDescr="140 | Страница курса">
        <Hero />
        <Benefits />
        <Requirements />
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursePage;
