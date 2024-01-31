import MySection from 'components/_ui/section/MySection';
import resultsIco from 'assets/img/claps.svg';
import MyBtn from 'components/_ui/btn/MyBtn';
import outerCl from '../../LessonPage.module.scss'

const Results = () => {
  return (
    <MySection>
      <h1></h1>
      <p>
        <span></span>
      </p>
      <img src={resultsIco} alt="results ico" />
      <MyBtn classNames={`${outerCl.btn} btn-bg max-w-280 m-x-auto fz-14`}>
        Дальше-больше!
      </MyBtn>
    </MySection>
  );
};

export default Results;
