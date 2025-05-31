import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { GeneralComponent } from './general.component';
import { RemoteInService } from '../remotein.service';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;
  let remoteInService: jasmine.SpyObj<RemoteInService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('RemoteInService', [
      'getGeneralInfo',
      'getLanguage',
      'getCountry',
      'getTemperatureUnit',
      'updateDaylightSavings'
    ]);

    TestBed.configureTestingModule({
      imports: [GeneralComponent, HttpClientTestingModule],
      providers: [{ provide: RemoteInService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
    remoteInService = TestBed.inject(RemoteInService) as jasmine.SpyObj<RemoteInService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch general info and map responses correctly', () => {
    remoteInService.getGeneralInfo.and.returnValue(of({ general: { daylightSavings: true } }));
    remoteInService.getLanguage.and.returnValue(of({ language: 'EN' }));
    remoteInService.getCountry.and.returnValue(of({ regionList: [{ regionValue: 'US' }] }));
    remoteInService.getTemperatureUnit.and.returnValue(of({ temperatureUnit: 'F' }));

    component.fetchAllGeneralInfo();

    expect(remoteInService.getGeneralInfo).toHaveBeenCalled();
    expect(remoteInService.getLanguage).toHaveBeenCalled();
    expect(remoteInService.getCountry).toHaveBeenCalled();
    expect(remoteInService.getTemperatureUnit).toHaveBeenCalled();

    expect(component.daylightSavings).toBeTrue();
    expect(component.generalInfo.language).toBe('EN');
    expect(component.generalInfo.region).toBe('US');
    expect(component.generalInfo.temperatureUnit).toBe('F');
    expect(component.isLoading).toBeFalse();
  });

  it('should handle API errors gracefully in fetchAllGeneralInfo()', () => {
    remoteInService.getGeneralInfo.and.returnValue(throwError(() => new Error('fail')));
    remoteInService.getLanguage.and.returnValue(throwError(() => new Error('fail')));
    remoteInService.getCountry.and.returnValue(throwError(() => new Error('fail')));
    remoteInService.getTemperatureUnit.and.returnValue(throwError(() => new Error('fail')));

    component.fetchAllGeneralInfo();

    expect(remoteInService.getGeneralInfo).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should call updateDaylightSavings on toggle', () => {
    remoteInService.updateDaylightSavings.and.returnValue(of({ status: 'ok' }));

    component.daylightSavings = true;
    component.toggleDaylightSavings();

    expect(remoteInService.updateDaylightSavings).toHaveBeenCalledWith(true);
  });
});
