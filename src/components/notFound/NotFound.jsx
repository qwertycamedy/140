import { Link } from 'react-router-dom';
import './NotFound.scss';
import { authSel } from 'store/slices/auth/authSlice';
import { useSelector } from 'react-redux';

const NotFound = ({
  children,
  classNames,
  containerCl,
  innerCl,
  img,
  imgCl,
  title,
  titleCl,
  subtitle,
  subtitleCl,
  goBackNeed = false,
  ...props
}) => {
  const { isAdmin, user } = useSelector(authSel);

  return (
    <section className={`${classNames} notFound`} {...props}>
      <div className={containerCl + ' container notFound__container'}>
        <div className={`notFound__inner ${innerCl}`}>
          {img && (
            <img className={`notFound__img ${imgCl}`} src={img} alt={title} />
          )}
          {title && <h3 className={`notFound__title ${titleCl}`}>{title}</h3>}
          {subtitle && (
            <p className={`notFound__subtitle ${subtitleCl}`}>{subtitle}</p>
          )}
          {children}
          {goBackNeed && (
            <Link
              className="notFound__btn btn btn-bg"
              to={isAdmin ? `/admin/${user.slug}` : '/'}
            >
              Вернуться на главную
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
