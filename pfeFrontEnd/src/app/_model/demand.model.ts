import { DemandeStatus } from "./demandStatus.model";
import { Equipement } from "./equipment.model";
import { FileHandle } from "./file-handle.model";







export interface Demand {
  equipement: Equipement[];
  demandeFiles: FileHandle[];
  envoyeLe: string;
  datePremierCompliment: string;
  dateDeuxiemeCompliment: string;
}

