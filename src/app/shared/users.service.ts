import { Injectable } from '@angular/core';
import { User } from '../users/user.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    {
      id: 1,
      nom: 'Admin',
      mdp: 'admin',
      admin: true
    },
    {
      id: 1,
      nom: 'root',
      mdp: 'root',
      admin: false
    }
  ]
  constructor() { }

  getUser(nom: string, mdp: string) {
    const user = this.users.find(u => u.nom === nom && u.mdp === mdp);
    // on retourne cet assignment encapsulé dans un Observable
    return of(user);
  }
}
