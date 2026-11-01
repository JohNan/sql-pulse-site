import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Security } from './security';

describe('Security', () => {
  let component: Security;
  let fixture: ComponentFixture<Security>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Security],
    }).compileComponents();

    fixture = TestBed.createComponent(Security);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detail all 7 pillars of SQL Pulse security architecture', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hardware-Backed Android Keystore (AES-256-GCM)');
    expect(compiled.textContent).toContain('Zero-Middleman Direct Architecture');
    expect(compiled.textContent).toContain('SSH Bastion Tunneling & TOFU Host Verification');
    expect(compiled.textContent).toContain(
      'Destructive Query Interception (DROP / TRUNCATE / DELETE)',
    );
    expect(compiled.textContent).toContain('Biometric App Lock');
    expect(compiled.textContent).toContain('AES-256-GCM Encrypted Backup Envelopes');
    expect(compiled.textContent).toContain('Google Play In-App Updates');
  });
});
