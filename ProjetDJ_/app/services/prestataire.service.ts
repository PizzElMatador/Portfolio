import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestation, Prestataire } from '../models/prestation.model';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  private annonces: Prestation[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const stored = localStorage.getItem('prestataireAnnonces');
    if (stored) {
      this.annonces = JSON.parse(stored);
    } else {
      // Données initiales vides ou avec exemples
      this.annonces = [];
    }
  }

  private saveMockData(): void {
    localStorage.setItem('prestataireAnnonces', JSON.stringify(this.annonces));
  }

  getAnnoncesByPrestataire(prestatairId: number): Observable<Prestation[]> {
    const userAnnonces = this.annonces.filter(a => a.prestataire.id === prestatairId);
    return of(userAnnonces);
  }

  getAllAnnonces(): Observable<Prestation[]> {
    return of(this.annonces);
  }

  createAnnonce(prestataire: Prestataire, data: {
    nom_prestation: string;
    description_presta: string;
    prix: number;
    nom_type: string;
    id_type: number;
  }): Observable<Prestation> {
    const newAnnonce: Prestation = {
      id_prestation: Math.floor(Math.random() * 10000),
      nom_prestation: data.nom_prestation,
      description_presta: data.description_presta,
      prix: data.prix,
      id_type: data.id_type,
      nom_type: data.nom_type,
      prestataire
    };

    this.annonces.push(newAnnonce);
    this.saveMockData();
    return of(newAnnonce);
  }

  updateAnnonce(id: number, data: {
    nom_prestation: string;
    description_presta: string;
    prix: number;
    nom_type: string;
    id_type: number;
  }): Observable<Prestation> {
    const annonce = this.annonces.find(a => a.id_prestation === id);
    if (annonce) {
      annonce.nom_prestation = data.nom_prestation;
      annonce.description_presta = data.description_presta;
      annonce.prix = data.prix;
      annonce.nom_type = data.nom_type;
      annonce.id_type = data.id_type;
      this.saveMockData();
      return of(annonce);
    }
    return of(annonce!);
  }

  deleteAnnonce(id: number): Observable<boolean> {
    const index = this.annonces.findIndex(a => a.id_prestation === id);
    if (index > -1) {
      this.annonces.splice(index, 1);
      this.saveMockData();
      return of(true);
    }
    return of(false);
  }

  getServiceTypes(): Observable<{ id: number; nom: string }[]> {
    return of([
      { id: 1, nom: 'Musique - DJ' },
      { id: 2, nom: 'Photographie' },
      { id: 3, nom: 'Vidéographie' },
      { id: 4, nom: 'Animation' },
      { id: 5, nom: 'Décoration' },
      { id: 6, nom: 'Catering' },
      { id: 7, nom: 'Transport' }
    ]);
  }
}
