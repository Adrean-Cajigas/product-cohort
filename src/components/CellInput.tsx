'use client';
import { useState } from 'react';

export default function CellInput({ defaultValue }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue || "Error");
    return (
        <div>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-transparent py-4 w-full"
            />
        </div>
    );
};