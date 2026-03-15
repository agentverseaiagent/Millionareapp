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
  is_active: boolean;
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
  id: string;         // model id (or make id when is_make_result)
  name: string;
  slug: string;
  make_name: string;
  make_id: string;
  display_name: string; // e.g. "Honda CR-V"
  is_discontinued?: boolean;
  is_make_result?: boolean; // true = make-level result, not a specific model
}

export interface VehicleTrim {
  id: string;
  model_id: string;
  name: string;
  normalized_name: string;
  source: string;
  is_active: boolean;
  created_at: string;
}
