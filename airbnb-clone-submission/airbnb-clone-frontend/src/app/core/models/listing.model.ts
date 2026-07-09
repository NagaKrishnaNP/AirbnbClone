export interface Photo {
  id: string;
  url: string;
  room: string;
  caption: string;
  order: number;
  hero: boolean;
}

export interface CoHost {
  name: string;
  avatarUrl: string;
}

export interface Host {
  id: string;
  name: string;
  avatarUrl: string;
  superhost: boolean;
  yearsHosting: number;
  responseRatePercent: number;
  responseTime: string;
  hostRating: number;
  hostReviewCount: number;
  bornDecade: string;
  school: string;
  coHosts: CoHost[];
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  date: string;
  rating: number;
  comment: string;
}

export interface RoomSummary {
  name: string;
  subtitle: string;
  imageUrl: string;
}

export interface AmenityItem {
  label: string;
  category: string;
  available: boolean;
}

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  starDistribution: number[];
}

export interface ReviewTag {
  emoji: string;
  label: string;
  count: number;
}

export interface NearbyListing {
  title: string;
  price: number;
  currency: string;
  rating: number;
  imageUrl: string;
}

export interface Listing {
  id: string;
  title: string;
  propertyType: string;
  city: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  rare: boolean;
  pricePerNight: number;
  currency: string;
  totalPrice: number;
  nights: number;
  checkInDate: string;
  checkOutDate: string;
  cancellationDeadline: string;
  defaultGuestSelection: number;
  discountPercent: number;
  description: string;
  neighbourhoodHighlights: string;
  sleepingArrangements: RoomSummary[];
  amenityItems: AmenityItem[];
  ratingBreakdown: RatingBreakdown;
  reviewTags: ReviewTag[];
  houseRules: string[];
  safetyItems: string[];
  cancellationPolicy: string;
  host: Host;
  photos: Photo[];
  reviews: Review[];
  nearbyListings: NearbyListing[];
}
