'use client';
import { useState } from 'react';
import { SOURCE } from "../utils/types"
import ChipDropdown from './ChipDropdown';
import Chip from "./Chip"

const SourceStatus = ({ defaultSource }: { defaultSource: SOURCE }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState(defaultSource)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button onClick={toggleDropdown}>
        <Chip 
          type="source"
          content={source} 
        />
        {isOpen && (
          <ChipDropdown type="source" value={source} setValue={setSource} />
        )}
      </button>
    </div>
  )
}

export default SourceStatus;
