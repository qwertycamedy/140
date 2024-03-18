import cl from './Loader.module.scss';

const Loader = ({outerCl, loaderCl}) => {
  return (
    <div className={cl.outer + ` ${outerCl}`}>
      <span className={cl.loader + ` ${loaderCl}`} />
    </div>
  );
};

export default Loader;
