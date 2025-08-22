import cityInterface from "./city.interface";
import countryInterface from "./country.interface";
import locationInterface from "./location.interface";

export default interface PropertyInterface<T> {
  agentId?: string;
  _id: string;
  title: string;
  address: string;
  propertyDescription: string;
  status: string;
  propertyType: string;
  images: T;
  videos?: T;
  location: string | locationInterface;
  price: number;
  areaSqFt: number;
  landArea: number;
  yearOfBuild: number;
  postalCode: number;
  bathrooms: number;
  bedrooms: number;
  city: string | cityInterface;
  country: string | countryInterface;
  currency: string;
  leaseType: string;
  garage: number;
  garageSize: number;
  isPriceNegotiable: boolean;
  availableFrom: Date;
  verification: boolean;
  featured: boolean;
  features: string[];
}