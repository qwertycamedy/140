package models

import "time"

type Style struct {
	Background string `json:"background"`
	Color      string `json:"color"`
}

type Category struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	CategoryName string `json:"category_name"`
}

type Course struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name string `json:"name"`
	Descr string `json:"descr"`
	Style     Style     `json:"style"`
	Categories []Category `json:"categories"`
}