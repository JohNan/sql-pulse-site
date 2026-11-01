import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Terms } from './terms';

describe('Terms', () => {
  let component: Terms;
  let fixture: ComponentFixture<Terms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terms],
    }).compileComponents();

    fixture = TestBed.createComponent(Terms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SQL Pulse Terms of Service with effective date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Terms of Service for SQL Pulse - Database Studio');
    expect(compiled.textContent).toContain('November 1, 2026');
    expect(compiled.textContent).toContain('Nanzen');
    expect(compiled.textContent).toContain('com.johnan.mysqlclient');
  });

  it('should cover all required legal sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1. Acceptance of Terms');
    expect(compiled.textContent).toContain(
      '2. Lawful Database Administration & Backup Responsibility',
    );
    expect(compiled.textContent).toContain('3. Pro Subscriptions & One-Time Purchases');
    expect(compiled.textContent).toContain('4. Disclaimer of Warranty');
    expect(compiled.textContent).toContain('5. Limitation of Liability');
  });

  it('should mention Google Play In-App Billing for Pro features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Google Play In-App Billing');
    expect(compiled.textContent).toContain('SQL Pulse Pro');
  });
});
