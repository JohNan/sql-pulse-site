import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Features } from './features';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Native Wire Protocol & Connectivity category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Native Wire Protocol & Connectivity');
    expect(compiled.textContent).toContain('Native MySQL & MariaDB Wire Protocol v10');
    expect(compiled.textContent).toContain('Flexible Direct TCP & SSL/TLS');
    expect(compiled.textContent).toContain('SSH Bastion & Jump-Host Tunneling');
    expect(compiled.textContent).toContain('Active-Session Foreground Service');
  });

  it('should render Interactive SQL Query Studio category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Interactive SQL Query Studio');
    expect(compiled.textContent).toContain('Syntax-Highlighted SQL Editor & Symbol Bar');
    expect(compiled.textContent).toContain('Visual EXPLAIN Execution Plan Tree');
    expect(compiled.textContent).toContain('Parameterized SQL Snippets & History');
    expect(compiled.textContent).toContain('Out-of-Band Query Cancellation');
    expect(compiled.textContent).toContain('Background Export to CSV, JSON & SQL');
  });

  it('should render 2D Table Data Grid & Schema Inspector category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2D Table Data Grid & Schema Inspector');
    expect(compiled.textContent).toContain('2D Monospace Table Data Grid');
    expect(compiled.textContent).toContain('Transactional Row CRUD & Inline Editing');
    expect(compiled.textContent).toContain('Visual Schema & DDL Inspector');
  });

  it('should render Server Telemetry & Security category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Server Telemetry & Security');
    expect(compiled.textContent).toContain('Real-Time Server Process Monitor');
    expect(compiled.textContent).toContain('One-Tap Process & Query Termination');
    expect(compiled.textContent).toContain('Destructive SQL Safeguards');
    expect(compiled.textContent).toContain('Multi-Language Localization (EN, DE, ES, FR)');
  });

  it('should render SQL Pulse Pro category', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SQL Pulse Pro');
    expect(compiled.textContent).toContain('Visual EXPLAIN Execution Plans');
    expect(compiled.textContent).toContain('Transactional Table Grid CRUD');
    expect(compiled.textContent).toContain('Multi-Hop SSH Bastion Connections');
    expect(compiled.textContent).toContain('AES-256-GCM Encrypted Backups');
    expect(compiled.textContent).toContain('Biometric App Lock');
  });
});
