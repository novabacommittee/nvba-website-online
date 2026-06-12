import { NgModule } from '@angular/core';

import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { TeamComponent } from './pages/aboutus/team/team.component';
import { BodComponent } from './pages/aboutus/bod/bod.component';

import { GetjsonfileService } from './services/getjsonfile.service';
import { ConstitutionComponent } from './pages/aboutus/constitution/constitution.component';
import { ThreecolComponent } from './helper/home/threecol/threecol.component';
import { DonationsComponent } from './helper/home/donations/donations.component';

import { LatesteventsComponent } from './helper/home/latestevents/latestevents.component';
import { VolunteerComponent } from './helper/home/volunteer/volunteer.component';
import { SponsersComponent } from './helper/home/sponsers/sponsers.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from "./shared/services/auth.service";
import { ProfileComponent } from './helper/dashboard/profile/profile.component';
import { CartmemberComponent } from './helper/dashboard/cartmember/cartmember.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { NgxPayPalModule } from 'ngx-paypal';
import { CartticketsComponent } from './helper/dashboard/carttickets/carttickets.component';
import { Durgapuja2022Component } from './pages/durgapuja2022/durgapuja2022.component';
import { Durgapuja2023Component } from './pages/durgapuja2023/durgapuja2023.component';
import { HistoryComponent } from './pages/aboutus/history/history.component';
import { GalleryComponent } from './pages/gallery/gallery/gallery.component';
import { Pastteam2020To21Component } from './pages/archive/pastteam2020-21/pastteam2020-21.component';
import { MagazinesComponent } from './pages/archive/magazines/magazines.component';
import { Durgapujatickets2022Component } from './helper/tickets/durgapujatickets2022/durgapujatickets2022.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ReportsComponent } from './components/admin/reports/reports.component';

import { AgGridModule } from 'ag-grid-angular';
import { AlldetailsComponent } from './components/admin/alldetails/alldetails.component';
import { MembersComponent } from './components/admin/members/members.component';
import { ConcertComponent } from './components/events/concert/concert.component';
import { EventscheckoutComponent } from './components/events/eventscheckout/eventscheckout.component';
import { AgmComponent } from './pages/aboutus/agm/agm.component';
import { SaraswatiComponent } from './pages/saraswati/saraswati.component';
import { EventticketsComponent } from './components/events/eventtickets/eventtickets.component';
import { PresidentsdeskComponent } from './pages/aboutus/presidentsdesk/presidentsdesk.component';
import { KobipronamComponent } from './pages/kobipronam/kobipronam.component';
import { FoodticketsComponent } from './components/foodcart/foodtickets/foodtickets.component';
import { FoodcheckoutComponent } from './components/foodcart/foodcheckout/foodcheckout.component';
import { PicnicComponent } from './pages/picnic/picnic.component';
import { EventsguidelinesComponent } from './pages/aboutus/eventsguidelines/eventsguidelines.component';
import { Durgapujatickets2023Component } from './helper/tickets/durgapujatickets2023/durgapujatickets2023.component';
import { Durgapujatickets2024Component } from './helper/tickets/durgapujatickets2024/durgapujatickets2024.component';
import { Durgapujatickets2025Component } from './helper/tickets/durgapujatickets2025/durgapujatickets2025.component';
import { CaresComponent } from './pages/cares/cares.component';

import { ProposedconstitutionComponent } from './pages/archive/proposedconstitution/proposedconstitution.component';


import { UserDetailsCheckComponent } from './components/user-details-check/user-details-check.component';
import { QRCodeModule } from 'angularx-qrcode';
import { Pastteam2022To23Component } from './pages/archive/pastteam2022-23/pastteam2022-23.component';
import { Kobipronam2024Component } from './pages/kobipronam2024/kobipronam2024.component';
import { TechadvisorComponent } from './pages/aboutus/techadvisor/techadvisor.component';
import { Poilabaishak2024Component } from './pages/poilabaishak2024/poilabaishak2024.component';
import { Picnic2024Component } from './pages/picnic2024/picnic2024.component';
import { Durgapuja2024Component } from './pages/durgapuja2024/durgapuja2024.component';
import { SponsorshipComponent } from './pages/sponsorship/sponsorship.component';
import { Saraswatipuja2025Component } from './pages/saraswatipuja2025/saraswatipuja2025.component';
import { Paponliveconcert2025Component } from './pages/paponliveconcert2025/paponliveconcert2025.component';
import { Picnic2025Component } from './pages/picnic2025/picnic2025.component';
import { Kobipronam2025Component } from './pages/kobipronam2025/kobipronam2025.component';
import { Poilabaishak2025Component } from './pages/poilabaishak2025/poilabaishak2025.component';
import { Durgapuja2025Component } from './pages/durgapuja2025/durgapuja2025.component';
import { Saraswatipuja2026Component } from './pages/saraswatipuja2026/saraswatipuja2026.component';
import { Picnic2026Component } from './pages/picnic2026/picnic2026.component';
import { PoilaBoishakh2026Component } from './pages/poilaBoishakh2026/poilaBoishakh2026.component';
import { Durgapuja2026Component } from './pages/durgapuja2026/durgapuja2026.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { EchoesOfBengal2026Component } from './pages/echoesOfBengal2026/echoesOfBengal2026.component';
import { Pastteam2024To25Component } from './pages/archive/pastteam2024-25/pastteam2024-25.component';
import { SPtickets2026Component } from './helper/tickets/sptickets2026/sptickets2026.component';
import { EOBtickets2026Component } from './helper/tickets/eobtickets2026/eobtickets2026.component';
import { Picnictickets2026Component } from './helper/tickets/picnictickets2026/picnictickets2026.component';
import { CollapseModule } from "ngx-bootstrap/collapse";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactusComponent,
    TeamComponent,
    BodComponent,
    ConstitutionComponent,
    ThreecolComponent,
    DonationsComponent,
    LatesteventsComponent,
    VolunteerComponent,
    SponsersComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CartmemberComponent,
    CheckoutComponent,
    ProfileComponent,
    CartticketsComponent,
    Durgapuja2022Component,
    Durgapuja2023Component,
    HistoryComponent,
    GalleryComponent,
    Pastteam2020To21Component,
    MagazinesComponent,
    Durgapujatickets2022Component,
    TicketsComponent,
    ReportsComponent,
    AlldetailsComponent,
    MembersComponent,
    ConcertComponent,
    EventscheckoutComponent,
    AgmComponent,
    SaraswatiComponent,
    EventticketsComponent,
    PresidentsdeskComponent,
    KobipronamComponent,
    FoodticketsComponent,
    FoodcheckoutComponent,
    PicnicComponent,
    EventsguidelinesComponent,
    Durgapujatickets2023Component,
    Durgapujatickets2024Component,
    Durgapujatickets2025Component,
    CaresComponent,

    ProposedconstitutionComponent,
    UserDetailsCheckComponent,
    Pastteam2022To23Component,
    Kobipronam2024Component,
    TechadvisorComponent,
    Poilabaishak2024Component,
    Picnic2024Component,
    Durgapuja2024Component,
    SponsorshipComponent,
    Saraswatipuja2025Component,
    Paponliveconcert2025Component,
    Picnic2025Component,
    Kobipronam2025Component,
    Poilabaishak2025Component,
    Durgapuja2025Component,
    Pastteam2024To25Component,
    SPtickets2026Component,
    Saraswatipuja2026Component,
    Picnic2026Component,
    PoilaBoishakh2026Component,
    Durgapuja2026Component,
    ComingSoonComponent,
    EchoesOfBengal2026Component,
    EOBtickets2026Component,
    Picnictickets2026Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
        timeOut: 50000,
        positionClass: 'toast-top-center',
        closeButton: true,
        preventDuplicates: true,
    }), // ToastrModule added
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxPayPalModule,
    AgGridModule,
    QRCodeModule,
    CollapseModule
],
  providers: [GetjsonfileService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
