import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { DealerComponent } from './dealer.component';
import { RemoteInService } from '../remotein.service';

describe('DealerComponent', () => {
  let component: DealerComponent;
  let fixture: ComponentFixture<DealerComponent>;
  let remoteInService: jasmine.SpyObj<RemoteInService>;

  const mockDealerData = {
    dealer: {
      dealerNumber: 'D12345',
      telNo: '9876543210'
    }
  };

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('RemoteInService', ['getDealerInfo']);

    TestBed.configureTestingModule({
      imports: [DealerComponent, HttpClientTestingModule],
      providers: [{ provide: RemoteInService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DealerComponent);
    component = fixture.componentInstance;
    remoteInService = TestBed.inject(RemoteInService) as jasmine.SpyObj<RemoteInService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDealerInfo and set formatted data on success', () => {
    remoteInService.getDealerInfo.and.returnValue(of(mockDealerData));

    component.ngOnInit();

    expect(remoteInService.getDealerInfo).toHaveBeenCalled();
    expect(component.dealerInfo).toEqual(mockDealerData.dealer);
    expect(component.formattedPhoneNumber).toBe('1 (987) 654 – 3210');
    expect(component.formattedDealerId).toBe('D 1 2 3 4 5');
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error in getDealerInfo', () => {
    remoteInService.getDealerInfo.and.returnValue(throwError(() => new Error('API error')));

    component.ngOnInit();

    expect(remoteInService.getDealerInfo).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should format phone number correctly', () => {
    expect(component.formatPhoneNumber('9876543210')).toBe('1 (987) 654 – 3210');
    expect(component.formatPhoneNumber('19876543210')).toBe('1 (987) 654 – 3210');
    expect(component.formatPhoneNumber('')).toBe('N/A');
    expect(component.formatPhoneNumber('abc')).toBe('abc');
  });

  it('should format dealer ID correctly', () => {
    expect(component.formatDealerId('D123')).toBe('D 1 2 3');
    expect(component.formatDealerId('')).toBe('N/A');
  });
});
