import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-all-demands',
  templateUrl: './add-all-demands.component.html',
  styleUrls: ['./add-all-demands.component.css']
})
export class AddAllDemandsComponent implements OnInit {

  demandDescriptions: string[] = [
    "Sont exemptés de l'homologation, conformément aux dispositions de l'article 6 du présent décret gouvernemental, et doivent être soumis à une vérification de conformité aux exigences techniques d'interfonctionnement avec les réseaux publics des télécommunications et aux règles d’utilisation et d’exploitation des fréquences: - Les équipements terminaux des télécommunications et les équipements terminaux radioélectriques importés au profit des personnes physiques ou morales pour leurs besoins propres ou à titre temporaire.  - Les équipements terminaux des télécommunications et les équipements terminaux radioélectriques importés dans le cadre d'exécution de contrats de marchés publics pour le compte des opérateurs de télécommunications ou des structures et entreprises publiques pour leur propre usage.",
    "l'ensemble des opérations de contrôle appropriées et des essais nécessaires par lesquelles un organisme agréé constate et atteste que l'exemplaire représentatif des équipements terminaux de télécommunications ou des équipements radioélectriques répond à la réglementation, aux normes et spécifications techniques en vigueur.  - Equipement terminal des télécommunications: tout équipement pouvant être raccordé à la terminaison d'un réseau des télécommunications en vue d'offrir des services de télécommunications au public.  - Equipement radioélectrique : tout équipement des télécommunications utilisant les fréquences radioélectriques.  - Moyens de cryptage: dispositifs ou systèmes électroniques permettant le cryptage des données échangées sur les réseaux des télécommunications.  Art. 3 - Le centre d'études et de recherches des télécommunications, sous la supervision du ministère chargé des télécommunications, est responsable d'étudier les dossiers d'homologation, de conformité et de contrôle technique lors de l'importation et de la commercialisation des équipements terminaux des télécommunications et des équipements radioélectriques et délivrer les attestations suite aux résultats positifs des rapports. En cas de réserve, le dossier sera rejeté en précisant les motifs du rejet.",
    "Description: Vestibulum sit amet mauris velit. Nam eu nulla lobortis, malesuada eros vel, faucibus eros."
  ];

  showDescriptions: boolean[] = [false, false, false,false,false];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDescription(index: number): void {
    this.showDescriptions[index] = !this.showDescriptions[index];
  }

  showDescription(index: number): void {
    this.showDescriptions[index] = true;
  }

  hideDescription(index: number): void {
    this.showDescriptions[index] = false;
  }
  
}


