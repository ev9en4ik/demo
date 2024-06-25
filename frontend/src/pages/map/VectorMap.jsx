import React from 'react';
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
// import './map.css'
import {useNavigate} from "react-router-dom";
const VectorMap = ({handleTooltip}) => {
    const navigate = useNavigate()
    
    const routeToCountry = (geo) => {
        console.log(geo)
        navigate(`/country/${geo}`)
    }
    
    return (
        <div className='flex flex-col items-center -translate-x-14'>
            <ComposableMap style={{width: '1200px', height: '89vh'}} projectionConfig={{
                scale: 200,
            }}>
                <ZoomableGroup center={[0, 0]} zoom={1}>
                <Geographies geography="./WorldMap.json">
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                onClick={() => routeToCountry(geo.id.toLowerCase())}
                                onMouseEnter={() => {
                                    handleTooltip(`${geo.properties.name}`);
                                }}
                                onMouseLeave={() => {
                                    handleTooltip("");
                                }}
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    border: 'none',
                                    default: {
                                        fill: "#4b5563",
                                        stroke: '#7a7a7a',
                                    },
                                    hover: {
                                        fill: "#dc2626",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default VectorMap;