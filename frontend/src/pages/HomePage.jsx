import React, { useCallback, useEffect, useState } from 'react';
import CitySelection from '../components/CitySelection';
import Dashboard from '../components/Dashboard'
import SearchBar from '../components/SearchBar';

export default function HomePage(){
    return (<div>
        <CitySelection/>
        <Dashboard/>
    </div>)
}