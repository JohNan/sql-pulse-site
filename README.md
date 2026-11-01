# SQL Pulse — Marketing Website

Official marketing and product website for **SQL Pulse — Android SQL Database Studio** (`https://sql-pulse.nanzen.se/`), built with Angular 21, TypeScript, SCSS, and Vitest.

## Overview

The website showcases the technical architecture, security model, and feature set of SQL Pulse (`com.johnan.mysqlclient`), the production-grade Android MySQL & MariaDB client:

- **Pure-Kotlin Wire Protocol v10 Engine (`:mysql-core`):** Zero-dependency pure-Kotlin implementation of MySQL Protocol 10 with fast authentication (`mysql_native_password`, `caching_sha2_password` RSA/AES), binary/text row parsing, and coroutine-driven direct socket I/O.
- **Interactive SQL Query Studio & Visual EXPLAIN:** Full-featured SQL workspace with syntax highlighting, docked symbol toolbar, query history, parameterized snippets, out-of-band query cancellation (`KILL QUERY`), and visual execution plan cost trees (`EXPLAIN FORMAT=JSON`).
- **2D Monospace Table Data Grid:** High-density virtualized 2D grid with sticky headers, pinned primary key columns, transactional inline cell editing, and type badges (`PK`, `FK`, `NULL`, `JSON`).
- **Visual Schema & DDL Inspector:** Relational database tree inspection, column data types, index statistics, foreign key relationships, and one-tap `SHOW CREATE TABLE` DDL extraction.
- **Real-Time Server Process Monitor:** Live server thread inspection (`SHOW FULL PROCESSLIST`), thread status indicators, execution timers, and one-tap administrative thread termination (`KILL <id>`).
- **SSH Bastion Tunneling (`:ssh-core`):** Direct-tcpip port forwarding through SSH bastion jump-hosts with hardware Keystore authentication and TOFU host key verification.
- **Hardware-Backed Keystore & Biometrics:** AES-256-GCM credential encryption at rest in the Android Keystore, gated by biometric authentication (fingerprint/face).
- **Pro Tier Capabilities:** Visual EXPLAIN execution trees, transactional table grid editing, multi-hop SSH bastion connections, encrypted AES-256-GCM backups, and biometric locks.
- **Cross-Site Ecosystem:** Seamless cross-promotion with Nanzen's companion utility, [Android SSH Client](https://ssh-client.nanzen.se/).

## Tech Stack

- **Framework:** Angular 21 (Standalone Components, Signals)
- **Styling:** SCSS, CSS Variables, Material Icons, Material 3 Design System
- **Testing:** Vitest
- **Toolchain:** Node.js 20+ & npm

## Development Workflow

### Install Dependencies

```bash
npm install
```

### Start Local Development Server

```bash
npm run start
```

Navigate to `http://localhost:4200/`.

### Run Unit Tests

```bash
npm run test -- --watch=false
```

### Build for Production

```bash
npm run build
```

The optimized production artifacts will be compiled into the `dist/sql-pulse-marketing-site/browser/` directory.
