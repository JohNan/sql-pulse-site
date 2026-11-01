import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenshotShowcase } from './screenshot-showcase';
import { ThemeService } from '../../services/theme';

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

  it('should have all 7 categories and 8 screenshots initially', () => {
    expect(component.categories.length).toBe(7);
    expect(component.screenshots.length).toBe(8);
    expect(component.filteredScreenshots.length).toBe(8);
  });

  it('should filter screenshots by category', () => {
    component.setCategory('connections');
    expect(component.filteredScreenshots.length).toBe(2);
    expect(component.filteredScreenshots.every(s => s.category === 'connections')).toBe(true);

    component.setCategory('schema');
    expect(component.filteredScreenshots.length).toBe(2);
    expect(component.filteredScreenshots.every(s => s.category === 'schema')).toBe(true);
    expect(component.filteredScreenshots.map(s => s.id)).toEqual(['schema-columns', 'schema-ddl']);

    component.setCategory('datagrid');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('table-data-grid');

    component.setCategory('querystudio');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('sql-query-studio');

    component.setCategory('monitor');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('server-process-monitor');

    component.setCategory('security');
    expect(component.filteredScreenshots.length).toBe(1);
    expect(component.filteredScreenshots[0].id).toBe('settings-security');

    component.setCategory('all');
    expect(component.filteredScreenshots.length).toBe(8);
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
    expect(component.getImagePath(item)).toBe('screenshots/connections_home_dark.png');

    component.setThemeMode('light');
    expect(component.getImagePath(item)).toBe('screenshots/connections_home_light.png');
  });

  it('should automatically update effectiveTheme in auto mode when ThemeService changes', () => {
    const themeService = TestBed.inject(ThemeService);
    component.setThemeMode('auto');
    expect(component.activeThemeMode).toBe('auto');

    themeService.isDarkMode.set(true);
    fixture.detectChanges();
    expect(component.effectiveTheme).toBe('dark');
    const item = component.screenshots[0];
    expect(component.getImagePath(item)).toBe('screenshots/connections_home_dark.png');

    themeService.isDarkMode.set(false);
    fixture.detectChanges();
    expect(component.effectiveTheme).toBe('light');
    expect(component.getImagePath(item)).toBe('screenshots/connections_home_light.png');
  });
});
