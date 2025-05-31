import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InformationComponent } from './information/information.component';
import { GeneralComponent } from './general/general.component';
import { DealerComponent } from './dealer/dealer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCenterComponent,
    SidebarComponent,
    InformationComponent,
    GeneralComponent,
    DealerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showServiceCenter = false;
  showInfoSection = false;
  activeMenu = 'dealer';

  constructor(private cdr: ChangeDetectorRef) {}

  toggleServiceCenter() {
    console.log('Remote button Clicked');
    this.showServiceCenter = !this.showServiceCenter;
    if (!this.showServiceCenter) {
      this.showInfoSection = false;
    }
    this.cdr.detectChanges();
  }

  goToServiceCenter() {
    this.showInfoSection = false;
    this.showServiceCenter = true;
    this.cdr.detectChanges();
  }

  onShowInfo(show: boolean) {
    this.showServiceCenter = false;
    this.showInfoSection = true;
    this.activeMenu = 'dealer';
    this.cdr.detectChanges();
  }

  onHideContent() {
    this.showInfoSection = false;
    this.cdr.detectChanges();
  }

  onMenuSelected(menu: string) {
    this.activeMenu = menu;
    this.cdr.detectChanges();
  }
}
