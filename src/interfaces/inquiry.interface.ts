export default interface inquiryInterface  {
  name: string;
  _id: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  agentId?: string;
  userId?: string;
  status: string;
}