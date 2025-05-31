import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InformationComponent } from './information/information.component';
import { GeneralComponent } from './general/general.component';
import { DealerComponent } from './dealer/dealer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        ServiceCenterComponent,
        SidebarComponent,
        InformationComponent,
        GeneralComponent,
        DealerComponent
      ],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle service center correctly', () => {
    const prevState = component.showServiceCenter;
    component.toggleServiceCenter();
    expect(component.showServiceCenter).toBe(!prevState);
  });

  it('should go to service center and hide info section', () => {
    component.showInfoSection = true;
    component.showServiceCenter = false;
    component.goToServiceCenter();
    expect(component.showServiceCenter).toBeTrue();
    expect(component.showInfoSection).toBeFalse();
  });

  it('should show info section and set active menu to dealer', () => {
    component.onShowInfo(true);
    expect(component.showServiceCenter).toBeFalse();
    expect(component.showInfoSection).toBeTrue();
    expect(component.activeMenu).toBe('dealer');
  });

  it('should hide content properly', () => {
    component.showInfoSection = true;
    component.onHideContent();
    expect(component.showInfoSection).toBeFalse();
  });

  it('should update active menu on selection', () => {
    component.onMenuSelected('general');
    expect(component.activeMenu).toBe('general');
  });
});
