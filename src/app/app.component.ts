import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { MatieresService } from './shared/matieres.service';
import { EtudiantsService } from './shared/etudiants.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom: string = "";
  currentRoute: string = "";
  sidebarOpened = true;
  loading = false;

  constructor(private authService: AuthService,
    private router: Router,
    private assigmmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private etudiantsService: EtudiantsService,
  ) {
    console.log(router.url);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });


  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  login() {
    // utilise l'authService pour se connecter
    if (!this.authService.loggedIn) {
      this.authService.logIn();
      // on change le label du bouton
      this.labelConnexion = "Se déconnecter";
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }

  isLogged() {
    if (this.authService.loggedIn) {
      this.nom = "Michel Buffa";
    }
    return this.authService.loggedIn;
  }

  creerDonneesDeTest() {
    this.loading = true;
    this.assigmmentsService.deleteAll().subscribe(() => {
      this.matieresService.deleteAll().subscribe(() => {
        this.etudiantsService.deleteAll().subscribe(() => {
          this.matieresService.peuplerBDavecForkJoin().subscribe(() => {
            console.log("Opération terminée, les 10 données de matiere ont été insérées")
            this.etudiantsService.peuplerBDavecForkJoin().subscribe(() => {
              console.log("Operation terminee,les 100 etudtiants ont ete inseres");
              this.assigmmentsService.peuplerBDavecForkJoin().subscribe(() => {
                console.log("Operation terminee,les 1000 assignments ont ete inseres");
                this.loading = false;
                // this.snackBar.open('Réinitialisation des données effectuée', 'Fermer', {
                //   duration: 2000,
                // });
              })
            })
          });
        })
      })
    })



    // this.assigmmentsService.peuplerBDavecForkJoin()
    // .subscribe(() => {
    //   console.log("Opération terminée, les 1000 données ont été insérées")

    //   // on refresh la page pour que la liste apparaisse
    //   // plusieurs manières de faire....
    //   window.location.reload();
    // });
  }
}
