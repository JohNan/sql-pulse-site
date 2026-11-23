import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StudioTheme {
  id: 'abyssal' | 'nord' | 'daylight';
  name: string;
  bg: string;
  surface: string;
  header: string;
  text: string;
  muted: string;
  accent: string;
  amber: string;
  emerald: string;
  border: string;
}

type InspectionMode = 'results' | 'explain' | 'ddl';
type StudioEngine = 'mysql' | 'postgresql';

@Component({
  selector: 'app-query-studio-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-studio-preview.html',
  styleUrl: './query-studio-preview.scss',
})
export class QueryStudioPreview implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private symbolTimeoutId?: ReturnType<typeof setTimeout>;
  engines: { id: StudioEngine; name: string; color: string }[] = [
    { id: 'mysql', name: 'MySQL v10', color: '#52D1FA' },
    { id: 'postgresql', name: 'PostgreSQL v3.0', color: '#818CF8' },
  ];
  themes: StudioTheme[] = [
    {
      id: 'abyssal',
      name: 'Abyssal Slate (Default)',
      bg: '#0A0C10',
      surface: '#121418',
      header: '#1E222A',
      text: '#E1E2E5',
      muted: '#C2C7D0',
      accent: '#52D1FA',
      amber: '#F29111',
      emerald: '#34D399',
      border: '#3A3F4A',
    },
    {
      id: 'nord',
      name: 'Nord Charcoal',
      bg: '#1B1E25',
      surface: '#2E3440',
      header: '#3B4252',
      text: '#ECEFF4',
      muted: '#D8DEE9',
      accent: '#88C0D0',
      amber: '#EBCB8B',
      emerald: '#A3BE8C',
      border: '#4C566A',
    },
    {
      id: 'daylight',
      name: 'Daylight Studio',
      bg: '#F4F7FA',
      surface: '#FFFFFF',
      header: '#EEF2F6',
      text: '#0F172A',
      muted: '#475569',
      accent: '#006884',
      amber: '#D97706',
      emerald: '#059669',
      border: '#CBD5E1',
    },
  ];

  activeThemeId: 'abyssal' | 'nord' | 'daylight' = 'abyssal';
  activeEngine: StudioEngine = 'mysql';
  activeTab: InspectionMode = 'results';

  sqlSymbols: string[] = ['SELECT', 'WHERE', 'JOIN', 'EXPLAIN', 'ORDER BY', 'LIMIT', '=', ';'];
  pgSqlSymbols: string[] = ['SELECT', 'WHERE', 'JOIN', 'ILIKE', '->>', '::', 'EXPLAIN', ';'];

  tableRows = [
    {
      id: '10842',
      email: 'elena.v@example.com',
      total_sek: '1,450.00',
      status: 'PAID',
      payload: '{"currency":"SEK","vat":25}',
    },
    {
      id: '10841',
      email: 'marcus.k@nordic.io',
      total_sek: '3,890.50',
      status: 'PAID',
      payload: '{"tier":"enterprise"}',
    },
    {
      id: '10839',
      email: 'dev@pulse-db.internal',
      total_sek: '820.00',
      status: 'PAID',
      payload: '{"promo":"SPRING26"}',
    },
    {
      id: '10835',
      email: 'sara.lind@gothenburg.se',
      total_sek: '2,110.00',
      status: 'PAID',
      payload: '{"notes":null}',
    },
  ];

  pgTableRows = [
    {
      event_id: '904218',
      source: 'checkout-ios',
      amount_sek: '1,450.00',
      status: 'COMMITTED',
      payload: '{"currency":"SEK","vat":25}',
    },
    {
      event_id: '904215',
      source: 'checkout-android',
      amount_sek: '3,890.50',
      status: 'COMMITTED',
      payload: '{"tier":"enterprise"}',
    },
    {
      event_id: '904209',
      source: 'billing-webhook',
      amount_sek: '820.00',
      status: 'COMMITTED',
      payload: '{"promo":"SPRING26"}',
    },
    {
      event_id: '904201',
      source: 'admin-portal',
      amount_sek: '2,110.00',
      status: 'COMMITTED',
      payload: '{"channel_binding":"tls"}',
    },
  ];

  lastInsertedSymbol = '';

  ngOnDestroy() {
    if (this.symbolTimeoutId) {
      clearTimeout(this.symbolTimeoutId);
    }
  }

  get currentTheme(): StudioTheme {
    return this.themes.find((t) => t.id === this.activeThemeId) || this.themes[0];
  }

  get currentSqlSymbols(): string[] {
    return this.activeEngine === 'postgresql' ? this.pgSqlSymbols : this.sqlSymbols;
  }

  setEngine(engine: StudioEngine) {
    this.activeEngine = engine;
    this.lastInsertedSymbol = '';
    this.cdr.markForCheck();
  }

  setTheme(themeId: 'abyssal' | 'nord' | 'daylight') {
    this.activeThemeId = themeId;
    this.cdr.markForCheck();
  }

  setTab(tab: InspectionMode) {
    this.activeTab = tab;
    this.cdr.markForCheck();
  }

  insertSymbol(symbol: string) {
    if (this.symbolTimeoutId) {
      clearTimeout(this.symbolTimeoutId);
    }
    this.lastInsertedSymbol = symbol;
    this.symbolTimeoutId = setTimeout(() => {
      if (this.lastInsertedSymbol === symbol) {
        this.lastInsertedSymbol = '';
      }
      this.symbolTimeoutId = undefined;
    }, 1200);
  }
}
