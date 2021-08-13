package main

import (
	"encoding/json"
	"log"
	"net/http"

	"jacobsmi/CustomerTrackerServer/src/dbutils"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/mattn/go-sqlite3"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"alive": true})
}

type User struct {
	Name  string
	Email string
	Pass  string
}

func createUser(w http.ResponseWriter, r *http.Request) {
	// Get user from JSON sent through signup POST request
	var newuser User
	json.NewDecoder(r.Body).Decode(&newuser)

	// Attempt to insert into database
	statement, err := dbutils.Dbconn.Prepare(`INSERT INTO users(name, email, pass) VALUES($1, $2, $3)`)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "err": "unknown_sql_error"})
	}

	_, err = statement.Exec(newuser.Name, newuser.Email, newuser.Pass)
	if err != nil {
		if sqliteErr, ok := err.(sqlite3.Error); ok {
			if sqliteErr.Code == 19 {
				json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "err": "duplicate_email"})
				log.Println(err)
			}
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"success": false, "err": "unknown_sql_error"})
			log.Println(err)
		}
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"success": true})
	}

}

func main() {

	defer dbutils.Dbconn.Close()

	r := mux.NewRouter()

	r.HandleFunc("/", homepage)
	r.HandleFunc("/createuser", createUser)

	okMethods := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"})
	okOrigins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS(okMethods, okOrigins)(r)))
}
