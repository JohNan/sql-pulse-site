import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/button/button';
import { FeatureCard } from '../../components/feature-card/feature-card';
import { ScreenshotShowcase } from '../../components/screenshot-showcase/screenshot-showcase';
import { QueryStudioPreview } from '../../components/query-studio-preview/query-studio-preview';

/**
 * Main landing page component containing hero, feature grid, screenshot showcase, and interactive query studio preview.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, FeatureCard, ScreenshotShowcase, QueryStudioPreview],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
