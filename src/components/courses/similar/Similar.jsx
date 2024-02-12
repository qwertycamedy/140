import MySection from 'components/_ui/section/MySection';
import cl from './Similar.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Mousewheel} from 'swiper/modules'
import 'swiper/css';
import Course from '../course/Course';

const Similar = ({ title, courses }) => {
  return (
    <MySection classNames={cl.similar} innerCl={cl.inner}>
      <h3 className={`${cl.title} title title-section`}>{title ? title : 'Вам могут подойти'}</h3>
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
            <SwiperSlide className={cl.slide} key={course.id}>
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
    </MySection>
  );
};

export default Similar;