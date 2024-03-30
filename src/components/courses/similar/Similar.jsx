import MySection from 'components/_ui/section/MySection';
import cl from './Similar.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import Course from '../course/Course';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';

const Similar = ({ title, courses, coursesLoadStatus }) => {
  return (
    <MySection classNames={cl.similar} innerCl={cl.inner}>
      <h3 className={`${cl.title} title title-section`}>
        {title ? title : 'Вам могут подойти'}
      </h3>
      {coursesLoadStatus === loadStatus.pending && <Loader />}
      {coursesLoadStatus === loadStatus.rejected && (
        <NotFound
          title={'Не удалось получить курсы'}
          subtitle={
            'К сожалению запрос получения курсов не смог отработать правильно, обратитесь к тех. поддержке'
          }
        />
      )}
      {coursesLoadStatus === loadStatus.fulfilled && (
        <>
          {courses && courses.length ? (
            <div className={cl.outer}>
              <Swiper
                className={cl.slider}
                wrapperClass={cl.wrapper}
                spaceBetween={10}
                slidesPerView={'auto'}
                modules={[Mousewheel]}
                mousewheel={{
                  forceToAxis: true,
                }}
              >
                {courses?.map((course) => (
                  <SwiperSlide className={cl.slide} key={course.ID}>
                    <Course
                      course={course}
                      categoryCl={cl.course__cat}
                      titleCl={cl.course__title}
                      descrCl={cl.course__descr}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <NotFound title={'Курсов нет'} />
          )}
        </>
      )}
    </MySection>
  );
};

export default Similar;
