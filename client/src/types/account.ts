export type User = {
  id: string;
  company: Company;
  companyId: string;
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  location?: string;
  access?: string;
};

export type Company = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  teams?: [];
  users?: [User];
  transactions?: [];
};
