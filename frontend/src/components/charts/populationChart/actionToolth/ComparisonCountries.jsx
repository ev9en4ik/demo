import React, {useState} from 'react';
import Select from "react-select";
import {useSelector} from "react-redux";

const ComparisonCountries = ({defaultCountry, addCountryToChart, removeCountryFromChart}) => {
    const countries = useSelector(state => state.country.countries.filter(country => country.id !== defaultCountry.id))
    const [comparisonCountries, setComparisonCountries] = useState([{id: defaultCountry.id, name: defaultCountry.name}])
    const countriesForOptions = countries.filter(country => !comparisonCountries.includes(country.id)).map(country => {return {
        value: country.id,
        label: country.name,
    }})
    const colorStyles = {
        control: styles => ({ ...styles, backgroundColor: '#334155', color: '#d1d5db' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: '#334155',
                border: 'none',
                color: '#d1d5db',
                cursor: 'pointer',
            };
        },
        menuList: styles => ({ ...styles, border: 'none' }),
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: '#94a3b8',
                color: '#d1d5db'
            };
        },
    }
    
    const toggleComparisonList = (value, action) => {
        if (action.action === 'select-option') {
            setComparisonCountries([...comparisonCountries, {id: action.option.value, name: action.option.label}])
            addCountryToChart(countries.find(country => country.id === action.option.value))
        } else if (action.action === 'remove-value') {
            setComparisonCountries(comparisonCountries.filter(country => country.id !== action.removedValue.value))
            
            removeCountryFromChart(countries.find(country => country.id === action.removedValue.value))
        }
    }
    
    return (
        <div className='flex flex-col mt-5 justify-center items-center '>
            <div className='w-3/4'>
                <Select
                    isMulti
                    name="country"
                    options={countriesForOptions}
                    placeholder="Add country to comparison"
                    onChange={toggleComparisonList}
                    components={{ClearIndicator: null}}
                    styles={colorStyles}
                />
            </div>
        </div>
    );
};

export default ComparisonCountries;