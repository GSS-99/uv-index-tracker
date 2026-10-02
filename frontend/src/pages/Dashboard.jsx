import React, { useEffect, useState } from 'react';
import SaveLocation from '../components/SaveLocation';

export default function Dashboard(){
    const [selectedCity, setSelectedCity] = useState(null);

    const handleNewcity = (savedCity) => {
        setSelectedCity(savedCity);
        console.log('Saved city updated in Dashboard:', savedCity)
    };
    return (<div className='dashboard-container'>
        <SaveLocation newLocation={handleNewcity}/>

        {selectedCity && (<div className='selected-city-display'>
        <h2>{selectedCity.name}</h2>
        </div>)}
    </div>);

};