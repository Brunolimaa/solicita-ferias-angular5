import { Ferias } from "./ferias.model";

export class Usuario {
    nome : string;
    email: string;
    perfis: Array<string>;
    ferias: Ferias[];
}