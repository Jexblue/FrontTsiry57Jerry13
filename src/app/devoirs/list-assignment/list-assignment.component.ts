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
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  //proprietes pour la pagination rendu
  pageN: number = 1;
  limitN: number = 10;
  totalDocsN: number = 0;
  totalPagesN: number = 0;
  hasPrevPageN: boolean = false;
  prevPageN: number = 0;
  hasNextPageN: boolean = false;
  nextPageN: number = 0;


  constructor(private assignmentsService: AssignmentsService) {

  }

  ngOnInit(): void {
    this.getAssignmentsRendu();
    this.getAssignmentsNonRendu();

  }

  getAssignmentsRendu() {
    console.log("On va chercher les assignments rendu dans le service");

    this.assignmentsService.getAssignmentsRendu(this.page, this.limit)
      .subscribe(data => {
        this.assignmentsRendu = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        console.log("Données reçues");
        console.log(this.assignmentsRendu);
      });
  }

  getAssignmentsNonRendu() {
    console.log("On va chercher les assignments non rendu dans le service");

    this.assignmentsService.getAssignmentsNonRendu(this.pageN, this.limitN)
      .subscribe(data => {
        this.assignmentsNonRendu = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("Données reçues");
        console.log(this.assignmentsNonRendu);
      });
  }
}
