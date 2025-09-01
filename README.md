# TravelHub

A small Angular app for sharing travel destinations. Users can register/login, add destinations, like/save places (“Want to visit”), and manage personal collections — all in a clean, dark-theme UI.

## Tech Used
- **Angular 20.0.5. (standalone components, Signals, RxJS)
- **Firebase**: Authentication & Firestore (Cloud Functions for cascade update and delete)
- **TypeScript** + component-scoped CSS

## Quick Start
```bash
git clone https://github.com/AntoanYosifov/travel-hub
cd travel-hub
npm install
npm start   # or: ng serve
# open http://localhost:4200


✅ No extra setup required — the app is preconfigured to use a live Firebase backend.
The config is in src/environments/environment.ts.

Features

Catalog: /destinations

Details: /destinations/:id

Auth: register & login (email/password)

Create destinations (authenticated users)

Edit your destination’s description

Delete your own destinations

Interactions: Like ❤️ and “Want to visit” 📌

Collections:

/collections/want-to-visit

/collections/liked

/collections/added-by-you

Profile: view + edit display name



Happy travels! 🌍✈️