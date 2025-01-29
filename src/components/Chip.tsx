import React from 'react';
import { SOURCE } from "../utils/types"
import { DESTINATION } from "../utils/types"
import { PAYMENTFREQUENCY } from "../utils/types"

interface ChipProps {
  type: 'source' | 'destination' | 'frequency';
  content: string;
}

const sourceBackgroundColors = {
  [SOURCE.SALESFORCE]: 'bg-blue-200',
  [SOURCE.CRM]: 'bg-green-200',
  [SOURCE.MANUAL]: 'bg-yellow-200',
}

const sourceTextColors = {
  [SOURCE.SALESFORCE]: 'text-blue-900',
  [SOURCE.CRM]: 'text-green-900',
  [SOURCE.MANUAL]: 'text-yellow-900',
}

const sourceStatusDotColors = {
  [SOURCE.SALESFORCE]: 'bg-blue-400',
  [SOURCE.CRM]: 'bg-green-400',
  [SOURCE.MANUAL]: 'bg-yellow-400',
}

const sourceLabels = {
  [SOURCE.SALESFORCE]: 'Salesforce',
  [SOURCE.CRM]: 'CRM',
  [SOURCE.MANUAL]: 'Manual',
}

const destinationBackgroundColors = {
  [DESTINATION.STRIPE]: 'bg-orange-100',
  [DESTINATION.NETSUITE]: 'bg-violet-100',
  [DESTINATION.QUICKBOOKS]: 'bg-rose-100',
}

const destinationTextColors = {
  [DESTINATION.STRIPE]: 'text-orange-800',
  [DESTINATION.NETSUITE]: 'text-violet-800',
  [DESTINATION.QUICKBOOKS]: 'text-rose-800',
}

const destinationStatusDotColors = {
  [DESTINATION.STRIPE]: 'bg-orange-400',
  [DESTINATION.NETSUITE]: 'bg-violet-400',
  [DESTINATION.QUICKBOOKS]: 'bg-rose-400',
}

const destinationLabels = {
  [DESTINATION.STRIPE]: 'Stripe',
  [DESTINATION.NETSUITE]: 'NetSuite',
  [DESTINATION.QUICKBOOKS]: 'QuickBooks',
}

const paymentFrequencyBackgroundColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'bg-blue-200',
  [PAYMENTFREQUENCY.QUARTERLY]: 'bg-green-200',
  [PAYMENTFREQUENCY.ANNUALLY]: 'bg-yellow-200',
}

const paymentFrequencyTextColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'text-blue-900',
  [PAYMENTFREQUENCY.QUARTERLY]: 'text-green-900',
  [PAYMENTFREQUENCY.ANNUALLY]: 'text-yellow-900',
}

const paymentFrequencyDotColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'bg-blue-400',
  [PAYMENTFREQUENCY.QUARTERLY]: 'bg-green-400',
  [PAYMENTFREQUENCY.ANNUALLY]: 'bg-yellow-400',
}

const paymentFrequencyLabels= {
  [PAYMENTFREQUENCY.MONTHLY]: 'Monthly',
  [PAYMENTFREQUENCY.QUARTERLY]: 'Quarterly',
  [PAYMENTFREQUENCY.ANNUALLY]: 'Annually',
}

export default function Chip({ type, content }: ChipProps) {
    let bgColor, textColor, dotColor, label;

    switch(type) {
        case 'source':
            bgColor = sourceBackgroundColors[content as keyof typeof sourceBackgroundColors];
            textColor = sourceTextColors[content as keyof typeof sourceTextColors];
            dotColor = sourceStatusDotColors[content as keyof typeof sourceStatusDotColors];
            label = sourceLabels[content as keyof typeof sourceLabels];
            break;
        
          case 'destination':
            bgColor = destinationBackgroundColors[content as keyof typeof destinationBackgroundColors];
            textColor = destinationTextColors[content as keyof typeof destinationTextColors];
            dotColor = destinationStatusDotColors[content as keyof typeof destinationStatusDotColors];
            label = destinationLabels[content as keyof typeof destinationLabels];
            break;
        
          case 'frequency':
            bgColor = paymentFrequencyBackgroundColors[content as keyof typeof paymentFrequencyBackgroundColors];
            textColor = paymentFrequencyTextColors[content as keyof typeof paymentFrequencyTextColors];
            dotColor = paymentFrequencyDotColors[content as keyof typeof paymentFrequencyDotColors];
            label = paymentFrequencyLabels[content as keyof typeof paymentFrequencyLabels];
            break;
        
          default:
            bgColor = 'bg-slate-200';
            textColor = 'text-slate-900';
            dotColor = 'bg-slate-400'; 
            label = 'Error';
            break;
    }

    return (
        <div className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-lg ${bgColor} ${textColor}`}>
          <div
            className={`h-2 w-2 rounded-full ${dotColor}`}
          />
          <span className={`ml-2 ${textColor}`}>
            {label}
          </span>
        </div>
      )
}