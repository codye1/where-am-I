type BoundingBox = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

// Broad land-mass coverage where Street View commonly exists.
const COVERAGE_BOXES: BoundingBox[] = [
  // North America
  { minLat: 24, maxLat: 49.5, minLng: -125, maxLng: -66 },
  { minLat: 49, maxLat: 70, minLng: -140, maxLng: -50 },
  { minLat: 7, maxLat: 33, minLng: -118, maxLng: -86 },
  // South America
  { minLat: -55, maxLat: 12, minLng: -82, maxLng: -34 },
  // Europe
  { minLat: 35, maxLat: 71, minLng: -10, maxLng: 40 },
  // UK & Ireland (tighter box for higher hit rate)
  { minLat: 49.5, maxLat: 59.5, minLng: -11, maxLng: 2 },
  // Japan & South Korea
  { minLat: 30, maxLat: 46, minLng: 129, maxLng: 146 },
  { minLat: 33, maxLat: 39, minLng: 124, maxLng: 130 },
  // Australia & New Zealand
  { minLat: -44, maxLat: -10, minLng: 112, maxLng: 154 },
  { minLat: -47, maxLat: -34, minLng: 166, maxLng: 179 },
];

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomCoords = () => {
  const box = COVERAGE_BOXES[Math.floor(Math.random() * COVERAGE_BOXES.length)];
  const lat = randomBetween(box.minLat, box.maxLat);
  const lng = randomBetween(box.minLng, box.maxLng);
  return { lat, lng };
};

export default randomCoords;
