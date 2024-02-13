package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/qwertycamedy/140/back/src/middlewares"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	r.Use(middlewares.AllowCors())

	baseRouter := r.Group("/api/v1")

	CoursesGroupRouter(baseRouter)

	return r
}
