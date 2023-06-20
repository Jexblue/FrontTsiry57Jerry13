import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/assignments/assignment.model';
import { AssignmentComplet } from 'src/app/models/assignmentComplet.model';
import { Etudiant } from 'src/app/models/etudiant.model';
import { Matiere } from 'src/app/models/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
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
  assignment?: AssignmentComplet;

  firstFormGroup = this._formBuilder.group({
    matiereCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    etudiantCtrl: ['', Validators.required],
  });

  dateLimite!: Date;

  thirdFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });

  dateRendu!: Date;
  fourthFormGroup = this._formBuilder.group({
    dateRCtrl: ['', Validators.required],
  });




  constructor(private _formBuilder: FormBuilder,
    private etudiantsService: EtudiantsService,
    private matieresService: MatieresService,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getEtudiants();
    this.getMatieres();
    const id = this.route.snapshot.params['_id'];
    this.getAssignment(id);
  }

  dateToString(date: Date) {
    this.dateLimite = date;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateString = date.toLocaleDateString('fr-FR', options);
    return dateString;
  }

  setValeurs() {
    this.firstFormGroup.get("matiereCtrl")?.setValue(this.assignment?.matiere[0]._id || "");
    this.secondFormGroup.get("etudiantCtrl")?.setValue(this.assignment?.auteur[0]._id || "");

    // this.thirdFormGroup.get("dateCtrl")?.setValue();
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
        this.setValeurs();
        console.log(this.assignment);
      });
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
