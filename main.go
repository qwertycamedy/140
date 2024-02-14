package main

import (
	"github.com/qwertycamedy/140/back/src/models"
	"github.com/qwertycamedy/140/back/src/routes"
	"github.com/qwertycamedy/140/back/src/utils"
)

func main() {
	utils.LoadEnv()
	models.SetupDB()
	models.AutoMigrateModels()
	router := routes.SetupRoutes()
	router.Run("localhost:3000")
}
