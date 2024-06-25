import React, {useState} from 'react';
import VectorMap from "./VectorMap";
import {Tooltip} from "recharts";

const Map = () => {
    const [tooltipText, setTooltipText] = useState('')
    
    const handleTooltip = (name) => {
        setTooltipText(name)
    }
    return (
        <div>
            <VectorMap handleTooltip={handleTooltip}/>
            <Tooltip>{tooltipText}</Tooltip>
        </div>
    );
};

export default Map;