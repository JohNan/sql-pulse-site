import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import { ThemeService } from '../../services/theme';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section with SQL Pulse headline and badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SQL Pulse — Database Studio');
    expect(compiled.textContent).toContain('Native Android MySQL & MariaDB Studio');
    expect(compiled.textContent).toContain('pure-Kotlin Wire Protocol v10');
  });

  it('should render the Play Store download link targeting com.johnan.mysqlclient', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const playStoreLinks = compiled.querySelectorAll('a[href*="play.google.com/store/apps/details"]');
    expect(playStoreLinks.length).toBeGreaterThan(0);
    playStoreLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain('id=com.johnan.mysqlclient');
    });
  });

  it('should render all 12 key SQL Pulse features in the value proposition grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const expectedFeatures = [
      'Interactive SQL Query Studio',
      'Visual EXPLAIN Plan Analyzer',
      '2D Table Data Grid & CRUD',
      'Visual Schema & DDL Inspector',
      'Real-Time Process Monitor',
      'Pure-Kotlin Wire Protocol v10',
      'SSH Bastion Port Forwarding',
      'Hardware Keystore & Biometrics',
      'Destructive Query Safeguards',
      'Background CSV, JSON & SQL Export',
      'Encrypted Cloud-Free Backups',
      'SQL Pulse Pro Toolkit',
    ];

    for (const feature of expectedFeatures) {
      expect(compiled.textContent).toContain(feature);
    }
  });

  it('should embed ScreenshotShowcase and QueryStudioPreview components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-screenshot-showcase')).toBeTruthy();
    expect(compiled.querySelector('app-query-studio-preview')).toBeTruthy();
  });

  it('should update hero screenshot image source based on theme mode', () => {
    const themeService = TestBed.inject(ThemeService);
    const heroImg = fixture.nativeElement.querySelector('.hero-screen-img') as HTMLImageElement;

    themeService.isDarkMode.set(false);
    fixture.detectChanges();
    expect(heroImg.getAttribute('src')).toBe('screenshots/query_studio_explain_light.png');

    themeService.isDarkMode.set(true);
    fixture.detectChanges();
    expect(heroImg.getAttribute('src')).toBe('screenshots/query_studio_explain_dark.png');
  });
});
