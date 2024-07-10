import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AdmindashbordComponent } from './admindashbord/admindashbord.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuDashboardComponent } from './menu-dashboard/menu-dashboard.component';
import { StatsAdminComponent } from './stats-admin/stats-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ChooseDemandsComponent } from './choose-demands/choose-demands.component';
import { DemandeHomologationComponent } from './demande-homologation/demande-homologation.component';
import { DemandeConformiteComponent } from './demande-conformite/demande-conformite.component';
import { DemandeRetraitConformiteComponent } from './demande-retrait-conformite/demande-retrait-conformite.component';
import { AddAllDemandsComponent } from './add-all-demands/add-all-demands.component';
import { CreerDemandeHomologationComponent } from './creer-demande-homologation/creer-demande-homologation.component';
import { CreerDemandeConformiteComponent } from './creer-demande-conformite/creer-demande-conformite.component';
import { CrerrDemandeRetraitConformiteComponent } from './crerr-demande-retrait-conformite/crerr-demande-retrait-conformite.component';
import { AvisTechUserComponent } from './avis-tech-user/avis-tech-user.component';
import { AvisTechAdminComponent } from './avis-tech-admin/avis-tech-admin.component';
import { DatePipe } from '@angular/common';
import { ResponseToUserAvisComponent } from './response-to-user-avis/response-to-user-avis.component';
import { ListerAvisTechUserComponent } from './lister-avis-tech-user/lister-avis-tech-user.component';
import { DetailListerUserComponent } from './detail-lister-user/detail-lister-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VoirProfileComponent } from './voir-profile/voir-profile.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GererUsersComponent } from './gerer-users/gerer-users.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DemandUserListeComponent } from './demand-user-liste/demand-user-liste.component';
import { ChunkPipe } from './_pipes/chunk.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModifyDemandComponent } from './ManageDemands/modify-demand/modify-demand.component';
import { DetailsDemandComponent } from './ManageDemands/details-demand/details-demand.component';
import { DetailsDemandConfComponent } from './ManageDemands/details-demand-conf/details-demand-conf.component';
import { DetailsDemandRetConfComponent } from './ManageDemands/details-demand-ret-conf/details-demand-ret-conf.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FileUploadModalComponent } from './file-upload-modal/file-upload-modal.component';
import { CreerDemandeAdmissionComponent } from './creer-demande-admission/creer-demande-admission.component';
import { CreerDemandeTemporelleComponent } from './creer-demande-temporelle/creer-demande-temporelle.component';
import { DemandeAdmissionComponent } from './demande-admission/demande-admission.component';
import { DemandeRadioComponent } from './demande-radio/demande-radio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    IntervenantComponent,
    RegisterComponent,
    FooterComponent,
    AdmindashbordComponent,
    MenuDashboardComponent,
    StatsAdminComponent,
    HeaderAdminComponent,
    ChooseDemandsComponent,
    DemandeHomologationComponent,
    DemandeConformiteComponent,
    DemandeRetraitConformiteComponent,
    AddAllDemandsComponent,
    CreerDemandeHomologationComponent,
    CreerDemandeConformiteComponent,
    CrerrDemandeRetraitConformiteComponent,
    AvisTechUserComponent,
    ResponseToUserAvisComponent,
    AvisTechAdminComponent,
    ListerAvisTechUserComponent,
    DetailListerUserComponent,
    VoirProfileComponent,
    ChangerMotDePasseComponent,
    UpdateProfileComponent,
    GererUsersComponent,
    DemandUserListeComponent,
    ChunkPipe,
    ModifyDemandComponent,
    DetailsDemandComponent,
    DetailsDemandConfComponent,
    DetailsDemandRetConfComponent,
    FileUploadModalComponent,
    CreerDemandeAdmissionComponent,
    CreerDemandeTemporelleComponent,
    DemandeAdmissionComponent,
    DemandeRadioComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTabsModule,MatProgressBarModule,
    MatDialogModule

    

  ],
  providers: [
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
