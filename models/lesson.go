package models

import "gorm.io/gorm"

type Lesson struct {
	gorm.Model
	CourseID  uint       `json:"course_id"`
	IsPassed  bool       `json:"is_passed"`
	Name      string     `json:"name"`
	Image     string     `json:"image"`
	Descr     string     `json:"descr"`
	Questions []Question `json:"questions" gorm:"foreignKey:LessonID"`
}

type Question struct {
	gorm.Model
	LessonID uint     `json:"lesson_id"`
	Label    string   `json:"label"`
	Answers  []Answer `json:"answers" gorm:"foreignKey:QuestionID"`
}

type Answer struct {
	gorm.Model
	QuestionID uint   `json:"question_id"`
	Label      string `json:"label"`
	IsCorrect  bool   `json:"is_correct"`
}
