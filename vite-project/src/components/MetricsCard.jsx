// import React from 'react';

// const MetricsCard = ({ value, label }) => (
//     <div className="bg-gray-700 p-4 rounded-xl text-center">
//         <p className="text-4xl font-bold text-teal-400">{value}</p>
//         <p className="text-sm text-gray-400">{label}</p>
//     </div>
// );

// export default MetricsCard;

import React from 'react';

const MetricsCard = ({ value, label }) => (
    <div className="bg-gray-700 p-4 rounded-xl text-center border border-gray-600 shadow-md">
        <p className="text-4xl font-bold text-teal-400">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

export default MetricsCard;