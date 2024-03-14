package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func lessonsGroupRouter(baseRouter *gin.RouterGroup) {
	lessons := baseRouter.Group("/courses/:id/lessons")

	lessons.GET("/", controllers.GetCourseLessons)
	lessons.GET("/:lessonId", controllers.GetLessonById)
	lessons.POST("/", controllers.CreateLesson)
	lessons.PUT("/:lessonId", controllers.UpdateLessonById)
	lessons.DELETE("/:lessonId", controllers.DeleteLessonById)
}
