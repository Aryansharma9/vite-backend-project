// import React from 'react';

// const DashboardSection = ({ title, children }) => (
//     <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
//         <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
//         {children}
//     </div>
// );

// export default DashboardSection;

import React from 'react';

const DashboardSection = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        {children}
    </div>
);

export default DashboardSection;