import cl from './Courses.module.scss'
import Course from './course/Course'

const Courses = ({courses}) => {
  return (
    <div className={cl.courses}>
        {courses?.map(obj => (
            <Course course={obj} key={obj.ID} />
        )).reverse()}
    </div>
  )
}

export default Courses