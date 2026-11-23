import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueryStudioPreview } from './query-studio-preview';

describe('QueryStudioPreview', () => {
  let component: QueryStudioPreview;
  let fixture: ComponentFixture<QueryStudioPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryStudioPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryStudioPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with abyssal theme and results tab', () => {
    expect(component.activeThemeId).toBe('abyssal');
    expect(component.currentTheme.name).toContain('Abyssal Slate');
    expect(component.activeTab).toBe('results');
  });

  it('should switch tabs between results, explain, and ddl via methods and clicks', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Initial results tab
    expect(component.activeTab).toBe('results');
    expect(compiled.querySelector('.results-content')).toBeTruthy();

    // Click explain tab
    const explainBtn = compiled.querySelector('#tab-explain') as HTMLButtonElement;
    explainBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('explain');
    expect(compiled.querySelector('.explain-content')).toBeTruthy();
    expect(compiled.textContent).toContain('Nested Loop Inner Join');
    expect(compiled.textContent).toContain('INDEX RANGE');

    // Click ddl tab
    const ddlBtn = compiled.querySelector('#tab-ddl') as HTMLButtonElement;
    ddlBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('ddl');
    expect(compiled.querySelector('.ddl-content')).toBeTruthy();
    expect(compiled.textContent).toContain('SHOW CREATE TABLE orders');
    expect(compiled.textContent).toContain('PRIMARY KEY (id)');

    // Click results tab
    const resultsBtn = compiled.querySelector('#tab-results') as HTMLButtonElement;
    resultsBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeTab).toBe('results');
    expect(compiled.querySelector('.results-content')).toBeTruthy();
  });

  it('should switch between all 3 studio themes', () => {
    component.setTheme('nord');
    expect(component.activeThemeId).toBe('nord');
    expect(component.currentTheme.bg).toBe('#1B1E25');
    expect(component.currentTheme.accent).toBe('#88C0D0');

    component.setTheme('daylight');
    expect(component.activeThemeId).toBe('daylight');
    expect(component.currentTheme.bg).toBe('#F4F7FA');
    expect(component.currentTheme.accent).toBe('#006884');

    component.setTheme('abyssal');
    expect(component.activeThemeId).toBe('abyssal');
    expect(component.currentTheme.bg).toBe('#0A0C10');
    expect(component.currentTheme.accent).toBe('#52D1FA');
  });

  it('should handle SQL symbol clicks', () => {
    expect(component.sqlSymbols).toContain('SELECT');
    expect(component.sqlSymbols).toContain('WHERE');
    expect(component.sqlSymbols).toContain('JOIN');
    expect(component.sqlSymbols).toContain('EXPLAIN');

    component.insertSymbol('WHERE');
    expect(component.lastInsertedSymbol).toBe('WHERE');
  });

  it('should render correct 2D result table columns and rows', () => {
    expect(component.tableRows.length).toBe(4);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.studio-grid thead th').length).toBe(6);
    expect(compiled.textContent).toContain('14 ms • 4 rows • Wire Protocol v10 • SSH Bastion: prod-db-01');
  });

  it('should switch between MySQL and PostgreSQL engine previews', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const engineButtons = compiled.querySelectorAll('[aria-label="Database Engine"] button');
    expect(engineButtons.length).toBe(2);

    (engineButtons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeEngine).toBe('postgresql');
    expect(compiled.textContent).toContain('analytics-pg-01 • postgres-core wire v3.0 • scram-sha-256-plus');
    expect(compiled.textContent).toContain('19 ms • 4 rows • Wire Protocol v3.0 • Schema: analytics');
    expect(component.currentSqlSymbols).toContain('ILIKE');
    expect(component.currentSqlSymbols).toContain('->>');
    expect(component.currentSqlSymbols).toContain('::');

    (compiled.querySelector('#tab-explain') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(compiled.textContent).toContain('Index Scan Backward');
    expect(compiled.textContent).toContain('EXPLAIN (FORMAT JSON)');

    (compiled.querySelector('#tab-ddl') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(compiled.textContent).toContain('"analytics"."events"');
    expect(compiled.textContent).toContain('GENERATED BY DEFAULT AS IDENTITY');

    (engineButtons[0] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.activeEngine).toBe('mysql');
    expect(compiled.textContent).toContain('SHOW CREATE TABLE orders');
  });
});
