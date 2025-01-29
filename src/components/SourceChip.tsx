'use client';
import { useState } from 'react';
import { SOURCE } from "../utils/types"
import ChipDropdown from './ChipDropdown';

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

const SourceStatus = ({ source }: { source: SOURCE }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-lg ${sourceBackgroundColors[source]} ${sourceTextColors[source]}`}>
        {/* {isOpen && (
          <ChipDropdown />
        )} */}
        <div
          className={`h-2 w-2 rounded-full ${sourceStatusDotColors[source]}`}
        />
        <span className={`ml-2 ${sourceTextColors[source]}`}>
          {sourceLabels[source]}
        </span>
      </button>
    </div>
  )
}

export default SourceStatus;
