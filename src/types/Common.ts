export interface Coordinates {
  lat: number;
  lng: number;
}

export type BaseSelectOption<V> = {
  label: string;
  value: V;
};

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export type PaginatedResponse<T, K extends string> = {
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
  page: number;
  pages: number;
  total: number;
} & Record<K, T[]>;
