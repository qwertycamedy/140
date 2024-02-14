import cl from './MyBotBar.module.scss';

const MyBotBar = ({ children, barCl, containerCl, innerCl }) => {
  return (
    <div className={cl.bar + ` ${barCl}`}>
      <div className={`container ${containerCl}`}>
        <div className={`${cl.btns__inner} ${innerCl} flex justify-between gap-10`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyBotBar;
