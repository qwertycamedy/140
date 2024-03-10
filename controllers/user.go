package controllers

import (
	"backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllUsers(c *gin.Context) {
	var users []models.User
	models.DB.Find(&users)

	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetUserById(c *gin.Context) {
	var user models.User
	result := models.DB.Unscoped().Where("id = ?", c.Param("id")).First(&user)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}

	if !user.DeletedAt.Time.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already deleted!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existingUser models.User
	if err := models.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		// Пользователь с таким email уже существует
		c.JSON(http.StatusBadRequest, gin.H{"error": "Пользователь с таким email уже существует"})
		return
	}

	if err := user.HashPassword(user.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при хешировании пароля"})
		return
	}

	if result := models.DB.Create(&user); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при создании пользователя"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Пользователь успешно зарегистрирован"})
}

func Login(c *gin.Context) {
	var loginUser models.User
	var foundUser models.User

	if err := c.ShouldBindJSON(&loginUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := models.DB.Where("email = ?", loginUser.Email).First(&foundUser); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Пользователь не найден"})
		return
	}

	if err := foundUser.CheckPassword(loginUser.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный пароль"})
		return
	}

	tokenString, err := models.GenerateJWT(foundUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при создании JWT"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func GetProfile(c *gin.Context) {
	userID, _ := c.Get("userID")
	var user models.User

	if err := models.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
		return
	}

	user.Password = ""

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func UpdateUserById(c *gin.Context) {
	var user models.User
	var updUser models.User
	result := models.DB.Unscoped().Where("id = ?", c.Param("id")).First(&user)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}

	if !user.DeletedAt.Time.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already deleted!"})
		return
	}

	if err := c.ShouldBindJSON(&updUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&user).Updates(updUser)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func DeleteUserById(c *gin.Context) {
	var user models.User
	result := models.DB.Unscoped().Where("id = ?", c.Param("id")).First(&user)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}

	if !user.DeletedAt.Time.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already deleted!"})
		return
	}

	models.DB.Delete(&user)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
