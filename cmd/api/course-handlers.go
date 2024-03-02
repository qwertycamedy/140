package main

import (
	"backend/models"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getCourseById(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))

	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
	}

	app.logger.Println("id is", id)

	//some course here
	course := models.Course{
		ID:        id,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Name:      "Some name",
		Descr:     "Some descr",
		Style: models.Style{
			Background: "#F6F6DC",
			Color:      "dark",
		},
		Categories: []models.Category{
			{
				ID:           1,
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
				CategoryName: "Category 1",
			},
			{
				ID:           2,
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
				CategoryName: "Category 2",
			},
		},
	}

	err = app.writeJSON(w, http.StatusOK, course, "course")
}

func (app *application) getAllCourses(w http.ResponseWriter, r *http.Request) {

}
