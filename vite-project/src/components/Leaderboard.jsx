// import React from 'react';

// const Leaderboard = ({ data }) => {
//     const sortedData = [...data].sort((a, b) => {
//         const metricA = Object.keys(a.metrics).find(m => m.includes('Time') || m.includes('Height') || m.includes('Score'));
//         const metricB = Object.keys(b.metrics).find(m => m.includes('Time') || m.includes('Height') || m.includes('Score'));
        
//         if (metricA && metricB) {
//             if (metricA.includes('Time')) {
//                 return a.metrics[metricA] - b.metrics[metricA];
//             }
//             return b.metrics[metricB] - a.metrics[metricA];
//         }
//         return 0;
//     });

//     return (
//         <ul className="space-y-4">
//             {sortedData.map((athlete, index) => (
//                 <li key={athlete.id} className="bg-gray-700 p-4 rounded-xl shadow-inner flex items-center justify-between">
//                     <span className="font-bold text-lg text-teal-300">#{index + 1}</span>
//                     <span className="flex-grow text-white font-semibold ml-4">{athlete.name}</span>
//                     <div className="flex flex-wrap space-x-4">
//                         {Object.keys(athlete.metrics).map(metric => (
//                             <div key={metric} className="text-sm font-semibold text-gray-400">
//                                 <span className="font-bold">{metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
//                                 <span> {typeof athlete.metrics[metric] === 'number' ? athlete.metrics[metric].toFixed(2) : 'N/A'}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default Leaderboard;

import React from 'react';

const Leaderboard = ({ data }) => {
    const sortedData = [...data].sort((a, b) => {
        const metricA = Object.keys(a.metrics).find(m => m.includes('Time') || m.includes('Height') || m.includes('Score'));
        const metricB = Object.keys(b.metrics).find(m => m.includes('Time') || m.includes('Height') || m.includes('Score'));
        
        if (metricA && metricB) {
            if (metricA.includes('Time')) {
                return a.metrics[metricA] - b.metrics[metricA];
            }
            return b.metrics[metricB] - a.metrics[metricA];
        }
        return 0;
    });

    return (
        <ul className="space-y-4">
            {sortedData.map((athlete, index) => (
                <li key={athlete.id} className="bg-gray-700 p-4 rounded-xl shadow-inner flex items-center justify-between border border-gray-600">
                    <span className="font-bold text-lg text-teal-300">#{index + 1}</span>
                    <span className="flex-grow text-white font-semibold ml-4">{athlete.name}</span>
                    <div className="flex flex-wrap space-x-4">
                        {Object.keys(athlete.metrics).map(metric => (
                            <div key={metric} className="text-sm font-semibold text-gray-400">
                                <span className="font-bold">{metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                <span> {typeof athlete.metrics[metric] === 'number' ? athlete.metrics[metric].toFixed(2) : 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Leaderboard;