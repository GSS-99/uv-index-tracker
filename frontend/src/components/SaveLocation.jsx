import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { saveLocationApi } from '../api/locationApi';

export default function SaveLocation({newLocation}){
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleNewLocation = async(location)=>{
        setIsSaving(true);
        setError(null);

        const locationInfo = {
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude,
            country: location.country || '',
            admin1: location.admin1 || ''
        };
        try {
            const savedCity = await saveLocationApi(locationInfo);
            //Send saved location up to Dashboard 
            if (newLocation){
                newLocation(savedCity);
            };
        }
        catch (err) { 
            setError(err.message);
        } finally { 
            setIsSaving(false)
        };
    }; 
    return ( <div className='save-location-status'>
        <SearchBar onAddLocation={handleNewLocation}/>

        {isSaving && <div className='saving-status'> Saving location...</div>}
        {error && <div className='error'>{error}</div>}
    </div>)
};