import { Kunden } from "./kunden";

export class Auftrag {
    id!: number;
    auftragsdatum=''; 
    auftragsstatus='';
    auftragsnummer!: number;
    kundenData!: Kunden;  
    bestellung='';
  }