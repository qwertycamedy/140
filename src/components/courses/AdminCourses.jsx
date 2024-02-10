import MySection from 'components/_ui/section/MySection';
import cl from './Courses.module.scss';
import AdminCourse from './adminCourse/AdminCourse';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotFound from 'components/notFound/NotFound';
import notFoundImg from 'assets/img/botan.svg';

const AdminCourses = ({
  userSlug,
  courses,
  currentAdminCourse,
  setCurrentAdminCourse,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentAdminCourse(null));
  }, []);

  const onCourse = (item) => {
    if (currentAdminCourse?.id === item?.id) {
      dispatch(setCurrentAdminCourse(null));
    } else {
      dispatch(setCurrentAdminCourse(item));
    }
  };

  courses = [];

  return (
    <MySection>
      <div className="flex justify-between items-center w-full">
        <h1 className="title title-section">Ваши курсы</h1>
        <Link className="btn btn-bg" to={`/admin/${userSlug}/createCourse`}>
          Создать курс
        </Link>
      </div>
      {courses && courses.length > 0 ? (
        <div className={cl.courses}>
          {courses?.map((obj, i) => (
            <AdminCourse
              userSlug={userSlug}
              course={obj}
              key={obj.id}
              index={i}
              currentAdminCourse={currentAdminCourse}
              onCourse={onCourse}
            />
          ))}
        </div>
      ) : (
        <NotFound
          classNames={cl.notFound}
          containerCl={'w-full'}
          innerCl={'w-full'}
          img={notFoundImg}
          imgCl={cl.notFound__img}
          title={'Пусто'}
          titleCl={cl.notFound__title + ' title-other-page'}
          subtitle={
            'Вы еще не создали свои курсы. Но еще не все потеряно! Создайте курс и несите знания в массы!'
          }
          subtitleCl={cl.notFound__subtitle + ' text text-12'}
        >
          <Link className={cl.notFound__btn + ' btn btn-accent w-full'} to={`/admin/${userSlug}/createCourse`}>
            Создать курс
          </Link>
        </NotFound>
      )}
    </MySection>
  );
};

export default AdminCourses;
