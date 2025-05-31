
import { Component, OnInit } from '@angular/core';
import { RemoteInService } from '../remotein.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  isLoading = true;
  generalInfo: any = {};
  daylightSavings = false;

  constructor(private remoteInService: RemoteInService) {}

  ngOnInit(): void {
    this.fetchAllGeneralInfo();
  }

  fetchAllGeneralInfo(): void {
    this.isLoading = true;

    // 1. General Info
    this.remoteInService.getGeneralInfo().subscribe({
      next: (data) => {
        this.generalInfo = data?.general || {};
        this.daylightSavings = this.generalInfo?.daylightSavings ?? false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('General Info API error:', err);
        this.isLoading = false;
      }
    });

    // 2. Language
    this.remoteInService.getLanguage().subscribe({
      next: (lang) => {
        this.generalInfo.language = lang?.language || lang || 'N/A';
      },
      error: (err) => console.error('Language API error:', err)
    });

    // 3. Country/Region
    this.remoteInService.getCountry().subscribe({
      next: (country: any) => {
        console.log('✔ Region API response:', country);
        this.generalInfo.region = country?.regionList?.[0]?.regionValue || 'N/A';
      },
      error: (err: any) => console.error('Region API error:', err)
    });

    // 4. Temperature Unit
    this.remoteInService.getTemperatureUnit().subscribe({
      next: (unit) => {
        this.generalInfo.temperatureUnit = unit?.temperatureUnit || unit || 'N/A';
      },
      error: (err) => console.error('Temperature Unit API error:', err)
    });
  }

  toggleDaylightSavings(): void {
    this.remoteInService.updateDaylightSavings(this.daylightSavings).subscribe({
      next: (res) => console.log('Daylight savings updated:', res),
      error: (err) => console.error('Update failed:', err)
    });
  }
}
