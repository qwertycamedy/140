package models

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	CreatorID       uint   `json:"creator_id"`
	Category        string `json:"category"`
	Name            string `json:"name"`
	Descr           string `json:"descr"`
	Image           string `json:"image"`
	BackgroundColor string `json:"background_color"`
	TextColor       string `json:"text_color"`
}

type UserCourse struct {
	UserID   uint `json:"user_id"`
	CourseID uint `json:"course_id"`
}

type AdminCourse struct {
	AdminID  uint `json:"admin_id"`
	CourseID uint `json:"course_id"`
}

type CourseToAdd struct {
    CourseID uint `json:"course_id"`
}