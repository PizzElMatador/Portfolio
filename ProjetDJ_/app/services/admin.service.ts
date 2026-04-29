import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Reservation {
  id_reservation: number;
  date_reservation: Date;
  date_prestation: Date;
  rue: string;
  code_postal: number;
  ville: string;
  id_prestation: number;
  id_client: number;
  nom_prestation?: string;
  client_nom?: string;
  client_prenom?: string;
}

export interface UserManagement {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  id_role: number;
  role?: 'Admin' | 'Manager' | 'User';
  is_banned: boolean;
  date_inscription: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private reservationHistory = new BehaviorSubject<Reservation[]>([]);
  public reservationHistory$ = this.reservationHistory.asObservable();

  private allUsers = new BehaviorSubject<UserManagement[]>([]);
  public allUsers$ = this.allUsers.asObservable();

  constructor() {
    this.loadMockData();
  }

  // Charger l'historique des réservations
  getReservationHistory(): Observable<Reservation[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockReservations: Reservation[] = [
          {
            id_reservation: 1,
            date_reservation: new Date('2026-03-20'),
            date_prestation: new Date('2026-03-25'),
            rue: '123 Rue de Paris',
            code_postal: 75001,
            ville: 'Paris',
            id_prestation: 1,
            id_client: 1,
            nom_prestation: 'DJ Set Soirée Dansante',
            client_nom: 'Bourbon',
            client_prenom: 'Clement'
          },
          {
            id_reservation: 2,
            date_reservation: new Date('2026-03-21'),
            date_prestation: new Date('2026-03-26'),
            rue: '456 Avenue Lyon',
            code_postal: 75012,
            ville: 'Paris',
            id_prestation: 2,
            id_client: 2,
            nom_prestation: 'Éclairage LED + Lumière Laser',
            client_nom: 'Benoit',
            client_prenom: 'Tom'
          },
          {
            id_reservation: 3,
            date_reservation: new Date('2026-03-19'),
            date_prestation: new Date('2026-03-28'),
            rue: '789 Rue du Havre',
            code_postal: 75008,
            ville: 'Paris',
            id_prestation: 3,
            id_client: 3,
            nom_prestation: 'Photographie Événement',
            client_nom: 'Dupont',
            client_prenom: 'Jean'
          },
          {
            id_reservation: 4,
            date_reservation: new Date('2026-03-22'),
            date_prestation: new Date('2026-03-29'),
            rue: '321 Boulevard Saint-Germain',
            code_postal: 75005,
            ville: 'Paris',
            id_prestation: 4,
            id_client: 4,
            nom_prestation: 'Sono Complète + DJ',
            client_nom: 'Martin',
            client_prenom: 'Marie'
          }
        ];
        observer.next(mockReservations);
        observer.complete();
      }, 500);
    });
  }

  // Obtenir tous les utilisateurs pour gestion
  getAllUsers(): Observable<UserManagement[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockUsers: UserManagement[] = [
          {
            id_utilisateur: 1,
            nom: 'Bourbon',
            prenom: 'Clement',
            email: 'clement@gmail.com',
            id_role: 1,
            role: 'User',
            is_banned: false,
            date_inscription: new Date('2026-03-23')
          },
          {
            id_utilisateur: 2,
            nom: 'Benoit',
            prenom: 'Tom',
            email: 'tom@gmail.com',
            id_role: 1,
            role: 'User',
            is_banned: false,
            date_inscription: new Date('2026-03-20')
          },
          {
            id_utilisateur: 3,
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean@gmail.com',
            id_role: 2,
            role: 'Manager',
            is_banned: false,
            date_inscription: new Date('2026-03-15')
          }
        ];
        observer.next(mockUsers);
        observer.complete();
      }, 500);
    });
  }

  // Assigner un rôle à un utilisateur
  assignRole(userId: number, newRole: 'Admin' | 'Manager' | 'User'): Observable<{ success: boolean; message: string }> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: `Rôle ${newRole} assigné avec succès à l'utilisateur ${userId}`
        });
        observer.complete();
      }, 300);
    });
  }

  // Bannir/Débannir un utilisateur
  toggleBanUser(userId: number, ban: boolean): Observable<{ success: boolean; message: string }> {
    return new Observable(observer => {
      setTimeout(() => {
        const action = ban ? 'banni' : 'débanni';
        observer.next({
          success: true,
          message: `L'utilisateur a été ${action} avec succès`
        });
        observer.complete();
      }, 300);
    });
  }

  // Charger les données simulées
  private loadMockData(): void {
    this.getReservationHistory().subscribe(data => {
      this.reservationHistory.next(data);
    });

    this.getAllUsers().subscribe(data => {
      this.allUsers.next(data);
    });
  }
}
