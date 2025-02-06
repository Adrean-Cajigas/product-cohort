'use client';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';

export default function CellInput({ defaultValue }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue || "Error");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`transition-all rounded-none ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
            <Input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="!bg-transparent w-full border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent"
            />
        </div>
    );
};