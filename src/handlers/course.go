package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/qwertycamedy/140/back/src/models"
)

var courses = []models.Course{
	{
		ID:       "1",
		Category: "Имеется база",
		Title:    "Самая вышка!",
		Descr:    "Вам нужно набрать как можно больше баллов не смотря ни на что!",
		Style: models.Style{
			Bg:    "#F6F6DC",
			Color: "dark",
		},
	},
	{
		ID:       "2",
		Category: "С нуля",
		Title:    "Бокал на половину полон :D",
		Descr:    "50 баллов меня устроят. Один хрен кричать “Свободная касса!” через четыре года, разве не так?!",
		Style: models.Style{
			Bg:    "#DCEAF6",
			Color: "dark",
		},
	},
	{
		ID:       "3",
		Category: "С нуля",
		Title:    "Грантик со скрипом",
		Descr:    "И родаков не напрягаю, и сам за все раскидываю, но жизнь чет пахнет хуем. (но это не важнооооо..)",
		Style: models.Style{
			Bg:    "#F6DCDC",
			Color: "dark",
		},
	},
}

func GetAllCourses(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, courses)
}

func GetCourseById(c *gin.Context) {
	id := c.Param("id")

	for _, course := range courses {
		if id == course.ID {
			c.IndentedJSON(http.StatusOK, course)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Курс не найден", "status": http.StatusNotFound})
}
