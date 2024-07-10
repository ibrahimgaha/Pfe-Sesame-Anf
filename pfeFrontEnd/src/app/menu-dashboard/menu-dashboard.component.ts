import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  public menuProperties : Array<Menu>=[{

    id: '1',
    titre: 'Dashboard',
    icon: 'fa-solid fa-chart-line',
    url: '',
    sousMenu:[
     
      {
        id: '11',
        titre: 'Overview',
        icon: 'fa-solid fa-chart-column',
        url: 'admin-dashboard/statistiques',
      }
    ]
    
  },
  {
    id: '2',
    titre: 'Manage the Folders of the ANF',
    icon: 'fa-regular fa-folder-open',
    url: '',
    sousMenu:[
      {
        id: '21',
        titre: 'Nouvel Enregistrement',
        icon: 'fa-solid fa-folder-plus',
        url: '',
      },
      {
        id: '23',
        titre: 'Manage Folders and Files',
        icon: 'fa-solid fa-pen-to-square',
        url: 'admin-dashboard/choose-demands',
      }
    ]
  },
 
  {
    id: '3',
    titre: 'Technical requests',
    icon: 'fa-solid fa-comment-dots',
    url: '',
    sousMenu:[
      {
        id: '31',
        titre: 'Show technical requests',
        icon: 'fa-solid fa-comment-dots',
        url: 'admin-dashboard/avis-technique-admin',
      },]
  },

  {
    id: '4',
    titre: 'Manage users',
    icon: 'fa-solid fa-users',
    url: '',
    sousMenu:[
      {
        id: '41',
        titre: 'Show and Manage users',
        icon: 'fa-solid fa-users',
        url: 'admin-dashboard/manageUsers',
      },]
  },

  {
    id: '5',
    titre: 'Cadre Juridiques',
    icon: 'fa-solid fa-scale-balanced',
    url: '',
    sousMenu:[
      {
        id: '51',
        titre: 'Lister les Cadres Juridiques',
        icon: 'fa-solid fa-scale-balanced',
        url: '',
      },]
  },



  



];
  ngOnInit(): void {
  }


  navigate(url:String){ 
      this.router.navigate([url]);
  }

}
