import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SQL Pulse brand title', () => {
    const brandElement = fixture.nativeElement.querySelector('.footer-brand-title');
    expect(brandElement.textContent).toContain('SQL Pulse — Database Studio for Android');
  });

  it('should render copyright with Nanzen and SQL Pulse', () => {
    const copyrightElement = fixture.nativeElement.querySelector('.footer-copyright');
    expect(copyrightElement.textContent).toContain('Nanzen — SQL Pulse');
  });

  it('should render cross-site footer link to SSH Client', () => {
    const crossSiteLink = fixture.nativeElement.querySelector('a.cross-site-footer-link');
    expect(crossSiteLink).toBeTruthy();
    expect(crossSiteLink.getAttribute('href')).toBe('https://ssh-client.nanzen.se/');
    expect(crossSiteLink.textContent).toContain('SSH Client for Android');
  });
});
