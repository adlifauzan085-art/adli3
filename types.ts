
export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: number;
  stops: number;
  status?: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First';
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  price: string;
}
