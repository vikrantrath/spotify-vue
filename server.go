package main

import (
	"log"
	"net/http"
	"spotify-vue/api"
)

func main() {
	fileServer := http.FileServer(http.Dir("./dist")) // New code
	http.Handle("/", fileServer)

	http.HandleFunc("/api/getAllPlaylists", apiHandler)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/api/getAllPlaylists" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	api.ReturnAllArticles(w, r)
}
