import React from 'react';
import AthleteDashboard from './AthleteDashboard';
import CoachDashboard from './CoachDashboard';

const DashboardPage = ({ user, athleteData, onVideoUpload, analysisStatus, onAnalyze, isAnalyzing, athletes }) => {
    return user === 'athlete' ? (
        <AthleteDashboard
            athleteData={athleteData}
            onVideoUpload={onVideoUpload}
            analysisStatus={analysisStatus}
            onAnalyze={onAnalyze}
            isAnalyzing={isAnalyzing}
        />
    ) : (
        <CoachDashboard athletes={athletes} />
    );
};

export default DashboardPage;