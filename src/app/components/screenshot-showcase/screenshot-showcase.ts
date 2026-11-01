import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';

/**
 * Represents a single screenshot item in the showcase gallery.
 */
interface ScreenshotItem {
  id: string;
  title: string;
  category: 'connections' | 'schema' | 'datagrid' | 'querystudio' | 'monitor';
  description: string;
  lightImage: string;
  darkImage: string;
  badge?: string;
}

/**
 * Component for displaying a gallery of app screenshots.
 * Incorporates performance optimizations such as explicit image dimensions
 * to prevent Cumulative Layout Shift (CLS) and image lazy loading.
 */
@Component({
  selector: 'app-screenshot-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screenshot-showcase.html',
  styleUrl: './screenshot-showcase.scss',
})
export class ScreenshotShowcase implements OnInit {
  private themeService = inject(ThemeService);

  /** The initial category to filter by on load. */
  @Input() initialCategory = 'all';

  /** The currently selected theme mode (light, dark, or auto). */
  activeThemeMode: 'light' | 'dark' | 'auto' = 'auto';

  /** The actual theme applied based on the selected mode. */
  effectiveTheme: 'light' | 'dark' = 'dark';

  /** The currently selected category for filtering screenshots. */
  selectedCategory = 'all';

  /** The screenshot currently being viewed in the fullscreen modal lightbox, if any. */
  activeModalItem: ScreenshotItem | null = null;

  categories = [
    { id: 'all', label: 'All Views' },
    { id: 'connections', label: 'Connections & SSH' },
    { id: 'schema', label: 'Schema & DDL' },
    { id: 'datagrid', label: '2D Data Grid' },
    { id: 'querystudio', label: 'Query Studio & EXPLAIN' },
    { id: 'monitor', label: 'Server Monitor' },
  ];

  screenshots: ScreenshotItem[] = [
    {
      id: 'connections-home',
      title: 'Multi-Host Connections & SSH Status',
      category: 'connections',
      badge: 'Cluster Hub',
      lightImage: 'screenshots/01-connections-home.png',
      darkImage: 'screenshots/01-connections-home.png',
      description:
        'Manage MySQL & MariaDB clusters with live SSH bastion tunnel indicators, SSL status badges, and round-trip latency telemetry.',
    },
    {
      id: 'connection-ssh-config',
      title: 'SSH Bastion & Hardware Keystore Auth',
      category: 'connections',
      badge: 'Zero-Trust Tunnel',
      lightImage: 'screenshots/02-connection-ssh-config.png',
      darkImage: 'screenshots/02-connection-ssh-config.png',
      description:
        'Configure direct-tcpip SSH port forwarding, multi-hop jump hosts, TOFU host verification, and Android Keystore AES-256-GCM credentials.',
    },
    {
      id: 'schema-ddl-inspector',
      title: 'Visual Schema & DDL Inspector',
      category: 'schema',
      badge: 'Schema Explorer',
      lightImage: 'screenshots/03-schema-ddl-inspector.png',
      darkImage: 'screenshots/03-schema-ddl-inspector.png',
      description:
        'Browse databases, tables, views, procedures, triggers, column types, indexes, foreign keys, and live SHOW CREATE TABLE DDL.',
    },
    {
      id: 'table-data-grid',
      title: '2D Table Data Grid & Row CRUD',
      category: 'datagrid',
      badge: 'Data Grid',
      lightImage: 'screenshots/04-table-data-grid-editor.png',
      darkImage: 'screenshots/04-table-data-grid-editor.png',
      description:
        'Inspect and mutate table rows in a tabular monospace grid with PK/FK badges, column sorting, pagination, and transactional UPDATE generation.',
    },
    {
      id: 'sql-query-studio',
      title: 'Interactive SQL Query Studio & EXPLAIN',
      category: 'querystudio',
      badge: 'Query Studio',
      lightImage: 'screenshots/05-sql-query-studio-explain.png',
      darkImage: 'screenshots/05-sql-query-studio-explain.png',
      description:
        'Author queries with real-time SQL syntax highlighting, docked SQL symbol bar, parameterized snippets, and visual EXPLAIN execution plan trees.',
    },
    {
      id: 'server-process-monitor',
      title: 'Real-Time Server Process Monitor',
      category: 'monitor',
      badge: 'Live Telemetry',
      lightImage: 'screenshots/06-server-process-monitor.png',
      darkImage: 'screenshots/06-server-process-monitor.png',
      description:
        'Monitor active server threads (SHOW FULL PROCESSLIST), filter slow queries, inspect sparkline load, and execute one-tap KILL QUERY commands.',
    },
  ];

  /** Initializes the component and sets the effective theme if 'auto' is selected. */
  ngOnInit() {
    this.selectedCategory = this.initialCategory;
    if (this.activeThemeMode === 'auto') {
      this.effectiveTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    }
  }

  /**
   * Updates the theme mode and recalculates the effective theme.
   * @param mode The new theme mode to apply.
   */
  setThemeMode(mode: 'light' | 'dark' | 'auto') {
    this.activeThemeMode = mode;
    if (mode === 'auto') {
      this.effectiveTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    } else {
      this.effectiveTheme = mode;
    }
  }

  /**
   * Sets the current screenshot category for filtering.
   * @param catId The category ID to filter by.
   */
  setCategory(catId: string) {
    this.selectedCategory = catId;
  }

  /**
   * Returns the filtered list of screenshots based on the selected category.
   */
  get filteredScreenshots(): ScreenshotItem[] {
    if (this.selectedCategory === 'all') {
      return this.screenshots;
    }
    return this.screenshots.filter(s => s.category === this.selectedCategory);
  }

  /**
   * Resolves the correct image path based on the current effective theme.
   * @param item The screenshot item.
   */
  getImagePath(item: ScreenshotItem): string {
    return this.effectiveTheme === 'dark' ? item.darkImage : item.lightImage;
  }

  /**
   * Opens the fullscreen modal lightbox for the provided screenshot.
   * Disables background scrolling.
   * @param item The screenshot item to display.
   */
  openModal(item: ScreenshotItem) {
    this.activeModalItem = item;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Closes the fullscreen modal lightbox and restores background scrolling.
   */
  closeModal() {
    this.activeModalItem = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  /**
   * Navigates to the previous or next screenshot in the modal based on the filtered list.
   * @param direction -1 for previous, 1 for next.
   */
  navigateModal(direction: number) {
    if (!this.activeModalItem) return;
    const currentList = this.filteredScreenshots;
    const currentIndex = currentList.findIndex(s => s.id === this.activeModalItem?.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + direction + currentList.length) % currentList.length;
      this.activeModalItem = currentList[nextIndex];
    }
  }
}
