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
app.get('/api/players', async (req, res) => {
  try {
    const { include } = req.query;

    const response = await axios.get('https://api.sportmonks.com/v3/football/players', {
      params: {
        api_token: process.env.SPORTMONKS_API_KEY,
        include: include || 'teams',
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
app.get('/api/favorites', async (req, res) => {
  try {
    // Ersetze `query` durch `execute` und extrahiere die Zeilen (rows)
    const favoritesResult = await turso.execute('SELECT * FROM favorites');
    const favorites = favoritesResult.rows; // Ergebnisse aus `rows` extrahieren
    res.json(favorites); // Die Lieblingsspieler an das Frontend senden
  } catch (err) {
    console.error('Fehler beim Abrufen der Lieblingsspieler:', err.message);
    res.status(500).json({ error: 'Fehler beim Abrufen der Lieblingsspieler' });
  }
});

// API-Route: Spieler-Details abrufen
app.get('/api/player/:id', async (req, res) => {
  try {
    const playerId = req.params.id; // ID des Spielers aus der URL
    console.log('Angeforderte Spieler-ID:', playerId); // Logge die ID für Debugging

    const response = await axios.get(`https://api.sportmonks.com/v3/football/players/${playerId}`, {
      params: {
        api_token: process.env.SPORTMONKS_API_KEY, // API-Key
        include: 'teams', // Optional: Teaminformationen einbinden
      },
    });

    // Bereinige die Daten für das Frontend
    const player = {
      id: response.data.data.id,
      display_name: response.data.data.display_name || response.data.data.name || "Unbekannt",
      image_path: response.data.data.image_path || null,
      position_id: response.data.data.position_id || null,
      team: response.data.data.teams?.[0]?.name || "Unbekannt",
        country_name: response.data.data.country?.name || "Unbekannt",
      date_of_birth: response.data.data.date_of_birth || "Unbekannt",
      height: response.data.data.height || null,
      weight: response.data.data.weight || null,
    };

    res.json(player); // Sende die bereinigten Daten an das Frontend
  } catch (err) {
    console.error('Fehler beim Abrufen der Spieler-Details:', err.response?.data || err.message);
    res.status(404).json({
      error: 'Spieler nicht gefunden oder Fehler beim Abrufen der Details',
    });
  }
});

// Server starten
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
