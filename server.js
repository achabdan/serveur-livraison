import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

// URL de l'instance OSRM publique
const OSRM_SERVER = 'https://router.project-osrm.org/';

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route pour obtenir l'itinéraire entre deux points
app.get('/route', async (req, res) => {
  try {
    const { start, end } = req.query;

    // Vérifier que les coordonnées de départ et d'arrivée sont présentes
    if (!start || !end) {
      return res.status(400).json({
        error: 'Les coordonnées sont manquantes. Utilisez le format : /route?start=lat,lon&end=lat,lon'
      });
    }

    // Construire l'URL pour l'API OSRM
    const url = `${OSRM_SERVER}route/v1/driving/${start};${end}?overview=full`;
    
    // Faire la requête à l'API OSRM
    const response = await fetch(url);
    const data = await response.json();

    // Retourner la réponse de l'API OSRM
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir le point le plus proche sur la route (Snap to Road)
app.get('/nearest', async (req, res) => {
  try {
    const { coordinates } = req.query;

    if (!coordinates) {
      return res.status(400).json({
        error: 'Les coordonnées sont manquantes. Utilisez le format : /nearest?coordinates=lat,lon'
      });
    }

    const url = `${OSRM_SERVER}nearest/v1/driving/${coordinates}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur OSRM en cours d'exécution à http://localhost:${port}`);
  console.log('Exemples d\'utilisation :');
  console.log(`- Obtenir un itinéraire : http://localhost:${port}/route?start=13.388860,52.517037&end=13.397634,52.529407`);
  console.log(`- Trouver la route la plus proche : http://localhost:${port}/nearest?coordinates=13.388860,52.517037`);
});
