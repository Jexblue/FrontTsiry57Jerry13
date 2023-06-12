import { Component } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  titre = "Login";
  nom: string = '';
  mdp: string = '';

  constructor(private authService: AuthService,
    private router: Router) { }

  onSubmit(event: any) {
    this.authService.logIn(this.nom, this.mdp)
    if (this.authService.user.nom) {
      this.router.navigate(["/home"])
    }
  }
}
