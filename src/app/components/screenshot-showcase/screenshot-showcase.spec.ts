import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenshotShowcase } from './screenshot-showcase';

describe('ScreenshotShowcase', () => {
  let component: ScreenshotShowcase;
  let fixture: ComponentFixture<ScreenshotShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenshotShowcase],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenshotShowcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all 6 SQL Pulse categories and 6 screenshots initially', () => {
    expect(component.categories.length).toBe(6);
    expect(component.screenshots.length).toBe(6);
    expect(component.filteredScreenshots.length).toBe(6);
  });

  it('should filter screenshots by category', () => {
    component.setCategory('connections');
    expect(component.filteredScreenshots.length).toBe(2);
    expect(component.filteredScreenshots.every(s => s.category === 'connections')).toBe(true);

    component.setCategory('schema');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('schema-ddl-inspector');

    component.setCategory('datagrid');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('table-data-grid');

    component.setCategory('querystudio');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('sql-query-studio');

    component.setCategory('monitor');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('server-process-monitor');

    component.setCategory('all');
    expect(component.filteredScreenshots.length).toBe(6);
  });

  it('should open and close modal lightbox', () => {
    expect(component.activeModalItem).toBeNull();

    const sampleItem = component.screenshots[0];
    component.openModal(sampleItem);
    expect(component.activeModalItem).toBe(sampleItem);

    component.closeModal();
    expect(component.activeModalItem).toBeNull();
  });

  it('should navigate between modal screenshots', () => {
    component.setCategory('all');
    component.openModal(component.screenshots[0]);
    expect(component.activeModalItem?.id).toBe('connections-home');

    component.navigateModal(1);
    expect(component.activeModalItem?.id).toBe('connection-ssh-config');

    component.navigateModal(-1);
    expect(component.activeModalItem?.id).toBe('connections-home');
  });

  it('should update theme mode and return image path', () => {
    component.setThemeMode('light');
    expect(component.effectiveTheme).toBe('light');

    component.setThemeMode('dark');
    expect(component.effectiveTheme).toBe('dark');

    const item = component.screenshots[0];
    expect(component.getImagePath(item)).toBe('screenshots/01-connections-home.png');
  });
});
