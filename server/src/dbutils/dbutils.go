package dbutils

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var Dbconn *sql.DB

func init() {
	var err error
	Dbconn, err = sql.Open("sqlite3", "../sqlite-database.db")
	if err != nil {
		log.Println("Error creating or opening database")
		log.Println(err)
	}

	// Create and prep a statement to make the tables necessary for the app to work
	statement, err := Dbconn.Prepare(`CREATE TABLE IF NOT EXISTS users(
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		pass TEXT NOT NULL
	);`)
	if err != nil {
		log.Println("Error preparing statement")
		log.Println(err)
	}
	_, err = statement.Exec()
	if err != nil {
		log.Fatal("Error creating tables in databse")
	}
	log.Println("DB Prepared successfully")
}
