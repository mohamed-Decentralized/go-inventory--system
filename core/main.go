package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"strconv"

	// "go-inventory--system/core/inventory"
	"go-inventory--system/core/inventory"
	"net/http"
	"sync"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)
var inv = inventory.NewInventory()
var mu sync.Mutex

func main () {
	router := mux.NewRouter()
	router.HandleFunc("/api/items",getItems).Methods("GET")
	router.HandleFunc("/api/items",addItem).Methods("POST")
	router.HandleFunc("/api/items/{id}",removeItem).Methods("DELETE")
	corsOptions := handlers.AllowedOrigins([]string{"http://localhost:5173"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE"})
	headers := handlers.AllowedHeaders([]string{"Content-Type"})

	http.ListenAndServe(":8000", handlers.CORS(corsOptions, methods, headers)(router))
}

func getItems(w http.ResponseWriter,r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	json.NewEncoder(w).Encode(inv.GetItems())
}

func addItem(w http.ResponseWriter,r *http.Request)  {
	var item inventory.Item
	body, _ := ioutil.ReadAll(r.Body)
	log.Println("Request Body:", string(body)) 
	r.Body = ioutil.NopCloser(bytes.NewBuffer(body))

	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		log.Println(err)
		http.Error(w,err.Error(),http.StatusBadRequest)
		return
	}
	mu.Lock()
	inv.AddItem(item)
	mu.Unlock()
	w.WriteHeader(http.StatusCreated)
}

func removeItem(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    idStr := vars["id"]

    id, err := strconv.Atoi(idStr)
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }

    mu.Lock()
    inv.RemoveItem(id) 
    mu.Unlock()

    w.WriteHeader(http.StatusNoContent)
}