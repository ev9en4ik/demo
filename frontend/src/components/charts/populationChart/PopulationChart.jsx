import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart, Brush,
    CartesianGrid, Label,
    Legend,
    Line,
    LineChart, ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import CustomTooltip from "./customToolth/CustomTooltip";

const PopulationChart = ({data, chartType}) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    
    return (
        <ResponsiveContainer className='-translate-x-10' width='80%' height={360}>
            {chartType === 'line' &&
                <LineChart
                data={data}>
                    <XAxis dataKey='year'/>
                    <YAxis width={100}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Brush dataKey="name" height={30} stroke="#991b1b" />
                    {data.length > 34 &&
                        <ReferenceLine x={2023} stroke="red">
                            <Label value="Predictions" fill="white" />
                        </ReferenceLine>
                    }
                    {typeof data[0] !== 'undefined' && data.length > 34 && Object.keys(data[0]).length >= 3 &&
                        <ReferenceLine x={2021} stroke="red">
                            <Label position="insideBottom" value="Previous predictions" fill="white" />
                        </ReferenceLine>
                    }
                    <Tooltip content={<CustomTooltip/>} />
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 3 &&
                        <Legend/>
                    }
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 2  && Object.keys(data[0])
                        .filter(value => value !== 'year')
                        .map((country, i) =>
                            <Line
                                key={i}
                                type="monotone"
                                dataKey={country}
                                stroke={colors[i % colors.length]}
                                activeDot={{r: 8}}
                            />)}
                </LineChart>
            }
            {chartType === 'column' &&
                <BarChart
                data={data}>
                    <XAxis dataKey='year'/>
                    <YAxis width={100}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Brush dataKey="name" height={30} stroke="#1e293b" />
                    <Tooltip content={<CustomTooltip/>} />
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 3 &&
                        <Legend/>
                    }
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 2  && Object.keys(data[0])
                        .filter(value => value !== 'year')
                        .map((country, i) =>
                            <Bar
                                key={i}
                                type="monotone"
                                dataKey={country}
                                stroke={colors[i % colors.length]}
                                fill={colors[i % colors.length]}
                                activeDot={{r: 8}}
                            />)}
                
                </BarChart>
            }
            {chartType === 'area' &&
                <AreaChart
                    data={data}>
                    <XAxis dataKey='year'/>
                    <YAxis width={100}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Brush dataKey="name" height={30} stroke="#1e293b" />
                    {data.length > 34 &&
                        <ReferenceLine x={2023} stroke="red">
                            <Label value="Predictions" fill="white" />
                        </ReferenceLine>
                    }
                    {typeof data[0] !== 'undefined' && data.length > 34 && Object.keys(data[0]).length >= 3 &&
                        <ReferenceLine x={2021} stroke="red">
                            <Label position="insideBottom" value="Previous predictions" fill="white" />
                        </ReferenceLine>
                    }
                    <Tooltip content={<CustomTooltip/>} />
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 3 &&
                        <Legend/>
                    }
                    {typeof data[0] !== 'undefined' && Object.keys(data[0]).length >= 2  && Object.keys(data[0])
                        .filter(value => value !== 'year')
                        .map((country, i) =>
                            <Area
                                key={i}
                                type="monotone"
                                dataKey={country}
                                stroke={colors[i % colors.length]}
                                fill={colors[i % colors.length]}
                                activeDot={{r: 8}}
                            />)}
                </AreaChart>
            }
        </ResponsiveContainer>
    );
};
export default PopulationChart;