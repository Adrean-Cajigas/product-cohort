'use client';
import { useState } from 'react';
import { DESTINATION } from "../utils/types"
import ChipDropdown from './ChipDropdown';
import Chip from "./Chip"

const DestinationStatus = ({ defaultDestination }: { defaultDestination: DESTINATION }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [destination, setDestination] = useState(defaultDestination)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleDropdown}>
        <Chip 
          type="destination"
          content={destination} 
        />
        {isOpen && (
          <ChipDropdown type="destination" value={destination} setValue={setDestination} />
        )}
      </button>
    </div>
  )
}

export default DestinationStatus;
