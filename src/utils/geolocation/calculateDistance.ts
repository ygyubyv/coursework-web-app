import { useI18n } from "vue-i18n";

const deg2rad = (deg: number): number => deg * (Math.PI / 180);

/**
 * Calculates the great-circle distance between two geographic points
 * using the Haversine formula.
 *
 * @param lat1 - Latitude of the first point in degrees.
 * @param lon1 - Longitude of the first point in degrees.
 * @param lat2 - Latitude of the second point in degrees.
 * @param lon2 - Longitude of the second point in degrees.
 * @returns The distance between the points in kilometers.
 *
 * @example
 * calculateDistance(50.4501, 30.5234, 49.8397, 24.0297) // ~472.5
 */

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Formats a distance in kilometers into a human-readable string.
 * Distances less than 1 km are converted to meters.
 *
 * @param distanceKm - The distance in kilometers.
 * @returns A localized string representing the distance, e.g. "850 m" or "3.2 km".
 *
 * @example
 * formatDistance(0.85) // "850 м" (in Ukrainian locale)
 * formatDistance(3.25) // "3.3 km" (in English locale)
 */

export const formatDistance = (distanceKm: number): string => {
  const { t } = useI18n();

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} ${t("metrics.m")}`;
  } else {
    return `${distanceKm.toFixed(1)} ${t("metrics.km")}`;
  }
};
