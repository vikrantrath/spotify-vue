package api

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func ReturnAllArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAllArticles")
	dirName, _ := os.Getwd()
	fileBytes, err := ioutil.ReadFile(fmt.Sprintf("%s/api/songList.json", dirName))
	if err != nil {
		log.Fatal(err)
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(fileBytes)
}
