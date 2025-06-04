
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-service-center',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './service-center.component.html',
  styleUrls: ['./service-center.component.css']
})
export class ServiceCenterComponent {
  @Output() showInfo = new EventEmitter<boolean>();
  @Output() hideContent = new EventEmitter<void>();
  @Output() showInstallationReport = new EventEmitter<boolean>();

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'sd_notifications-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_notifications-servicecont.svg')
    );
    this.iconRegistry.addSvgIcon(
      'sd_equipment-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_equipment-servicecont.svg')
    );
    this.iconRegistry.addSvgIcon(
      'sd_information-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_information-servicecont.svg')
    );
    this.iconRegistry.addSvgIcon(
      'sd_tests-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_tests-servicecont.svg')
    );
    this.iconRegistry.addSvgIcon(
      'sd_diagnostics-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_diagnostics-servicecont.svg')
    );
    this.iconRegistry.addSvgIcon(
      'sd_instalationrep-servicecont',
      this.sanitizer.bypassSecurityTrustResourceUrl('https://ic3qaservicedashboardcdn.myicomfort.com/remotein/sd_instalationrep-servicecont.svg')
    );
  }
}
