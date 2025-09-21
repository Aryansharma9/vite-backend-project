import React from 'react';
import DashboardSection from '../components/DashboardSection';

const CoachDashboard = ({ athletes }) => {
    const groupedByActivity = athletes.reduce((acc, athlete) => {
        const activity = athlete.activityType || 'Uncategorized';
        if (!acc[activity]) {
            acc[activity] = [];
        }
        acc[activity].push(athlete);
        return acc;
    }, {});

    return (
        <div className="p-4">
            <DashboardSection title="Coach Dashboard">
                <p className="text-gray-400 mb-4">View your athletes' performance analytics and injury risks.</p>
                {Object.keys(groupedByActivity).map(activity => (
                    <div key={activity} className="mb-8">
                        <h3 className="text-xl font-bold text-teal-300 mb-4">{activity}</h3>
                        <div className="space-y-4">
                            {groupedByActivity[activity].map(athlete => (
                                <div key={athlete.id} className="bg-gray-700 p-4 rounded-xl shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div>
                                        <p className="font-bold text-white text-lg">{athlete.name}</p>
                                        <p className="text-sm text-gray-400">Metrics from last assessment</p>
                                    </div>
                                    <div className="flex flex-wrap space-x-4 mt-2 sm:mt-0">
                                        {Object.keys(athlete.metrics).map(metric => (
                                            <p key={metric} className="text-sm font-semibold text-teal-400">
                                                {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {typeof athlete.metrics[metric] === 'number' ? athlete.metrics[metric].toFixed(2) : 'N/A'}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </DashboardSection>
        </div>
    );
};

export default CoachDashboard;