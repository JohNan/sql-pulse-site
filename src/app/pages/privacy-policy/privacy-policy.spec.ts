import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicy } from './privacy-policy';

describe('PrivacyPolicy', () => {
  let component: PrivacyPolicy;
  let fixture: ComponentFixture<PrivacyPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicy],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SQL Pulse application ID and Nanzen developer info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SQL Pulse - Database Studio');
    expect(compiled.textContent).toContain('com.johnan.mysqlclient');
    expect(compiled.textContent).toContain('Nanzen');
    expect(compiled.textContent).toContain('November 1, 2026');
  });

  it('should detail on-device AES-256-GCM Keystore security and zero-middleman architecture', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AES-256-GCM');
    expect(compiled.textContent).toContain('Android Keystore');
    expect(compiled.textContent).toContain('Direct Network Architecture');
  });

  it('should document third-party services (Google Play Services & Billing, Firebase Crashlytics & Analytics)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Google Play Services & Google Play Billing');
    expect(compiled.textContent).toContain('Firebase Crashlytics');
    expect(compiled.textContent).toContain('Firebase Analytics');
  });

  it('should render contact email directly inside #contact-email without script tags', () => {
    const emailContainer = fixture.nativeElement.querySelector('#contact-email a');
    expect(emailContainer).toBeTruthy();
    expect(emailContainer.getAttribute('href')).toBe('mailto:info@nanzen.se');
    expect(emailContainer.textContent).toContain('info@nanzen.se');
  });
});
