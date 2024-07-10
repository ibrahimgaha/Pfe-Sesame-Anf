import { FileHandle } from "./file-handle.model";


export enum AvisTechniqueStatus {
    REPONDU = 'Repondu',
    PAS_REPONDU = 'Pas_Repodu'
  }

  
export interface AvisTech{
    nomEquipement:String,
    question:String,
    selectedAvisTechnique:String,
    envoye_Le:String,
    repondu_le:String,
    response:String,


    avisDocument:FileHandle[]
 
}