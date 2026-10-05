import React, { useCallback, useEffect, useState } from 'react';
import UVDisplay from './UVDisplay';
import ProtectionCalculator from './ProtectionCalculator';
import ReapplicationTimer from './ReapplicationTimer';

export default function Dashboard() {
    return(<div className='dashboard-container'>
        <UVDisplay/>
        <ProtectionCalculator/>
        <ReapplicationTimer/>
    </div>)
}