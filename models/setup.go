package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=localhost user=postgres dbname=140 sslmode=disable password=123456"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to db!")
	}

	err = db.AutoMigrate(&User{}, &Admin{}, &Course{}, &UserCourse{}, &AdminCourse{}, &Lesson{}, &Question{}, &Answer{})
	if err != nil {
		panic("Failed to auto-migrate database schemas!")
	}

	DB = db
}
