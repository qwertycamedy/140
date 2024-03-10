package models

import (
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET_KEY"))

type Claims struct {
	Id string `json:"id"`
	jwt.StandardClaims
}

func GenerateJWT(id uint) (string, error) {
	expirationTime := time.Now().Add(30 * 24 * time.Hour)
	claims := &Claims{
		Id: strconv.Itoa(int(id)),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	return tokenString, err
}
