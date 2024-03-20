package routes

import (
	"backend/controllers"
	"backend/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()
	v := r.Group("/api/v1")

	r.Use(middlewares.CORSMiddleware())

	v.GET("/", controllers.GetHelloWorld)

	userGroupRouter(v)
	coursesGroupRouter(v)
	lessonsGroupRouter(v)
	questionsGroupRouter(v)

	return r
}
