package routes

import (
	"backend/controllers"
	"backend/middlewares"

	"github.com/gin-gonic/gin"
)

func userGroupRouter(baseRouter *gin.RouterGroup) {
	courses := baseRouter.Group("/users")

	courses.GET("/", controllers.GetAllUsers)
	courses.GET("/:id", controllers.GetUserById)
	courses.POST("/register", controllers.Register)
	courses.POST("/login", controllers.Login)
	courses.GET("/profile", middlewares.TokenAuthMiddleware(), controllers.GetProfile)
	courses.PUT("/:id", middlewares.TokenAuthMiddleware(), controllers.UpdateUserById)
	courses.DELETE("/:id", middlewares.TokenAuthMiddleware(), controllers.DeleteUserById)
}
