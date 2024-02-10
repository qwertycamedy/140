package main

import (
	"github.com/qwertycamedy/140/back/src/routes"
)

func main() {
	router := routes.SetupRoutes()
	router.Run("localhost:3000")
}
