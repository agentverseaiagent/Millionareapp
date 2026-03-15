export interface VehicleMake {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface VehicleModel {
  id: string;
  make_id: string;
  name: string;
  slug: string;
  normalized_name: string;
  created_at: string;
  make?: Pick<VehicleMake, 'id' | 'name' | 'slug'>;
}

export interface VehicleAlias {
  id: string;
  vehicle_model_id: string;
  alias: string;
  created_at: string;
}

export interface VehicleSearchResult {
  id: string;
  name: string;
  slug: string;
  make_name: string;
  display_name: string; // e.g. "Honda CR-V"
}
