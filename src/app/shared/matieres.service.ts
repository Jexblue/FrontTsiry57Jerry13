import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bdInitialMatieres } from './matiere_data'
import { Matiere } from '../models/matiere.model';
import { Observable, catchError, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environments';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  uri_api = environment.apiUrl + "/api/matieres";

  constructor(private http: HttpClient) { }

  addMatiere(matiere: Matiere): Observable<any> {
    return this.http.post<Matiere>(this.uri_api, matiere);
  }

  peuplerBD() {
    bdInitialMatieres.forEach(a => {
      let newMatiere = new Matiere();
      newMatiere.nom = a.nom;
      newMatiere.pathPhoto = a.pathPhoto;
      newMatiere.pathProf = a.pathProf;

      this.addMatiere(newMatiere)
        .subscribe((reponse) => {
          console.log(reponse.message);
        })
    })
  }

  peuplerBDavecForkJoin(): Observable<any> {
    // tableau d'observables (les valeurs de retour de addAssignment)
    let appelsVersAddMatiere: Observable<any>[] = [];

    bdInitialMatieres.forEach(a => {
      let newMatiere = new Matiere();
      newMatiere.nom = a.nom;
      newMatiere.pathPhoto = a.pathPhoto;
      newMatiere.pathProf = a.pathProf;
      appelsVersAddMatiere.push(this.addMatiere(newMatiere))
    });
    return forkJoin(appelsVersAddMatiere);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.uri_api);
  }

  getAllMatieres(): Observable<any> {
    return this.http.get<any>(this.uri_api);
  }

}
