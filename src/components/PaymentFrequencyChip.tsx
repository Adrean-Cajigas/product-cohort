'use client';
import { useState } from 'react';
import { PAYMENTFREQUENCY } from "../utils/types"
import ChipDropdown from './ChipDropdown';
import Chip from "./Chip"

const PaymentFrequencyStatus = ({ defaultFreq }: { defaultFreq: PAYMENTFREQUENCY }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [frequency, setFrequency] = useState(defaultFreq)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleDropdown}>
        <Chip 
          type="frequency"
          content={frequency} 
        />
        {isOpen && (
          <ChipDropdown type="frequency" value={frequency} setValue={setFrequency} />
        )}
      </button>
    </div>
  )
}
export default PaymentFrequencyStatus;
