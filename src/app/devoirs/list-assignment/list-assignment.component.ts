import { Component, OnInit } from '@angular/core';
import { AssignmentComplet } from 'src/app/models/assignmentComplet.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {
  titre = "Liste des devoirs";
  assignmentsRendu: AssignmentComplet[] = [];
  assignmentsNonRendu: AssignmentComplet[] = [];

  // propriétés pour la pagination non rendu
  pageN: number = 1;
  limitN: number = 10;
  totalDocsN: number = 0;
  totalPagesN: number = 0;
  hasPrevPageN: boolean = false;
  prevPageN: number = 0;
  hasNextPageN: boolean = false;
  nextPageN: number = 0;

  //proprietes pour la pagination rendu
  pageR: number = 1;
  limitR: number = 10;
  totalDocsR: number = 0;
  totalPagesR: number = 0;
  hasPrevPageR: boolean = false;
  prevPageR: number = 0;
  hasNextPageR: boolean = false;
  nextPageR: number = 0;


  constructor(private assignmentsService: AssignmentsService) {

  }

  ngOnInit(): void {
    this.getAssignmentsRendu();
    this.getAssignmentsNonRendu();

  }

  getAssignmentsRendu() {
    console.log("On va chercher les assignments rendu dans le service");

    this.assignmentsService.getAssignmentsRendu(this.pageR, this.limitR)
      .subscribe(data => {
        this.assignmentsRendu = data.docs;
        this.pageR = data.page;
        this.limitR = data.limit;
        this.totalDocsR = data.totalDocs;
        this.totalPagesR = data.totalPages;
        this.hasPrevPageR = data.hasPrevPage;
        this.prevPageR = data.prevPage;
        this.hasNextPageR = data.hasNextPage;
        this.nextPageR = data.nextPage;

        console.log("Données reçues");
        console.log(this.assignmentsRendu);
      });
  }

  getAssignmentsNonRendu() {
    console.log("On va chercher les assignments non rendu dans le service");

    this.assignmentsService.getAssignmentsNonRendu(this.pageN, this.limitN)
      .subscribe(data => {
        this.assignmentsNonRendu = data.docs;
        this.pageN = data.page;
        this.limitN = data.limit;
        this.totalDocsN = data.totalDocs;
        this.totalPagesN = data.totalPages;
        this.hasPrevPageN = data.hasPrevPage;
        this.prevPageN = data.prevPage;
        this.hasNextPageN = data.hasNextPage;
        this.nextPageN = data.nextPage;
        console.log("Données reçues");
        console.log(this.assignmentsNonRendu);
      });
  }

  async debutNR() {
    this.pageN = 0;
    this.getAssignmentsNonRendu();
  }

  async precedentNR() {
    if (this.pageN > 0) {
      this.pageN -= 1;
      await this.getAssignmentsNonRendu();
    }
  }

  async suivantNR() {
    if (this.pageN < this.totalPagesN) {
      this.pageN += 1;
      await this.getAssignmentsNonRendu();
    }
  }

  async finNR() {
    this.pageN = this.totalPagesN;
    this.getAssignmentsNonRendu();
  }



  async debutR() {
    this.pageR = 0;
    this.getAssignmentsRendu();
  }

  async precedentR() {
    if (this.pageR > 0) {
      this.pageR -= 1;
      await this.getAssignmentsRendu();
    }
  }

  async suivantR() {
    if (this.pageR < this.totalPagesR) {
      this.pageR += 1;
      await this.getAssignmentsRendu();
    }
  }

  async finR() {
    this.pageR = this.totalPagesR;
    this.getAssignmentsRendu();
  }
}
