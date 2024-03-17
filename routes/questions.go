package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func questionsGroupRouter(baseRouter *gin.RouterGroup) {
	lessons := baseRouter.Group("/courses/:id/lessons/:lessonId/questions")

	lessons.GET("/", controllers.GetQuestions)
	lessons.POST("/", controllers.CreateQuestions)
	lessons.PUT("/", controllers.UpdateQuestions)
	lessons.DELETE("/", controllers.DeleteQuestions)
}
