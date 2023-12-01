//--------------------------------------------------------------------------------------

export interface PlaceCoordinates {
  pick_lat: number;
  pick_lng: number;
  drop_lat: number;
  drop_lng: number;
  ride_type: number;
  date_depart?: string;
  heure_depart?: string;
  fromAdress?: string;
  toAdress?: string;
  fromPicture?: string;
  toPicture?: string;
  fromName?: string;
  toName?: string;
}

export interface PlaceSearchResult {
  address: string;
  location?: PlaceCoordinates; // Le '?' signifie que cette propriété est facultative
  // Ajoutez d'autres propriétés nécessaires
}

export interface VehicleInfo {
  vehicleId: string;
  vehiclePrice: number;
  passengerMaxPlace: number;
  passengerMaxBags: number;
  name: string;
  description: string;
  shortDescription: string;
}

export interface CommandeDateInfo {
  waitingTime: number;
  // Ajoutez d'autres propriétés si nécessaire
}

export interface ItineraireInfo {
  distanceInKm: number;
  distanceInMiles: number;
  duration: number;
}

export interface TransportApiResponse {
  data: VehicleInfo[];
  // Ajoutez d'autres propriétés si nécessaire
}

export interface FormDataToSend {
  vehicleTypeId: string;
  vehicleType: string;
  description: string;
  shortDescription: string;
  vehiclePrice: number;
  name: number;
  passengerCapacity: number;
  bagsCapacity: number;
  // Ajoutez d'autres propriétés si nécessaire
}
