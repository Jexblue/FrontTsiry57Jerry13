import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Etudiant } from 'src/app/models/etudiant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { EtudiantsService } from 'src/app/shared/etudiants.service';
import { MatieresService } from 'src/app/shared/matieres.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent {
  title: string = "Modifier le devoir";
  matieres: Matiere[] = [];
  etudiants: Etudiant[] = [];

  firstFormGroup = this._formBuilder.group({
    matiereCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private etudiantsService: EtudiantsService,
    private matieresService: MatieresService) {
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
    })
  }

}
