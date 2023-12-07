import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Hero from './hero/Hero';
import Popular from './popular/Popular';

const HomePage = () => {
  return (
    <>
      <Header />
      <MyPage metaTitle="140" metaDescr="главная 140">
        <Hero />
        <Popular />
      </MyPage>
      <Footer />
    </>
  );
};

export default HomePage;
