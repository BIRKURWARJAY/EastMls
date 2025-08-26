import PropertyInterface from "./property.interface";

export default interface userInterface {
  username: string;
  _id: string;
  email: string;
  role: string;
  profileImage: string;
  contact?: number | string;
  licenseNumber: string;
  properties: string[] | PropertyInterface<string[]>[];
  property?: number;
}
