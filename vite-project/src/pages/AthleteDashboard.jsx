import React, { useState } from 'react';
import DashboardSection from '../components/DashboardSection';
import MetricsCard from '../components/MetricsCard';

const AthleteDashboard = ({ athleteData, onVideoUpload, analysisStatus, onAnalyze, isAnalyzing }) => {
    const handleVideoFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoPreview = document.getElementById('video-preview');
            videoPreview.src = URL.createObjectURL(file);
            videoPreview.classList.remove('hidden');
            document.getElementById('analyze-button').classList.remove('hidden');
            onVideoUpload(file);
        }
    };

    return (
        <div className="p-4">
            <DashboardSection title="Your Progress">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(athleteData.metrics).length > 0 ? (
                        Object.keys(athleteData.metrics).map(metric => (
                            <MetricsCard
                                key={metric}
                                value={typeof athleteData.metrics[metric] === 'number' ? athleteData.metrics[metric].toFixed(2) : 'N/A'}
                                label={metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-3">No performance data yet. Upload a video to get started!</p>
                    )}
                </div>
                {athleteData.activityType && (
                    <div className="mt-4 text-center">
                        <p className="text-sm font-semibold text-teal-400">Activity: {athleteData.activityType}</p>
                    </div>
                )}
            </DashboardSection>

            <DashboardSection title="Upload Your Assessment Video">
                <input type="file" onChange={handleVideoFileChange} accept="video/*" className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600" />
                <video id="video-preview" controls className="w-full mt-4 rounded-xl hidden"></video>
                <button onClick={onAnalyze} id="analyze-button" className="w-full mt-4 bg-teal-500 text-white font-bold py-3 rounded-xl hover:bg-teal-600 transition-colors hidden" disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
                </button>
                <p className="text-center mt-4 text-gray-400">{analysisStatus}</p>
            </DashboardSection>
        </div>
    );
};

export default AthleteDashboard;