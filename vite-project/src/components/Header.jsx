// import React from 'react';

// const Header = ({ onLogout, user, onNavigate, currentPage }) => (
//     <header className="flex justify-between items-center mb-12 px-4">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 drop-shadow-lg">
//             Welcome, {user}
//         </h1>
//         <div className="flex items-center space-x-4">
//             <button
//                 onClick={() => onNavigate('dashboard')}
//                 className={`text-white font-semibold py-3 px-6 rounded-full text-sm transition-colors duration-200 ${currentPage === 'dashboard' ? 'bg-teal-600 shadow-inner' : 'bg-gray-700 hover:bg-gray-600'}`}
//             >
//                 Dashboard
//             </button>
//             <button
//                 onClick={() => onNavigate('leaderboard')}
//                 className={`text-white font-semibold py-3 px-6 rounded-full text-sm transition-colors duration-200 ${currentPage === 'leaderboard' ? 'bg-teal-600 shadow-inner' : 'bg-gray-700 hover:bg-gray-600'}`}
//             >
//                 Leaderboards
//             </button>
//             <button 
//                 onClick={onLogout} 
//                 className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-full text-sm hover:bg-red-700 transition-colors duration-200"
//             >
//                 Log Out
//             </button>
//         </div>
//     </header>
// );

// export default Header;

import React from 'react';

const Header = ({ onLogout, user, onNavigate, currentPage }) => (
    <header className="flex justify-between items-center mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 drop-shadow-lg">
            Welcome, {user}
        </h1>
        <div className="flex items-center space-x-4">
            <button
                onClick={() => onNavigate('dashboard')}
                className={`text-white font-semibold py-3 px-6 rounded-full text-sm transition-colors duration-200 ${currentPage === 'dashboard' ? 'bg-teal-600 shadow-inner' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
                Dashboard
            </button>
            <button
                onClick={() => onNavigate('leaderboard')}
                className={`text-white font-semibold py-3 px-6 rounded-full text-sm transition-colors duration-200 ${currentPage === 'leaderboard' ? 'bg-teal-600 shadow-inner' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
                Leaderboards
            </button>
            <button 
                onClick={onLogout} 
                className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-full text-sm hover:bg-red-700 transition-colors duration-200"
            >
                Log Out
            </button>
        </div>
    </header>
);

export default Header;