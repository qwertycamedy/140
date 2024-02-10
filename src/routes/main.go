package routes

import "github.com/gin-gonic/gin"

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	baseRouter := r.Group("/api/v1")

	CoursesGroupRouter(baseRouter)

	return r
}
