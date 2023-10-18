import Header from 'components/header/Header';

const App = () => {
  console.log(import.meta.env.VITE_SOME_KEY);

  return (
    <>
      Hello
      <Header />
    </>
  );
};

export default App;
