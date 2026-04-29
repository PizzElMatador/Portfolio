import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestation } from '../models/prestation.model';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  constructor() { }

  getPrestations(): Observable<Prestation[]> {
    // Données en dur pour tester
    const prestations: Prestation[] = [
      {
        id_prestation: 1,
        nom_prestation: 'DJ Set Tropical House',
        description_presta: 'Set de musique tropical house parfait pour vos événements de soirée',
        prix: 350,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 1,
          nom: 'Rousseau',
          prenom: 'Jean-Paul',
          email: 'jean@example.com',
          note: 4.8,
          nombreAvis: 42
        }
      },
      {
        id_prestation: 2,
        nom_prestation: 'DJ Set Electro-Reggaeton',
        description_presta: 'Mix explosif de musique électronique et reggaeton pour danser',
        prix: 400,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 2,
          nom: 'Dupont',
          prenom: 'Marie',
          email: 'marie@example.com',
          note: 4.9,
          nombreAvis: 58
        }
      },
      {
        id_prestation: 3,
        nom_prestation: 'DJ Set Chillwave Sunset',
        description_presta: 'Ambiance relaxante et groovy pour accompagner vos couchers de soleil',
        prix: 300,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 3,
          nom: 'Martin',
          prenom: 'Alexandre',
          email: 'alex@example.com',
          note: 4.7,
          nombreAvis: 35
        }
      },
      {
        id_prestation: 4,
        nom_prestation: 'DJ Set Afro-Beat Energique',
        description_presta: 'Rythmes africains entraînants pour faire danser vos invités',
        prix: 380,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 4,
          nom: 'Dubois',
          prenom: 'Pierre',
          email: 'pierre@example.com',
          note: 4.6,
          nombreAvis: 28
        }
      },
      {
        id_prestation: 5,
        nom_prestation: 'DJ Set Reggae Roots',
        description_presta: 'Classiques du reggae pour une ambiance décontractée et positive',
        prix: 320,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 5,
          nom: 'Arnould',
          prenom: 'Sophie',
          email: 'sophie@example.com',
          note: 4.8,
          nombreAvis: 45
        }
      },
      {
        id_prestation: 6,
        nom_prestation: 'DJ Set Tech-House Premium',
        description_presta: 'Sélection premium de tech-house pour vos événements haut de gamme',
        prix: 450,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 6,
          nom: 'Laurent',
          prenom: 'David',
          email: 'david@example.com',
          note: 4.9,
          nombreAvis: 62
        }
      },
      {
        id_prestation: 7,
        nom_prestation: 'DJ Set Années 80-90',
        description_presta: 'Les plus grands hits des années 80 et 90 revisités',
        prix: 340,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 7,
          nom: 'Benoit',
          prenom: 'Christophe',
          email: 'chris@example.com',
          note: 4.5,
          nombreAvis: 33
        }
      },
      {
        id_prestation: 8,
        nom_prestation: 'DJ Set Hip-Hop & R&B',
        description_presta: 'Ambiance urbaine avec hip-hop et R&B pour les vrais fans',
        prix: 360,
        id_type: 1,
        nom_type: 'Musique',
        prestataire: {
          id: 8,
          nom: 'Garcia',
          prenom: 'Juan',
          email: 'juan@example.com',
          note: 4.7,
          nombreAvis: 51
        }
      }
    ];

    return of(prestations);
  }

  getPrestationById(id: number): Observable<Prestation | undefined> {
    return new Observable(observer => {
      this.getPrestations().subscribe(prestations => {
        observer.next(prestations.find(p => p.id_prestation === id));
        observer.complete();
      });
    });
  }
}
