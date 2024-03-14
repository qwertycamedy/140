package main

import (
	"backend/models"
	"backend/routes"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	models.ConnectDB()

	router := routes.SetupRoutes()

	err = router.Run()
	if err != nil {
		return
	}
}
