import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      title: 'Home - SQL Pulse Database Studio',
      description:
        'Material 3 Android MySQL, MariaDB & PostgreSQL database client with interactive Query Studio, visual EXPLAIN, 2D data grid, 3-tier schema inspector, and SSH bastion tunneling.',
    },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features').then((m) => m.Features),
    data: {
      title: 'Features - SQL Pulse Database Studio',
      description:
        'Explore the pure-Kotlin MySQL/MariaDB v10 and PostgreSQL v3.0 wire protocol engines, visual EXPLAIN, 2D table grid, 3-tier schema explorer, and server process monitoring.',
    },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    data: {
      title: 'Privacy Policy - SQL Pulse Database Studio',
      description:
        'Read the SQL Pulse privacy policy detailing on-device credential encryption and zero-middleman direct architecture.',
    },
  },
  {
    path: 'security',
    loadComponent: () => import('./pages/security/security').then((m) => m.Security),
    data: {
      title: 'Security - SQL Pulse Database Studio',
      description:
        'Learn about SQL Pulse hardware-backed Keystore encryption, SSH bastion tunneling, and destructive query safeguards.',
    },
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms),
    data: {
      title: 'Terms of Service - SQL Pulse Database Studio',
      description: 'Read the terms and conditions for using SQL Pulse Database Studio.',
    },
  },
  { path: '**', redirectTo: '' },
];
