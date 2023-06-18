import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Etudiant } from '../models/etudiant.model';
import { Observable, catchError, forkJoin } from 'rxjs';
import { bdInitialEtudiants } from './etudiant_data';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {

  uri_api = environment.apiUrl + "/api/etudiants";

  constructor(private http: HttpClient) { }

  addEtudiant(etudiant: Etudiant): Observable<any> {
    return this.http.post<Etudiant>(this.uri_api, etudiant);
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddEtudiant: Observable<any>[] = [];

    bdInitialEtudiants.forEach(a => {
      let newEtudiant = new Etudiant();
      newEtudiant.nom = a.nom;
      newEtudiant.prenom = a.prenom;
      newEtudiant.pathPhoto = a.pathPhoto;
      appelsVersAddEtudiant.push(this.addEtudiant(newEtudiant))
    });
    return forkJoin(appelsVersAddEtudiant);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.uri_api);
  }

  getAllEtudiants(): Observable<any> {
    return this.http.get<any>(this.uri_api);
  }

}
