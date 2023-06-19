import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/assignments/assignment.model';
import { Etudiant } from 'src/app/models/etudiant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { EtudiantsService } from 'src/app/shared/etudiants.service';
import { MatieresService } from 'src/app/shared/matieres.service';

@Component({
  selector: 'app-add-assignemnt',
  templateUrl: './add-assignemnt.component.html',
  styleUrls: ['./add-assignemnt.component.css']
})
export class AddAssignemntComponent {
  title: string = "Ajouter un devoir";
  matieres: Matiere[] = [];
  etudiants: Etudiant[] = [];

  firstFormGroup = this._formBuilder.group({
    matiereCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    etudiantCtrl: ['', Validators.required],
  });

  dateDeRendu!: Date;

  thirdFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });



  constructor(private _formBuilder: FormBuilder,
    private etudiantsService: EtudiantsService,
    private matieresService: MatieresService,
    private assignmentsService: AssignmentsService,
    private router: Router) {
    this.getEtudiants();
    this.getMatieres();
  }

  getEtudiants() {
    this.etudiantsService.getAllEtudiants().subscribe(data => {
      this.etudiants = data;
      console.log(this.etudiants);
    });
  }

  getMatieres() {
    this.matieresService.getAllMatieres().subscribe(data => {
      this.matieres = data;
      console.log(this.matieres);
    });
  }

  onSubmit() {
    const matiereId = this.firstFormGroup.value.matiereCtrl;
    const etudiantId = this.secondFormGroup.value.etudiantCtrl;
    const dateDeRendu = this.thirdFormGroup.value.dateCtrl;
    let assignment = new Assignment();
    assignment.dateLimite = new Date(dateDeRendu as string);
    assignment.rendu = false;
    assignment.auteur = etudiantId as string;
    assignment.matiere = matiereId as string;
    assignment.dateDeRendu = new Date();
    assignment.note = 0;
    console.log(assignment);
    this.assignmentsService.addAssignment(assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      });
  }
}
