import { Routes } from '@angular/router';
import { ListingPageComponent } from './features/listing-page/listing-page.component';

export const routes: Routes = [
  { path: '', component: ListingPageComponent },
  { path: '**', redirectTo: '' },
];
