package controllers

import (
	"backend/models"
	"net/http"
	"path/filepath"
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

	if err := models.DB.Where("id = ? AND course_id = ?", lessonId, courseId).First(&lesson).Error; err != nil {
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
	var lesson models.Lesson
	var courseID uint
	if id, err := strconv.ParseUint(c.Param("id"), 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID format"})
		return
	} else {
		courseID = uint(id)
	}

	name := c.PostForm("name")
	descr := c.PostForm("descr")

	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Не все обязательные поля заполнены!"})
		return
	}

	lesson.CourseID = courseID
	lesson.Name = name
	lesson.Descr = descr

	file, err := c.FormFile("image")
	if err == nil {
		filePath := "../front/src/assets/back-img/" + filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сохранить файл"})
			return
		}

		lesson.Image = filePath[8:]
	} else if err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не удалось загрузить файл"})
		return
	}

	if err := models.DB.Create(&lesson).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create lesson"})
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

	var lesson models.Lesson

	if name := c.PostForm("name"); name != "" {
		lesson.Name = name
	}
	if descr := c.PostForm("descr"); descr != "" {
		lesson.Descr = descr
	}

	lesson.CourseID = courseID
	lesson.ID = lessonID

	file, err := c.FormFile("image")
	if err == nil {
		filePath := "../front/src/assets/back-img/" + strconv.Itoa(int(lesson.ID)) + "_" + filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сохранить файл"})
			return
		}

		lesson.Image = filePath[8:]
	} else if err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не удалось загрузить файл"})
		return
	}

	models.DB.Save(&lesson)

	c.JSON(http.StatusOK, gin.H{"data": lesson})
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
