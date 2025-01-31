import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from "@libsql/client";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Verbindung zur Turso-Datenbank
export const turso = createClient({
  url: process.env.TURSO_DB_URL, // Turso-Datenbank-URL
  authToken: process.env.TURSO_DB_TOKEN, // Auth-Token für die Datenbank
});

// API-Route: Spielerinformationen abrufen
// API-Route: Spielerinformationen abrufen
app.get('/api/players', async (req, res) => {
  try {
    const { include } = req.query;

    // Verwende nur "teams" oder "country", nicht beides
    const validInclude = include === 'country' || include === 'teams' ? include : 'teams';

    const response = await axios.get('https://api.sportmonks.com/v3/football/players', {
      params: {
        api_token: process.env.SPORTMONKS_API_KEY,
        include: validInclude, // Gültiger Include-Parameter
      },
    });

    // Bereinige die Daten
    const cleanedData = response.data.data.map((player) => ({
      id: player.id, // Spieler-ID
      display_name: player.display_name || player.name || "Unbekannt", // Spielername
      image_path: player.image_path || null, // Bild des Spielers
      position_id: player.position_id || null, // Position des Spielers
      team: player.teams?.[0]?.name || "Unbekannt", // Erster Teamname, falls verfügbar
    }));

    res.json({ data: cleanedData }); // Sende nur die bereinigten Daten an das Frontend
  } catch (err) {
    console.error('Fehler beim Abrufen der Spieler:', err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data || 'Interner Serverfehler',
    });
  }
});


// API-Route: Lieblingsspieler hinzufügen
app.post('/api/favorites', async (req, res) => {
  const { player_id, player_name, position } = req.body;
  try {
    await turso.execute(
      `INSERT INTO favorites (player_id, player_name, position) VALUES (?, ?, ?)`,
      [player_id, player_name, position]
    );
    res.status(201).json({ message: 'Spieler hinzugefügt' });
  } catch (err) {
    console.error('Fehler beim Hinzufügen des Spielers:', err.message);
    res.status(500).json({ error: 'Fehler beim Hinzufügen des Spielers' });
  }
});

// **AKTUALISIERTE API-ROUTE: Lieblingsspieler abrufen**
// API-Route: Lieblingsspieler abrufen
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await turso.execute('SELECT * FROM favorites');
    console.log('Gefundene Favoriten:', favorites.rows); // Debugging
    res.json(favorites.rows); // Hier `.rows` zurückgeben
  } catch (err) {
    console.error('Fehler beim Abrufen der Lieblingsspieler:', err); // Mehr Infos ausgeben
    res.status(500).json({ error: err.message }); // Genauen Fehler zurückgeben
  }
});

// API-Route: Einen Lieblingsspieler löschen
app.delete('/api/favorites/:id', async (req, res) => {
  const { id } = req.params; // Die ID des zu löschenden Favoriten aus der URL

  try {
    // Lösche den Spieler aus der Favoritenliste
    await turso.execute(
      'DELETE FROM favorites WHERE id = ?',
      [id]
    );

    res.status(200).json({ message: 'Spieler aus Favoriten gelöscht' });
  } catch (err) {
    console.error('Fehler beim Löschen des Favoriten:', err.message);
    res.status(500).json({ error: 'Fehler beim Löschen des Spielers' });
  }
});




// API-Route: Spieler-Details abrufen
// API-Route: Spieler-Details abrufen
// API-Route: Spieler-Details abrufen
// API-Route: Spieler-Details abrufen
app.get('/api/player/:id', async (req, res) => {
  const playerId = req.params.id; // Spieler-ID aus der URL extrahieren
  const { include } = req.query; // Include-Parameter aus der Query holen

  const validInclude = include === 'country' || include === 'teams' ? include : 'teams';

  try {
    console.log(`Holen von Spieler-ID: ${playerId}, mit include: ${validInclude}`); // Protokolliere die Anfrage

    const response = await axios.get(`https://api.sportmonks.com/v3/football/players/${playerId}`, {
      params: {
        api_token: process.env.SPORTMONKS_API_KEY, // Dein API-Schlüssel
        include: validInclude,
      },
    });

    // Protokolliere die Antwort von SportMonks
    console.log('SportMonks Antwort:', response.data);

    const player = {
      id: response.data.data.id,
      display_name: response.data.data.display_name || response.data.data.name || "Unbekannt",
      image_path: response.data.data.image_path || null,
      position: response.data.data.position || "Unbekannt",
      country_name: response.data.data.country?.name || "Unbekannt",
      date_of_birth: response.data.data.date_of_birth || "Unbekannt",
      height: response.data.data.height || "Unbekannt",
      weight: response.data.data.weight || "Unbekannt",
      team_name: response.data.data.teams?.[0]?.name || "Unbekannt",
    };

    res.json(player); // Die bereinigten Daten zurückgeben
  } catch (err) {
    console.error("Fehler beim Abrufen der Spieler-Details:", err);
    res.status(404).json({
      error: 'Spieler nicht gefunden',
    });
  }
});




// Server starten
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
