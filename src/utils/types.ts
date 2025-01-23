export type BillingAddress = {
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type CustomerData = {
  source: SOURCE
  destination: DESTINATION
  formula: string
  customerName: string
  customerID: string
  opportunityName: string
  type: string
  opportunityOwner: string
  billingEmails: string[]
  billingAddress: BillingAddress
  paymentFrequency: PAYMENTFREQUENCY
  netTerms: NETTERMS
  products: ProductFeatures[]
}
export type ProductFeatures = {
  productName: string,
  details: details
}

export type details = {
  salesPrice: number,
  startDate: string,
  endDate: string,
}

export const enum SOURCE {
  SALESFORCE = 'SALESFORCE',
  CRM = 'CRM',
  MANUAL = 'MANUAL',
}

export const enum DESTINATION {
  STRIPE = 'STRIPE',
  QUICKBOOKS = 'QUICKBOOKS',
  NETSUITE = 'NETSUITE',
}

export const enum PAYMENTFREQUENCY {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY',
}

export const enum NETTERMS {
  NET_30 = 'Net_30',
  NET_60 = 'Net_60',
  NET_90 = 'Net_90',
}
