package main

import (
	"backend/models"
	"backend/routes"
)

func main() {
	models.ConnectDB()

	router := routes.SetupRoutes()
	
	err := router.Run()
	if err != nil {
		return
	}
}
