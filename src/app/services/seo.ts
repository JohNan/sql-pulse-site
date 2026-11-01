import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'SQL Pulse — Android SQL Database Studio';
        const description =
          data['description'] ||
          'Material 3 Android SQL database client and management studio with interactive Query Studio, visual EXPLAIN, 2D data grid, schema inspector, and SSH bastion tunneling.';

        this.titleService.setTitle(title);

        this.metaService.updateTag({ name: 'description', content: description });

        // Basic Open Graph tags
        this.metaService.updateTag({ property: 'og:title', content: title });
        this.metaService.updateTag({ property: 'og:description', content: description });
      });
  }
}
