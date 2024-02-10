package main

import (
	"github.com/qwertycamedy/140/back/src/config"
	"github.com/qwertycamedy/140/back/src/routes"
	"github.com/qwertycamedy/140/back/src/utils"
)

func main() {
	utils.LoadEnv()
	config.SetupDB()
	router := routes.SetupRoutes()
	router.Run("localhost:3000")
}
