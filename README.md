# SQL Pulse — Marketing Website

Official marketing and product website for **SQL Pulse — Android SQL Database Studio** (`https://sql-pulse.nanzen.se/`), built with Angular 21, TypeScript, SCSS, and Vitest.

## Overview

The website showcases the technical architecture, security model, and feature set of SQL Pulse (`com.johnan.mysqlclient`), the production-grade Android MySQL, MariaDB & PostgreSQL client:

- **Pure-Kotlin Dual Wire Protocol Engines (`:sql-core`, `:mysql-core` v10, `:postgres-core` v3.0):** Zero-dependency pure-Kotlin implementations of MySQL Protocol v10 (`mysql_native_password`, `caching_sha2_password` RSA/AES) and PostgreSQL Wire Protocol v3.0 (`SCRAM-SHA-256`, `SCRAM-SHA-256-PLUS` channel binding, TLS+SNI, `startupOptions`, Simple/Extended Query streaming, out-of-band `CancelRequest`).
- **Interactive SQL Query Studio & Visual EXPLAIN:** Dialect-aware syntax highlighting, docked symbol toolbars, schema-aware autocomplete, query history, parameterized snippets, failed-transaction `ROLLBACK` recovery, out-of-band cancellation (`KILL QUERY` / `pg_cancel_backend`), and indented Visual EXPLAIN plan trees (`EXPLAIN FORMAT=JSON` & `EXPLAIN (FORMAT JSON)`).
- **2D Monospace Table Data Grid:** High-density virtualized 2D grid with sticky headers, pinned primary/identity key columns, read-only view/matview support, PostgreSQL keyless `ctid` single-row mutations, transactional inline editing, and type badges (`PK`, `ID`, `FK`, `NULL`, `JSON`, `JSONB`).
- **3-Tier Schema & DDL Inspector:** Navigate PostgreSQL `Database -> Schema -> Object` namespaces (including Materialized Views) and MySQL databases, inspect columns/indexes/foreign keys, view free interactive ER diagrams, and extract dialect-accurate `CREATE TABLE` DDL.
- **Real-Time Server Process Monitor:** Live MySQL `SHOW FULL PROCESSLIST` / `performance_schema` and PostgreSQL `pg_stat_activity` / `pg_stat_statements` / settings / roles telemetry with one-tap process cancellation or termination (`KILL`, `pg_cancel_backend`, `pg_terminate_backend`).
- **SSH Bastion Tunneling (`:ssh-core`):** Direct-tcpip port forwarding through 1- or 2-hop SSH bastion jump-hosts with hardware Keystore authentication and TOFU host key verification.
- **Hardware-Backed Keystore & Biometrics:** AES-256-GCM credential encryption at rest in the Android Keystore, gated by biometric authentication (fingerprint/face).
- **Pro Tier Capabilities:** Visual EXPLAIN execution trees, JSON & dialect SQL INSERT exports (CSV remains free), 2-hop SSH ProxyJump connections, AES-256-GCM encrypted backups, and biometric app lock.
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
