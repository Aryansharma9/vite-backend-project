import React from 'react';
import DashboardSection from '../components/DashboardSection';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage = ({ athletes }) => {
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
            <h2 className="text-3xl font-bold text-white mb-6">Performance Leaderboards</h2>
            {Object.keys(groupedByActivity).map(activity => (
                <DashboardSection key={activity} title={`${activity} Leaderboard`}>
                    <Leaderboard data={groupedByActivity[activity]} />
                </DashboardSection>
            ))}
        </div>
    );
};

export default LeaderboardPage;