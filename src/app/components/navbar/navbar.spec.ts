import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SQL Pulse brand name', () => {
    const brandElement = fixture.nativeElement.querySelector('.navbar-brand .logo span');
    expect(brandElement.textContent).toContain('SQL Pulse');
  });

  it('should render cross-site link to SSH Client', () => {
    const crossSiteLink = fixture.nativeElement.querySelector('a.cross-site-link');
    expect(crossSiteLink).toBeTruthy();
    expect(crossSiteLink.getAttribute('href')).toBe('https://ssh-client.nanzen.se/');
    expect(crossSiteLink.textContent).toContain('SSH Client');
  });
});
