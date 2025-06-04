import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InformationComponent } from './information/information.component';
import { GeneralComponent } from './general/general.component';
import { DealerComponent } from './dealer/dealer.component';
// import { InstallationReportComponent } from './installation-report.component'; // ✅ Import new component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCenterComponent,
    SidebarComponent,
    InformationComponent,
    GeneralComponent,
    DealerComponent,
    // InstallationReportComponent // ✅ Add to imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showServiceCenter = false;
  showInfoSection = false;
  showInstallationReport = false; // ✅ New flag for Installation Report
  activeMenu = 'dealer';

  constructor(private cdr: ChangeDetectorRef) {}

  toggleServiceCenter() {
    console.log('Remote button Clicked');
    this.showServiceCenter = !this.showServiceCenter;

    if (!this.showServiceCenter) {
      this.showInfoSection = false;
      this.showInstallationReport = false; // ✅ Close install view too
    }

    this.cdr.detectChanges();
  }

  goToServiceCenter() {
    this.showInfoSection = false;
    this.showInstallationReport = false; // ✅ Close install view
    this.showServiceCenter = true;
    this.cdr.detectChanges();
  }

  onShowInfo(show: boolean) {
    this.showServiceCenter = false;
    this.showInfoSection = true;
    this.showInstallationReport = false; // ✅ Hide install view
    this.activeMenu = 'dealer';
    this.cdr.detectChanges();
  }

  onShowInstallationReport(show: boolean) {
    this.showServiceCenter = false;
    this.showInfoSection = false;
    this.showInstallationReport = true;
    this.cdr.detectChanges();
  }

  onHideContent() {
    this.showInfoSection = false;
    this.showInstallationReport = false; // ✅ Hide install view too
    this.cdr.detectChanges();
  }

  onMenuSelected(menu: string) {
    this.activeMenu = menu;
    this.cdr.detectChanges();
  }
}
