package utils

import "os"

func HandleBaseUrl() string {
	var baseUrl string

	if os.Getenv("ENVIRONMENT") == "dev" {
		baseUrl = os.Getenv("DEV_URL")
	} else {
		baseUrl = os.Getenv("PROD_URL")
	}

	return baseUrl
}
