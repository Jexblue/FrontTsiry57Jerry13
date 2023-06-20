import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentComplet } from 'src/app/models/assignmentComplet.model';
import { Etudiant } from 'src/app/models/etudiant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-detail-assignment',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.css']
})
export class DetailAssignmentComponent implements OnInit {
  assignment?: AssignmentComplet;
  titre: string = 'Details de devoir';
  constructor(private route: ActivatedRoute,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['_id'];
    console.log("Dans le ngOnInit de detail, id = " + id);
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        console.log(assignment);
        this.assignment = new AssignmentComplet();
        let matieres: Matiere[] = [];
        matieres.push(assignment?.matiere as Matiere);
        this.assignment.matiere = matieres;
        let etudiants: Etudiant[] = [];
        etudiants.push(assignment?.auteur as Etudiant);
        this.assignment.auteur = etudiants;
        this.assignment._id = assignment?._id as string;
        this.assignment.dateDeRendu = assignment?.dateDeRendu as Date;
        this.assignment.dateLimite = assignment?.dateLimite as Date;
        this.assignment.rendu = assignment?.rendu as Boolean;
        this.assignment.note = assignment?.note as number;
        console.log(this.assignment);
      });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  async supprimer() {
    if (await this.isAdmin()) {
      this.assignmentsService.deleteAssignment(this.assignment as AssignmentComplet)
        .subscribe(message => {
          console.log(message);
          // Pour cacher le detail, on met l'assignment à null
          this.assignment = undefined;

          // et on navigue vers la page d'accueil
          this.router.navigate(["/home"]);
          window.location.reload();
        });
    }

  }

}
