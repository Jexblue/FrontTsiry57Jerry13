import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentComplet } from 'src/app/models/assignmentComplet.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-row-assignment',
  templateUrl: './row-assignment.component.html',
  styleUrls: ['./row-assignment.component.css']
})
export class RowAssignmentComponent implements OnInit {
  @Input() assignment: AssignmentComplet | undefined;

  constructor(private assignmentsService: AssignmentsService,
    private router: Router,
    private authService: AuthService) {
    // this.assignment = new AssignmentComplet();

  }

  ngOnInit(): void {
    // console.log('Assignment:', this.assignment);
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

  isLogged() {
    return this.authService.loggedIn;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
