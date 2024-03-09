package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func coursesGroupRouter(baseRouter *gin.RouterGroup) {
	courses := baseRouter.Group("/courses")

	courses.GET("/", controllers.GetAllCourses)
	courses.GET("/:id", controllers.GetCourseById)
	courses.POST("/", controllers.CreateCourse)
	courses.PUT("/:id", controllers.UpdateCourseById)
	courses.DELETE("/:id", controllers.DeleteCourseById)
}
