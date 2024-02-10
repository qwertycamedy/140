package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/qwertycamedy/140/back/src/config"
	"github.com/qwertycamedy/140/back/src/models"
)

var courses []models.Course

func GetAllCourses(c *gin.Context) {
	config.DB.Find(&courses)
	c.IndentedJSON(http.StatusOK, courses)
}

func GetCourseById(c *gin.Context) {
	id := c.Param("id")

	for _, course := range courses {
		courseId := strconv.FormatUint(uint64(course.ID), 10)
		if id == courseId {
			c.IndentedJSON(http.StatusOK, course)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Курс не найден", "status": http.StatusNotFound})
}

func CreateCourse(c *gin.Context) {
	var input models.Course

	if err := c.ShouldBindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Ошибка при создании курса", "status": http.StatusBadRequest, "error": err})
		return
	}

	newCourse, err := input.CreateCourse()
	// if newCourse.Title == "" || newCourse.Category == "" || newCourse.Style.Bg == "" || newCourse.Style.Color == "" {
	// 	c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Не все поля заполнены", "status": http.StatusBadRequest})
	// 	return
	// }
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed", "message": err.Error(), "data": nil})
		return
	}

	c.IndentedJSON(http.StatusCreated, newCourse)
}
