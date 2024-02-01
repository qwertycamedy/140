import Actions from './actions/Actions';
import Questions from './questions/Questions';
import cl from './Bot.module.scss';

const Bot = () => {
  return (
    <div className={`${cl.bot}`}>
      <div className={`${cl.container} container`}>
        <div className={cl.inner + ' flex flex-col gap-14'}>
          <Questions />
          <Actions />
        </div>
      </div>
    </div>
  );
};

export default Bot;
