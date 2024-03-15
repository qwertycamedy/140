package routes

import (
	"backend/controllers"
	"backend/middlewares"

	"github.com/gin-gonic/gin"
)

func userGroupRouter(baseRouter *gin.RouterGroup) {
	users := baseRouter.Group("/users")

	users.GET("/", controllers.GetAllUsers)
	users.GET("/:id", controllers.GetUserById)
	users.POST("/register", controllers.Register)
	users.POST("/login", controllers.Login)
	users.GET("/profile", middlewares.RequireAuth, controllers.GetProfile)
	users.PUT("/:id", middlewares.RequireAuth, controllers.UpdateUserById)
	users.DELETE("/:id", middlewares.RequireAuth, controllers.DeleteUserById)
}
