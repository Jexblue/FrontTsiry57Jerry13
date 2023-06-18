import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { environment } from 'src/environments/environments';
import { Matiere } from '../models/matiere.model';
import { Etudiant } from '../models/etudiant.model';
import { EtudiantsService } from './etudiants.service';
import { MatieresService } from './matieres.service';
import { response } from 'express';
import { AssignmentComplet } from '../models/assignmentComplet.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // tableau de devoirs à rendre
  assignments: Assignment[] = []
  matieres: Matiere[] = []
  etudiants: Etudiant[] = []

  constructor(private loggingService: LoggingService,
    private http: HttpClient,
    private etudiantsService: EtudiantsService,
    private matieresService: MatieresService) { }

  //uri_api = 'http://localhost:8010/api/assignments';
  // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/assignments';
  uri_api = environment.apiUrl + "/api/assignments";

  getAssignments(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  // getAssignment(id: number): Observable<Assignment | undefined> {
  //   // Plus tard on utilisera un Web Service et une BD
  //   return this.http.get<Assignment | undefined>(`${this.uri_api}/${id}`)

  //     .pipe(
  //       map(a => {
  //         if (a) {
  //           a.nom += " MAP MAP MAP";
  //         }
  //         return a;
  //       }),
  //       tap(a => {
  //         if (a)
  //           console.log("ICI DANS LE TAP " + a.nom)
  //       }),
  //       map(a => {
  //         if (a) {
  //           a.nom += " TOTOTOTO";
  //         }
  //         return a;
  //       }),
  //       catchError(this.handleError<Assignment>("Erreur dans le traitement de assignment avec id = " + id))
  //     )

  //   // On va chercher dans le tableau des assignments
  //   // l'assignment dont l'id est celui passé en paramètre

  //   //const assignment = this.assignments.find(a => a.id === id);
  //   // on retourne cet assignment encapsulé dans un Observable
  //   //return of(assignment);
  // }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };


  updateAssignment(assignment: Assignment): Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Assignment>(this.uri_api, assignment);

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    //this.loggingService.log(assignment.nom, 'modifié');

    //return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  deleteAssignment(assignment: AssignmentComplet): Observable<any> {
    return this.http.delete(this.uri_api + "/" + assignment._id)
  }

  // peuplerBD() {
  //   bdInitialAssignments.forEach(a => {
  //     const newAssignment = new Assignment();
  //     newAssignment.id = a.id;
  //     newAssignment.nom = a.nom;
  //     newAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     newAssignment.rendu = a.rendu;

  //     this.addAssignment(newAssignment)
  //       .subscribe((reponse) => {
  //         console.log(reponse.message);
  //       })
  //   })
  // }



  deleteAll(): Observable<any> {
    return this.http.delete(this.uri_api);
  }

  generateRandomDate() {
    const start = new Date('2022-01-01');
    const end = new Date('2022-12-31');

    const timeRange = end.getTime() - start.getTime();
    const randomTime = Math.random() * timeRange + start.getTime();
    const randomDate = new Date(randomTime);

    return randomDate;
  }

  IsRendu(note: number) {
    return (note > -1);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.uri_api, assignment);
  }

  // peuplerBDavecForkJoin() {
  //   let appelsVersAddAssignment: Observable<any>[] = [];
  //   this.etudiantsService.getAllEtudiants().subscribe(
  //     (response) => {
  //       this.etudiants = response;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  //   this.matieresService.getAllMatieres().subscribe(
  //     (response) => {
  //       this.matieres = response;
  //       console.log("matieres recues");
  //       console.log(this.matieres);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  //   this.matieres.forEach(m => {
  //     let newAssignment = new Assignment();
  //     newAssignment.dateDeRendu = this.generateRandomDate();
  //     newAssignment.matiere = m._id;
  //     this.etudiants.forEach(e => {
  //       newAssignment.dateDeRendu = this.generateRandomDate();
  //       newAssignment.auteur = e._id;
  //       let note = Math.random() * 21 - 1;
  //       newAssignment.note = note;
  //       newAssignment.rendu = this.IsRendu(note);
  //     })
  //     console.log(newAssignment);
  //     appelsVersAddAssignment.push(this.addAssignment(newAssignment))
  //   })

  //   return forkJoin(appelsVersAddAssignment);
  // }

  peuplerBDavecForkJoin(): Observable<any> {
    return forkJoin([
      this.etudiantsService.getAllEtudiants(),
      this.matieresService.getAllMatieres()
    ]).pipe(
      map(([etudiants, matieres]) => {
        let appelsVersAddAssignment: Observable<any>[] = [];
        matieres.forEach((matiere: Matiere) => {
          etudiants.forEach((etudiant: Etudiant) => {
            let newAssignment = new Assignment();
            newAssignment.dateDeRendu = this.generateRandomDate();
            newAssignment.dateLimite = new Date(2024, 1, 1);
            newAssignment.matiere = matiere._id;
            newAssignment.auteur = etudiant._id;
            let note = Math.round(Math.random() * (20 - (-1))) + (-1);
            newAssignment.note = note;
            newAssignment.rendu = this.IsRendu(note);
            appelsVersAddAssignment.push(this.addAssignment(newAssignment));
          });
        });

        return appelsVersAddAssignment;
      }),
      switchMap(appelsVersAddAssignment => forkJoin(appelsVersAddAssignment))
    );
  }

  getAssignment(id: number): Observable<AssignmentComplet | undefined> {
    const url = `this.uri_api/${id}`;
    return this.http.get<AssignmentComplet | undefined>(url);
  }

  getAssignmentsRendu(page: number, limit: number): Observable<any> {
    return this.http.get<AssignmentComplet[]>(this.uri_api + "/rendu/true" + "?page=" + page + "&limit=" + limit);
  }

  getAssignmentsNonRendu(page: number, limit: number): Observable<any> {
    const url = this.uri_api + "/rendu/false" + "?page=" + page + "&limit=" + limit;
    console.log(url);
    return this.http.get<AssignmentComplet[]>(url);
  }

}
