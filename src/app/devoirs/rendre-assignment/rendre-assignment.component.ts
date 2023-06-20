import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Assignment } from 'src/app/assignments/assignment.model';
import { AssignmentComplet } from 'src/app/models/assignmentComplet.model';
import { Etudiant } from 'src/app/models/etudiant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-rendre-assignment',
  templateUrl: './rendre-assignment.component.html',
  styleUrls: ['./rendre-assignment.component.css']
})
export class RendreAssignmentComponent {
  title: string = "Rendre le devoir";
  assignment?: AssignmentComplet;
  dateRendu!: Date;

  thirdFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) {
    const id = this.route.snapshot.params['_id'];
    this.getAssignment(id);
  }


  getAssignment(id: any) {
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

  onSubmit() {
    const note = this.firstFormGroup.value.firstCtrl;
    let assignment = new Assignment();
    assignment.matiere = this.assignment?.matiere[0]._id || "";
    assignment.auteur = this.assignment?.auteur[0]._id || "";
    assignment.dateLimite = this.assignment?.dateLimite || new Date();
    assignment.rendu = true;
    assignment.dateDeRendu = this.dateRendu;
    assignment.note = parseInt(note as string);
    assignment._id = this.assignment?._id as string;
    console.log(assignment);
    this.assignmentsService.updateAssignment(assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/assignments/" + assignment._id]);
      });

  }
}
