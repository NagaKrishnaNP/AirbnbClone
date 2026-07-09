import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Listing, Photo, Review } from '../models/listing.model';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getListing(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}/listings/${id}`);
  }

  getPhotos(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/listings/${id}/photos`);
  }

  getHeroPhotos(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}/listings/${id}/photos/hero`);
  }

  getReviews(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/listings/${id}/reviews`);
  }
}
