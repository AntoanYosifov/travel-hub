import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimations(),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({
      projectId: "travelhub-23b2e",
      appId: "1:806922401082:web:528419f6a2209f766d4c03",
      storageBucket: "travelhub-23b2e.firebasestorage.app",
      apiKey: "AIzaSyCQ9hNfTRszy2LCl0pZ1X7gfmX3t9xxBDo",
      authDomain: "travelhub-23b2e.firebaseapp.com",
      messagingSenderId: "806922401082"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
  ]
};
