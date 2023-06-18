import { Etudiant } from "./etudiant.model";
import { Matiere } from "./matiere.model";

export class AssignmentComplet {
    _id!: string;
    dateDeRendu!: Date;
    dateLimite!: Date;
    rendu!: Boolean;
    auteur!: Etudiant[];
    matiere!: Matiere[];
    note!: number;
}