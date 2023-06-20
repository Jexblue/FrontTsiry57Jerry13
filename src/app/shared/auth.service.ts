import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  userList: any[] = [];
  user: any = {};
  constructor() {
    this.userList = [
      { name: 'Pascal', password: 'admin', role: 'admin' },
      { name: 'Jean', password: 'test', role: 'user' },
      { name: 'Batman', password: 'test', role: 'user' }
    ];
    const user = localStorage.getItem("user");
    if (user) {
      const identifiant = user.split("/");
      this.logIn(identifiant[0], identifiant[1]);
    }
  }

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(name: string, password: string) {
    const user = this.userList.find(u => u.name === name && u.password === password);
    if (user) {
      this.user = user;
      this.loggedIn = true;
      localStorage.setItem("user", this.user.name + "/" + this.user.password);
    } else {
      this.loggedIn = false;
    }
  }

  logOut() {
    console.log("ON SE DELOGGE")
    this.user = {};
    this.loggedIn = false;
    localStorage.removeItem("user");
  }



  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
      resolve(this.user.role === "admin");
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
