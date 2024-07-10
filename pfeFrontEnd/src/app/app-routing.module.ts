import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { RegisterComponent } from './register/register.component';
import { AdmindashbordComponent } from './admindashbord/admindashbord.component';
import { StatsAdminComponent } from './stats-admin/stats-admin.component';
import { ChooseDemandsComponent } from './choose-demands/choose-demands.component';
import { DemandeHomologationComponent } from './demande-homologation/demande-homologation.component';
import { DemandeRetraitConformiteComponent } from './demande-retrait-conformite/demande-retrait-conformite.component';
import { DemandeConformiteComponent } from './demande-conformite/demande-conformite.component';
import { AddAllDemandsComponent } from './add-all-demands/add-all-demands.component';
import { CreerDemandeConformiteComponent } from './creer-demande-conformite/creer-demande-conformite.component';
import { CreerDemandeHomologationComponent } from './creer-demande-homologation/creer-demande-homologation.component';
import { AvisTechUserComponent } from './avis-tech-user/avis-tech-user.component';
import { AvisTechAdminComponent } from './avis-tech-admin/avis-tech-admin.component';
import { ResponseToUserAvisComponent } from './response-to-user-avis/response-to-user-avis.component';
import { ListerAvisTechUserComponent } from './lister-avis-tech-user/lister-avis-tech-user.component';
import { DetailListerUserComponent } from './detail-lister-user/detail-lister-user.component';
import { CrerrDemandeRetraitConformiteComponent } from './crerr-demande-retrait-conformite/crerr-demande-retrait-conformite.component';
import { VoirProfileComponent } from './voir-profile/voir-profile.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GererUsersComponent } from './gerer-users/gerer-users.component';
import { DemandUserListeComponent } from './demand-user-liste/demand-user-liste.component';
import { DetailsDemandComponent } from './ManageDemands/details-demand/details-demand.component';
import { DetailsDemandConfComponent } from './ManageDemands/details-demand-conf/details-demand-conf.component';
import { DetailsDemandRetConfComponent } from './ManageDemands/details-demand-ret-conf/details-demand-ret-conf.component';
import { CreerDemandeAdmissionComponent } from './creer-demande-admission/creer-demande-admission.component';
import { CreerDemandeTemporelleComponent } from './creer-demande-temporelle/creer-demande-temporelle.component';
import { DemandeAdmissionComponent } from './demande-admission/demande-admission.component';
import { DemandeRadioComponent } from './demande-radio/demande-radio.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'intervenant', component: IntervenantComponent, canActivate: [AuthGuard], data: { roles: ['Intervenant'] } },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'viewProfile', component: VoirProfileComponent },
  { path: 'changePassword', component: ChangerMotDePasseComponent },
  { path: 'updateProfile', component: UpdateProfileComponent },




  { path: 'forbidden', component: ForbiddenComponent },

  { path: 'creer-tous-demandes', component: AddAllDemandsComponent },
  { path: 'creer-demande-conformité', component: CreerDemandeConformiteComponent },
  { path: 'creer-demande-homologation', component: CreerDemandeHomologationComponent },
  { path: 'creer-demande-retrait-conformité', component: CrerrDemandeRetraitConformiteComponent },
  { path: 'creer-demande-admission', component: CreerDemandeAdmissionComponent },
  { path: 'creer-demande-temporelle', component: CreerDemandeTemporelleComponent },

  { path: 'avis-technique-user', component: AvisTechUserComponent ,canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'lister-avis-technique-user', component: ListerAvisTechUserComponent ,canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'detailsListerUser/:id', component: DetailListerUserComponent ,canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'demande-lister-user', component: DemandUserListeComponent ,canActivate: [AuthGuard], data: { roles: ['User'] }},



  { path: 'admin-dashboard', component: AdmindashbordComponent,canActivate: [AuthGuard], data: { roles: ['Admin'] },
  children: [
    { path: 'statistiques', component: StatsAdminComponent },
    { path: 'demande-conformite', component: DemandeConformiteComponent },
    { path: 'demande-homologation', component: DemandeHomologationComponent },
    { path: 'demande-retrait-conformite', component: DemandeRetraitConformiteComponent },
    { path: 'demande-radio', component: DemandeRadioComponent },
    { path: 'demande-Admission', component: DemandeAdmissionComponent },

    { path: 'choose-demands', component: ChooseDemandsComponent },
    { path: 'avis-technique-admin', component: AvisTechAdminComponent},
    { path: 'manageUsers', component: GererUsersComponent },

    { path: 'avis-technique-admin/avis-technique-responeToUser/:id', component: ResponseToUserAvisComponent },
    { path: 'demande-homologation-details/:id', component: DetailsDemandComponent },
    { path: 'demande-Conformite-details/:id', component: DetailsDemandConfComponent },
    { path: 'demande-retraitConformite-details/:id', component: DetailsDemandRetConfComponent },






  
  ]

 },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
