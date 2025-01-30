'use client';
import { useState } from 'react';
import Chip from "./Chip"

interface ChipDropdownProps {
    type: 'source' | 'destination' | 'frequency';
    value: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
}

const sourceContent = ["SALESFORCE", "CRM", "MANUAL"]
const destinationContent = ["STRIPE", "NETSUITE", "QUICKBOOKS"]
const paymentContent = ["MONTHLY", "QUARTERLY", "ANNUALLY"]

export default function ChipDropdown({ type, value, setValue }: ChipDropdownProps) {
    const handleClick = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='absolute left-0 top-full bg-white m-1 py-2 px-4 z-10 rounded-lg'>
            {(type === "source") && (
                <div className='flex flex-col items-start'>
                    {sourceContent.map((item, _) => (
                        <button onClick={() => handleClick(item)} className='p-1'>
                            <Chip type="source" content={item} />
                        </button>
                    ))}
                </div>
            )}
            {(type === "destination") && (
                <div className='flex flex-col items-start'>
                    {destinationContent.map((item, _) => (
                        <button onClick={() => handleClick(item)} className='p-1'>
                            <Chip type="destination" content={item} />
                        </button>
                    ))}
                </div>
            )}
            {(type === "frequency") && (
                <div 
                    className='flex flex-col items-start'
                    key={type}
                >
                    {paymentContent.map((item, _) => (
                        <button onClick={() => handleClick(item)} className='p-1'>
                            <Chip type="frequency" content={item} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};