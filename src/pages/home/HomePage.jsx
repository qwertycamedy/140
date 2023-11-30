import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Hero from './hero/Hero';

const HomePage = () => {
  return (
    <>
      <Header />
      <MyPage metaTitle="140" metaDescr="главная 140">
        <Hero />
      </MyPage>
      <Footer />
    </>
  );
};

export default HomePage;
