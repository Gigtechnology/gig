import { GOOGLE_PLACES_API_KEY, PLACE_ID } from 'astro:env/server';
import demo from '../data/reviews-demo.json';

export interface Review {
  author: string;
  photo?: string;
  rating: number;
  date: string; // ISO
  relative?: string;
  text: string;
  url?: string;
}

export interface ReviewsData {
  source: 'google' | 'demo';
  rating: number;
  total: number;
  url?: string;
  reviews: Review[];
}

const demoData = (): ReviewsData => ({
  source: 'demo',
  rating: demo.rating,
  total: demo.total,
  reviews: demo.reviews,
});

let cache: Promise<ReviewsData> | null = null;

/**
 * Google reviews via Places API (New) — fetched at build time (pages are prerendered).
 * Falls back to demo reviews when GOOGLE_PLACES_API_KEY / PLACE_ID are missing or the call fails.
 * Note: the Places API returns at most 5 reviews (Google's choice of "most relevant").
 */
export function getReviews(): Promise<ReviewsData> {
  cache ??= load();
  return cache;
}

async function load(): Promise<ReviewsData> {
  if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) return demoData();
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const reviews: Review[] = (data.reviews ?? [])
      .filter((r: any) => r?.text?.text || r?.originalText?.text)
      .map((r: any) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        photo: r.authorAttribution?.photoUri,
        url: r.authorAttribution?.uri,
        rating: r.rating ?? 5,
        date: r.publishTime ?? '',
        relative: r.relativePublishTimeDescription,
        text: r.text?.text ?? r.originalText?.text ?? '',
      }));
    if (!reviews.length) return { ...demoData(), rating: data.rating ?? demo.rating, total: data.userRatingCount ?? 0, url: data.googleMapsUri };
    return {
      source: 'google',
      rating: data.rating ?? 5,
      total: data.userRatingCount ?? reviews.length,
      url: data.googleMapsUri,
      reviews,
    };
  } catch (err) {
    console.warn('[reviews] Falling back to demo reviews:', (err as Error).message);
    return demoData();
  }
}
