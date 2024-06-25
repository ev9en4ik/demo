import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 p-2 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-md text-[#8884D8FF]">Population in <br/>{label}</p>
                {payload.map((item, index) => (
                    <p
                        key={index}
                        style={{
                            color: colors[index % colors.length]
                        }}
                        className='text-sm'>
                        {item.name}:
                        {item.value}
                    </p>)
                )}
            </div>
        );
    }
    
    return null;
}

export default CustomTooltip;