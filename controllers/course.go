package controllers

import (
	"backend/models"
	"backend/utils"
	"errors"
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllCourses(c *gin.Context) {
	var courses []models.Course
	models.DB.Find(&courses)

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetRandomCourses(c *gin.Context) {
	var courses []models.Course
	models.DB.Order("RANDOM()").Limit(3).Find(&courses)

	c.JSON(http.StatusOK, gin.H{"data": courses})
}

func GetCourseById(c *gin.Context) {
	var course models.Course
	result := models.DB.Unscoped().Where("id = ?", c.Param("id")).First(&course)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found!"})
		return
	}

	if !course.DeletedAt.Time.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course already deleted!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func CreateCourse(c *gin.Context) {
	var course models.Course
	category := c.PostForm("category")
	name := c.PostForm("name")
	descr := c.PostForm("descr")
	backgroundColor := c.DefaultPostForm("background_color", "#F6DCDC")
	textColor := c.DefaultPostForm("text_color", "dark")

	if category == "" || name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Не все обязательные поля заполнены!"})
		return
	}

	course.Category = category
	course.Name = name
	course.Descr = descr
	course.BackgroundColor = backgroundColor
	course.TextColor = textColor

	file, err := c.FormFile("image")
	if err == nil {
		filePath := "./assets/img/" + filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сохранить файл"})
			return
		}

		baseURL := utils.HandleBaseUrl()
		course.Image = baseURL + filePath[2:]
	} else if err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не удалось загрузить файл"})
		return
	}

	models.DB.Create(&course)

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func UpdateCourseById(c *gin.Context) {
	courseID := c.Param("id")

	var course models.Course
	result := models.DB.First(&course, courseID)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found!"})
		return
	}

	if category := c.PostForm("category"); category != "" {
		course.Category = category
	}
	if name := c.PostForm("name"); name != "" {
		course.Name = name
	}
	if descr := c.PostForm("descr"); descr != "" {
		course.Descr = descr
	}
	if backgroundColor := c.PostForm("background_color"); backgroundColor != "" {
		course.BackgroundColor = backgroundColor
	}
	if textColor := c.PostForm("text_color"); textColor != "" {
		course.TextColor = textColor
	}

	file, err := c.FormFile("image")
	if err == nil {
		filePath := "./assets/img/" + strconv.Itoa(int(course.ID)) + "_" + filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сохранить файл"})
			return
		}
		
		baseURL := utils.HandleBaseUrl()
		course.Image = baseURL + filePath[2:]
	} else if err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не удалось загрузить файл"})
		return
	}

	// Обновляем курс в базе данных
	models.DB.Save(&course)

	c.JSON(http.StatusOK, gin.H{"data": course})
}

func DeleteCourseById(c *gin.Context) {
	var course models.Course
	result := models.DB.Unscoped().Where("id = ?", c.Param("id")).First(&course)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found!"})
		return
	}

	if !course.DeletedAt.Time.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course already deleted!"})
		return
	}

	models.DB.Delete(&course)

	c.JSON(http.StatusOK, gin.H{"data": true})
}

func FilterCourse(c *gin.Context) {
	db := models.DB
	var courses []models.Course

	var categoryQuery = c.Query("category")
	var searchQuery = c.Query("search")

	if categoryQuery != "" {
		db = db.Where("category = ?", categoryQuery)
	}

	if searchQuery != "" {
		db = db.Where("name ILIKE ? OR descr ILIKE ?", "%"+searchQuery+"%", "%"+searchQuery+"%")
	}

	db.Find(&courses)
	c.JSON(http.StatusOK, gin.H{"data": courses})
}
