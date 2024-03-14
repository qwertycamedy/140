package controllers

import (
	"backend/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCourseLessons(c *gin.Context) {
	var lessons []models.Lesson
	courseId := c.Param("id")

	err := models.DB.Where("course_id = ?", courseId).Find(&lessons).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": lessons})
}

func GetLessonById(c *gin.Context) {
	var lesson models.Lesson

	courseId, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID format"})
		return
	}

	lessonId, err := strconv.ParseUint(c.Param("lessonId"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	}

	if err := models.DB.Preload("Questions").Preload("Questions.Answers").Where("id = ? AND course_id = ?", lessonId, courseId).First(&lesson).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found for the given course"})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": lesson})
}

func CreateLesson(c *gin.Context) {
	var courseID uint
	if id, err := strconv.ParseUint(c.Param("id"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID format"})
		return
	} else {
		courseID = uint(id)
	}

	var lesson models.Lesson
	if err := c.BindJSON(&lesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson data"})
		return
	}

	lesson.CourseID = courseID

	if err := models.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&lesson).Error; err != nil {
			return err
		}
		return nil
	}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create lesson with tests"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": lesson})
}

func UpdateLessonById(c *gin.Context) {
	var courseID, lessonID uint

	if id, err := strconv.ParseUint(c.Param("id"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID format"})
		return
	} else {
		courseID = uint(id)
	}

	if id, err := strconv.ParseUint(c.Param("lessonId"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	} else {
		lessonID = uint(id)
	}

	var lesson, updLesson, updatedLesson models.Lesson

	if err := c.ShouldBindJSON(&updLesson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updLesson.CourseID = courseID
	updLesson.ID = lessonID

	if err := models.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&lesson).Where("id = ? AND course_id = ?", lessonID, courseID).Updates(updLesson).Error; err != nil {
			return fmt.Errorf("error updating lesson: %w", err)
		}

		if err := tx.Where("lesson_id = ?", lessonID).Delete(&models.Question{}).Error; err != nil {
			return fmt.Errorf("error deleting old questions: %w", err)
		}

		for _, question := range updLesson.Questions {
			question.LessonID = lessonID
			if err := tx.Create(&question).Error; err != nil {
				return fmt.Errorf("error creating new question: %w", err)
			}
		}

		return nil
	}); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Preload("Questions").Preload("Questions.Answers").Where("id = ?", lessonID).First(&updatedLesson).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve updated lesson"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": updatedLesson})
}

func DeleteLessonById(c *gin.Context) {
	var lessonID uint

	if id, err := strconv.ParseUint(c.Param("lessonId"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID format"})
		return
	} else {
		lessonID = uint(id)
	}

	err := models.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("question_id IN (?)", tx.Model(&models.Question{}).Select("id").Where("lesson_id = ?", lessonID)).Delete(&models.Answer{}).Error; err != nil {
			return err
		}
		if err := tx.Where("lesson_id = ?", lessonID).Delete(&models.Question{}).Error; err != nil {
			return err
		}
		if err := tx.Where("id = ?", lessonID).Delete(&models.Lesson{}).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Урок и связанный с ним тест удалены успешно"})
}
