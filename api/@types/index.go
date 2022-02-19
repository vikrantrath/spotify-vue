package api

type Track struct {
	ID       string `json:"_id"`
	Name     string `json:"name"`
	Year     int    `json:"year"`
	Artist   string `json:"artist"`
	Album    string `json:"album"`
	Duration int    `json:"duration_s"`
	ImageUri string `json:"imageUri"`
	Type     string `json:"type"`
	Uri      string `json:"uri"`
}

type Album struct {
	ID          string  `json:"_id"`
	Type        string  `json:"type"`
	Name        string  `json:"name"`
	Year        int     `json:"year"`
	TotalTracks int     `json:"total_tracks"`
	Description string  `json:"description"`
	ImageUri    string  `json:"imageUri"`
	Tracks      []Track `json:"tracks"`
}

type PlayList []Album
