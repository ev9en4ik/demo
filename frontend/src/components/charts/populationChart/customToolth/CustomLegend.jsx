import React from 'react';

const CustomLegend = ({payload}) => {
    return (
        <ul style={{listStyleType: 'none', margin: 0, padding: 0}}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{color: entry.color}}>
                    {entry.name}
                </li>
            ))}
        </ul>
    );
};

export default CustomLegend;