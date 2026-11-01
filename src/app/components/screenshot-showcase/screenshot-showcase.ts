import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';

/**
 * Represents a single screenshot item in the showcase gallery.
 */
interface ScreenshotItem {
  id: string;
  title: string;
  category: 'connections' | 'schema' | 'datagrid' | 'querystudio' | 'monitor' | 'security';
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
  public themeService = inject(ThemeService);

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

  constructor() {
    effect(() => {
      const isDark = this.themeService.isDarkMode();
      if (this.activeThemeMode === 'auto') {
        this.effectiveTheme = isDark ? 'dark' : 'light';
      }
    });
  }

  categories = [
    { id: 'all', label: 'All Views' },
    { id: 'connections', label: 'Connections & SSH' },
    { id: 'schema', label: 'Schema & DDL' },
    { id: 'datagrid', label: '2D Data Grid' },
    { id: 'querystudio', label: 'Query Studio & EXPLAIN' },
    { id: 'monitor', label: 'Server Monitor' },
    { id: 'security', label: 'Security & Settings' },
  ];

  screenshots: ScreenshotItem[] = [
    {
      id: 'connections-home',
      title: 'Multi-Host Connections & SSH Status',
      category: 'connections',
      badge: 'Cluster Hub',
      lightImage: 'screenshots/connections_home_light.png',
      darkImage: 'screenshots/connections_home_dark.png',
      description:
        'Manage MySQL & MariaDB clusters with live SSH bastion tunnel indicators, SSL status badges, and active session controls.',
    },
    {
      id: 'connection-ssh-config',
      title: 'SSH Bastion & Handshake Diagnostics',
      category: 'connections',
      badge: 'Zero-Trust Tunnel',
      lightImage: 'screenshots/connection_ssh_config_light.png',
      darkImage: 'screenshots/connection_ssh_config_dark.png',
      description:
        'Configure multi-hop SSH port forwarding, hardware-backed Keystore keys, and step-by-step connection handshake diagnostics.',
    },
    {
      id: 'schema-columns',
      title: 'Visual Schema & Column Inspector',
      category: 'schema',
      badge: 'Schema Explorer',
      lightImage: 'screenshots/schema_columns_light.png',
      darkImage: 'screenshots/schema_columns_dark.png',
      description:
        'Browse databases, tables, views, routines, triggers, primary keys, auto-increment badges, and column data types.',
    },
    {
      id: 'schema-ddl',
      title: 'Live SHOW CREATE TABLE DDL Viewer',
      category: 'schema',
      badge: 'DDL Script',
      lightImage: 'screenshots/schema_ddl_light.png',
      darkImage: 'screenshots/schema_ddl_dark.png',
      description:
        'Inspect and copy complete CREATE TABLE DDL definitions, BTREE index cardinalities, and foreign key constraints.',
    },
    {
      id: 'table-data-grid',
      title: '2D Table Data Grid & Staged CRUD',
      category: 'datagrid',
      badge: 'Data Grid',
      lightImage: 'screenshots/table_data_grid_light.png',
      darkImage: 'screenshots/table_data_grid_dark.png',
      description:
        'Filter rows with WHERE clauses, inspect NULL and JSON pills, and stage transactional row mutations before committing.',
    },
    {
      id: 'sql-query-studio',
      title: 'Interactive SQL Query Studio & EXPLAIN',
      category: 'querystudio',
      badge: 'Query Studio',
      lightImage: 'screenshots/query_studio_explain_light.png',
      darkImage: 'screenshots/query_studio_explain_dark.png',
      description:
        'Author queries with real-time SQL syntax highlighting, docked SQL symbol bar, and visual EXPLAIN execution plan warnings.',
    },
    {
      id: 'server-process-monitor',
      title: 'Real-Time Server Process Monitor',
      category: 'monitor',
      badge: 'Live Telemetry',
      lightImage: 'screenshots/server_process_monitor_light.png',
      darkImage: 'screenshots/server_process_monitor_dark.png',
      description:
        'Monitor live QPS sparklines, InnoDB buffer pool hit ratio, active threads, and terminate slow queries.',
    },
    {
      id: 'settings-security',
      title: 'Security, Biometrics & Encrypted Backups',
      category: 'security',
      badge: 'Settings & Pro',
      lightImage: 'screenshots/settings_light.png',
      darkImage: 'screenshots/settings_dark.png',
      description:
        'Configure theme modes, biometric app locking, destructive query confirmation guards, and AES-256-GCM encrypted backups.',
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
    const theme =
      this.activeThemeMode === 'auto'
        ? (this.themeService.isDarkMode() ? 'dark' : 'light')
        : this.effectiveTheme;
    return theme === 'dark' ? item.darkImage : item.lightImage;
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
