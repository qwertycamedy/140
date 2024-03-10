package routes

import "github.com/gin-gonic/gin"

func SetupRoutes() *gin.Engine {
	r := gin.Default()
	v := r.Group("/api/v1")

	userGroupRouter(v)
	coursesGroupRouter(v)

	return r
}
