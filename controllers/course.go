package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCourses(c *gin.Context) {
	var courses []models.Course
	models.DB.Find(&courses)

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetCourseById(c *gin.Context) {
	var course models.Course

	if err := models.DB.Unscoped().Where("id = ?", c.Param("id")).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found!"})
        return
    }

	if course.DeletedAt.Valid {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Course already deleted!"})
        return
    }

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func CreateCourse(c *gin.Context) {
	var newCourse models.CreateCourseInput

	if err := c.ShouldBindJSON(&newCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if newCourse.Category == "" || newCourse.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Не все поля заполнены!"})
		return
	}

	if newCourse.BackgroundColor == "" || newCourse.TextColor == "" {
		newCourse.BackgroundColor = "#F6DCDC"
		newCourse.TextColor = "dark"
	}

	course := models.Course{
		Category:        newCourse.Category,
		Name:            newCourse.Name,
		Descr:           newCourse.Descr,
		BackgroundColor: newCourse.BackgroundColor,
		TextColor:       newCourse.TextColor}

	models.DB.Create(&course)

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func UpdateCourseById(c *gin.Context) {
	var course models.Course
	var updCourse models.UpdateCourseInput

	if err := models.DB.Unscoped().Where("id = ?", c.Param("id")).Find(&course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found!"})
		return
	}

	if course.DeletedAt.Valid {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Course already deleted!"})
        return
    }

	if err := c.ShouldBindJSON(&updCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&course).Updates(updCourse)

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func DeleteCourseById(c *gin.Context) {
	var course models.Course

	if err := models.DB.Unscoped().Where("id = ?", c.Param("id")).Find(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found!"})
        return
    }

    if course.DeletedAt.Valid {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Course already deleted!"})
        return
    }

	models.DB.Delete(&course)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
