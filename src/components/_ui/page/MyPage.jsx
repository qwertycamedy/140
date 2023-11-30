import { Helmet } from 'react-helmet';

const MyPage = ({
  children,
  metaTitle = 'MMO',
  metaDescr = 'MMO',
  hiddenTitle,
  classNames,
}) => {
  return (
    <main className={`${classNames} main`}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescr} />
      </Helmet>
      {hiddenTitle && <h1 className="title-hidden">{hiddenTitle}</h1>}
      {children}
    </main>
  );
};

export default MyPage;
