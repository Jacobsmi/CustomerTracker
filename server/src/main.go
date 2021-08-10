package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"alive": true})
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", homepage)

	okMethods := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"})
	okOrigins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS(okMethods, okOrigins)(r)))
}
