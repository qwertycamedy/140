package controllers

import (
	"backend/models"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
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

func Register(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	var existingUser models.User
	result := models.DB.Where("email = ?", body.Email).First(&existingUser)
	if result.Error == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email already in use.",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password.",
		})
		return
	}

	user := models.User{Email: body.Email, Password: string(hash)}
	result = models.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user.",
		})
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{"message": "Регистрация прошла успешно!"})
}

func Login(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	var user models.User
	models.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Вход выполнен успешно!"})
}

func GetProfile(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}

func GetUserCourses(c *gin.Context) {
	userID, err := models.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	var user models.User
	if err = models.DB.Preload("Courses").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user.Courses})
}

func GetUserCourseByID(c *gin.Context) {
    userID, err := models.GetUserIDFromToken(c)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
        return
    }

    courseID := c.Param("courseId")

    var userCourse models.UserCourse
    if err := models.DB.Where("user_id = ? AND course_id = ?", userID, courseID).First(&userCourse).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Course not found for this user"})
        return
    }

    var course models.Course
    if err := models.DB.First(&course, courseID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": course})
}



func AddCourseToUser(c *gin.Context) {
	userID, err := models.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	var courseToAdd models.CourseToAdd
	if err := c.ShouldBindJSON(&courseToAdd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var course models.Course
	if err := models.DB.First(&course, courseToAdd.CourseID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var userCourse models.UserCourse
	if err := models.DB.Where("user_id = ? AND course_id = ?", userID, courseToAdd.CourseID).First(&userCourse).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course already added"})
		return
	}

	userCourse = models.UserCourse{UserID: userID, CourseID: courseToAdd.CourseID}
	if err := models.DB.Create(&userCourse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to add course"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course added successfully"})
}
