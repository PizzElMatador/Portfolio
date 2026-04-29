import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, Client } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Client | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  isAuthenticated = signal(false);
  currentUser = signal<Client | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.currentUser.set(userData);
      this.currentUserSubject.next(userData);
      this.isAuthenticated.set(true);
    }
  }

  login(request: LoginRequest): Observable<AuthResponse> { //Observable signifie que cette méthode retourne un flux de données asynchrone, (permet de pas figer le site en attendant les données)
    // Simulation d'un appel API
    return new Observable(observer => {
      setTimeout(() => {
        // Mock data pour la démonstration
        const users = this.getMockUsers();
        const user = users.find(u => u.email === request.email && u.mot_de_passe === request.mot_de_passe);
        
        if (user) {
          const roleMap: { [key: string]: 'Admin' | 'Manager' | 'User' } = {
            'admin': 'Admin',
            'prestataire': 'Manager',
            'client': 'User'
          };

          const mockUser: Client = {
            id: 1,
            id_utilisateur: 1,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            date_inscription: new Date(),
            id_role: (user as any).role === 'Admin' ? 1 : (user as any).role === 'Manager' ? 2 : 3,
            role: roleMap[(user as any).role] || 'User',
            is_banned: false
          };
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          this.currentUser.set(mockUser);
          this.currentUserSubject.next(mockUser);
          this.isAuthenticated.set(true);
          
          observer.next({
            success: true,
            user: mockUser,
            token: 'mock-token-' + Date.now(),
            message: 'Connexion réussie'
          });
        } else {
          observer.next({
            success: false,
            message: 'Email ou mot de passe incorrect'
          });
        }
        observer.complete();
      }, 500);
    });
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (request.mot_de_passe !== request.confirmPassword) {
          observer.next({
            success: false,
            message: 'Les mots de passe ne correspondent pas'
          });
        } else {
          const mockUser: Client = {
            id: Math.floor(Math.random() * 1000),
            id_utilisateur: Math.floor(Math.random() * 1000),
            nom: request.nom,
            prenom: request.prenom,
            email: request.email,
            date_inscription: new Date(),
            id_role: 3, // Role User par défaut
            role: 'User',
            is_banned: false
          };
          
          localStorage.setItem('user', JSON.stringify(mockUser));
          this.currentUser.set(mockUser);
          this.currentUserSubject.next(mockUser);
          this.isAuthenticated.set(true);
          
          observer.next({
            success: true,
            user: mockUser,
            message: 'Inscription réussie'
          });
        }
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
  }

  updateUser(updatedUser: Client): void {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.currentUser.set(updatedUser);
    this.currentUserSubject.next(updatedUser);
  }

  private getMockUsers() {
    return [
      {
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@example.com',
        mot_de_passe: 'admin123',
        role: 'admin'
      },
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean@example.com',
        mot_de_passe: 'password123',
        role: 'client'
      },
      {
        nom: 'Martin',
        prenom: 'Marie',
        email: 'marie@example.com',
        mot_de_passe: 'password456',
        role: 'client'
      },
      {
        nom: 'Rousseau',
        prenom: 'Jean-Paul',
        email: 'jean-paul@example.com',
        mot_de_passe: 'password789',
        role: 'prestataire'
      },
      {
        nom: 'Bernard',
        prenom: 'Sophie',
        email: 'sophie@example.com',
        mot_de_passe: 'password101',
        role: 'prestataire'
      }
    ];
  }
}
