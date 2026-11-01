import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should project content correctly for button with and without href', async () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const noHrefElem = hostFixture.nativeElement.querySelector('#button-without-href');
    const withHrefElem = hostFixture.nativeElement.querySelector('#button-with-href');
    expect(noHrefElem.textContent).toContain('Download App No Href');
    expect(withHrefElem.textContent).toContain('Download App With Href');
  });
});

@Component({
  standalone: true,
  imports: [Button],
  template: `
    <app-button id="button-without-href" variant="primary">
      <span>Download App No Href</span>
    </app-button>
    <app-button id="button-with-href" variant="primary" href="https://example.com">
      <span>Download App With Href</span>
    </app-button>
  `,
})
class TestHostComponent {}

