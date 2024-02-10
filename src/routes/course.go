package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/qwertycamedy/140/back/src/handlers"
)

func CoursesGroupRouter(baseRouter *gin.RouterGroup) {
	courses := baseRouter.Group("/courses")

	courses.GET("/", handlers.GetAllCourses)
	courses.GET("/:id", handlers.GetCourseById)
	courses.POST("/", handlers.CreateCourse)
}
