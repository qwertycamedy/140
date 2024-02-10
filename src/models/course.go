package models

type Style struct {
	Bg    string `json:"bg"`
	Color string `json:"color"`
}

type Course struct {
	ID       string `json:"id"`
	Category string `json:"category"`
	Title    string `json:"title"`
	Descr    string `json:"descr"`
	Style    Style  `json:"style"`
}
