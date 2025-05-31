
import { Component, OnInit } from '@angular/core';
import { RemoteInService } from '../remotein.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dealer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  isLoading = true;
  dealerInfo: any;
  formattedPhoneNumber = '';
  formattedDealerId = '';

  constructor(private remoteInService: RemoteInService) {}

  ngOnInit() {
    this.remoteInService.getDealerInfo().subscribe({
      next: (data) => {
        this.dealerInfo = data?.dealer;
        this.formattedPhoneNumber = this.formatPhoneNumber(this.dealerInfo?.telNo);
        this.formattedDealerId = this.formatDealerId(this.dealerInfo?.dealerNumber);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Dealer API error:', err);
        this.isLoading = false;
      }
    });
  }

  formatDealerId(id: string): string {
    return id?.split('').join(' ') || 'N/A';
  }

  formatPhoneNumber(phone: string): string {
    if (!phone) return 'N/A';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} – ${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} – ${digits.slice(7)}`;
    }
    return phone;
  }
}
