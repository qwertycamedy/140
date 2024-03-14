package models

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	Category        string `json:"category"`
	Name            string `json:"name"`
	Descr           string `json:"descr"`
	Image           string `json:"image"`
	BackgroundColor string `json:"background_color"`
	TextColor       string `json:"text_color"`
}