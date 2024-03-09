package models

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	Category        string `json:"category"`
	Name            string `json:"name"`
	Descr           string `json:"descr"`
	BackgroundColor string `json:"background_color"`
	TextColor       string `json:"text_color"`
}

type CreateCourseInput struct {
	Category        string `json:"category" binding:"required"`
	Name            string `json:"name" binding:"required"`
	Descr           string `json:"descr"`
	BackgroundColor string `json:"background_color"`
	TextColor       string `json:"text_color"`
}

type UpdateCourseInput struct {
	Category        string `json:"category"`
	Name            string `json:"name"`
	Descr           string `json:"descr"`
	BackgroundColor string `json:"background_color"`
	TextColor       string `json:"text_color"`
}