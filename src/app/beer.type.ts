type Value = {
  value: number;
  unit: string;
};

export type Beer = {
  id: string;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Value;
  boil_volume: Value;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  method: {
    twist: string;
    fermentation: { temp: Value };
    mash_temp: {
      temp: Value;
      duration: number;
    }[];
  };
  ingredients: {
    yeast: string;
    malt: { name: string; amount: Value }[];
    hops: { name: string; amount: Value; add: string; attribute: string }[];
  };
};

export type QueryParams = {
  page?: number;
  per_page?: number;
  beer_name?: string;
  brewed_after?: string;
  brewed_before?: string;
};
