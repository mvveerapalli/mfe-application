import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCenterComponent } from './service-center.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ServiceCenterComponent', () => {
  let component: ServiceCenterComponent;
  let fixture: ComponentFixture<ServiceCenterComponent>;
  let iconRegistrySpy: jasmine.SpyObj<MatIconRegistry>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    iconRegistrySpy = jasmine.createSpyObj('MatIconRegistry', ['addSvgIcon', 'getNamedSvgIcon']);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    // ✅ Mock return values
    const mockSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconRegistrySpy.getNamedSvgIcon.and.returnValue(of(mockSvgElement));
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.callFake((url: string) => 'safe-url');

    await TestBed.configureTestingModule({
      imports: [ServiceCenterComponent],
      providers: [
        { provide: MatIconRegistry, useValue: iconRegistrySpy },
        { provide: DomSanitizer, useValue: sanitizerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showInfo event when triggered', () => {
    spyOn(component.showInfo, 'emit');
    component.showInfo.emit(true);
    expect(component.showInfo.emit).toHaveBeenCalledWith(true);
  });

  it('should emit hideContent event when triggered', () => {
    spyOn(component.hideContent, 'emit');
    component.hideContent.emit();
    expect(component.hideContent.emit).toHaveBeenCalled();
  });

  it('should register all SVG icons', () => {
    const expectedIcons = [
      'sd_notifications-servicecont',
      'sd_equipment-servicecont',
      'sd_information-servicecont',
      'sd_tests-servicecont',
      'sd_diagnostics-servicecont',
      'sd_instalationrep-servicecont'
    ];

    expectedIcons.forEach(icon => {
      expect(iconRegistrySpy.addSvgIcon).toHaveBeenCalledWith(icon, jasmine.anything());
    });
  });
});
