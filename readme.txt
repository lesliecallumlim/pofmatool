Project is managed through the yarn package manager
--------------------------------------------------
- To start the production environment do: 
- Frontend: yarn start 
- Backend: yarn start-api

To build the react files
- yarn build

Paths and source code for the key files would be:
--------------------------------------------------
Frontend
--------------------------------------------------
- Frontend SPA: ./src/App.js
- CSS: ./src/App.css
- React modules: ./src/components
- PWA: ./public/assets/manifest.json, ./public/index.html

--------------------------------------------------
Backend
--------------------------------------------------
- init: ./api/__init__
- API layer: ./api/api.py
- Database layer: ./api/models.py
- Database file: ./api/app.db
- Web Scraper: ./api/scraper.py
- Config: ./api/config.py
- Machine Learning Models (to deploy from disk): ./api/sentiment.py
- Machine Learning Models (saved to disk): ./api/models/*.joblib

 --------------------------------------------------
Machine Learning Generation 
--------------------------------------------------
- Datasets: ./mlgeneration/*.csv, ./mlgeneration/news/* -r
- Machine Learning Analysis: ml_analysis.ipynb