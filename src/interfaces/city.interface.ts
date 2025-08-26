import countryInterface from "./country.interface";

export default interface cityInterface {
  cityCode: number;
  _id: string;
  country: string | countryInterface;
  cityName: string;
  state: string;
}