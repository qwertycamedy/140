package models

import (
	"github.com/qwertycamedy/140/back/src/config"
	"gorm.io/gorm"
)

type Course struct {
	gorm.Model
	Category   string `json:"category"`
	Title      string `json:"title"`
	Descr      string `json:"descr"`
	StyleBg    string `json:"style_bg"`
	StyleColor string `json:"style_color"`
}

func (course *Course) CreateCourse() (*Course, error) {
	err := config.DB.Model(&course).Create(&course).Error
	if err != nil {
		return &Course{}, err
	}
	return course, nil
}
