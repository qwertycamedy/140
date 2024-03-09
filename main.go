package main

import (
	"backend/models"
	"backend/routes"
)

func main() {
	models.ConnectDB()

	router := routes.SetupRoutes()
	
	err := router.Run(":4000")
	if err != nil {
		return
	}
}
