package controllers

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetQuestions(c *gin.Context) {
	var questions []models.Question
	lessonId, err := strconv.ParseUint(c.Param("lessonId"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	}

	err = models.DB.Preload("Answers").Where("lesson_id = ?", lessonId).Find(&questions).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": questions})
}

func CreateQuestions(c *gin.Context) {
	var questions []models.Question

	var lessonId uint
	if id, err := strconv.ParseUint(c.Param("lessonId"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID format"})
		return
	} else {
		lessonId = uint(id)
	}

	if err := c.BindJSON(&questions); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for i := range questions {
		questions[i].LessonID = lessonId
		if err := models.DB.Create(&questions[i]).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save question"})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"data": questions})
}

func UpdateQuestions(c *gin.Context) {
	lessonId, err := strconv.ParseUint(c.Param("lessonId"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	}

	var newQuestions []models.Question
	if err := c.BindJSON(&newQuestions); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data format"})
		return
	}

	if err := models.DB.Where("lesson_id = ?", lessonId).Delete(&models.Question{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete existing questions"})
		return
	}

	for _, question := range newQuestions {
		question.LessonID = uint(lessonId)
		if err := models.DB.Create(&question).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new questions"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": newQuestions})
}

func DeleteQuestions(c *gin.Context) {
	lessonId, err := strconv.ParseUint(c.Param("lessonId"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	}

	if err := models.DB.Where("lesson_id = ?", lessonId).Delete(&models.Question{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete lesson questions"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "All questions for the lesson deleted successfully"})
}
