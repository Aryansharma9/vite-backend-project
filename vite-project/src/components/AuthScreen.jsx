// import React from 'react';

// const AuthScreen = ({ onLogin, onSignUp, username, setUsername, password, setPassword, error, isSigningUp, setIsSigningUp, userType, setUserType }) => {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen px-4">
//             <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-6 text-center">AI-Powered Sports Scout</h1>
//             <p className="text-gray-400 mb-8 text-center max-w-md">Democratizing sports for every athlete, everywhere.</p>
//             <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
//                 <h2 className="text-2xl font-bold text-white mb-6 text-center">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="w-full bg-gray-700 text-white placeholder-gray-400 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password (min. 6 characters)"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-gray-700 text-white placeholder-gray-400 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//                 {isSigningUp && (
//                     <div className="mb-6">
//                         <label className="block text-white text-sm font-semibold mb-2">User Type</label>
//                         <select
//                             value={userType}
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="w-full bg-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         >
//                             <option value="athlete">Athlete</option>
//                             <option value="coach">Coach</option>
//                         </select>
//                     </div>
//                 )}
//                 <button
//                     onClick={isSigningUp ? onSignUp : onLogin}
//                     className="w-full bg-teal-500 text-white font-bold p-3 rounded-xl hover:bg-teal-600 transition-colors"
//                 >
//                     {isSigningUp ? 'Sign Up' : 'Log In'}
//                 </button>
//                 {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
//                 <button
//                     onClick={() => setIsSigningUp(!isSigningUp)}
//                     className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
//                 >
//                     {isSigningUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AuthScreen;

import React from 'react';

const AuthScreen = ({ onLogin, onSignUp, username, setUsername, password, setPassword, error, isSigningUp, setIsSigningUp, userType, setUserType }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-6 text-center">AI-Powered Sports Scout</h1>
            <p className="text-gray-400 mb-8 text-center max-w-md">Democratizing sports for every athlete, everywhere.</p>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full bg-gray-700 text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password (min. 6 characters)" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full bg-gray-700 text-white placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {isSigningUp && (
                        <div>
                            <label className="block text-white text-sm font-semibold mb-2">User Type</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full bg-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="athlete">Athlete</option>
                                <option value="coach">Coach</option>
                            </select>
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={isSigningUp ? onSignUp : onLogin} 
                    className="w-full bg-teal-500 text-white font-bold p-3 rounded-xl hover:bg-teal-600 transition-colors mt-6"
                >
                    {isSigningUp ? 'Sign Up' : 'Log In'}
                </button>
                
                {error && <p className="text-red-400 mt-4 text-center text-sm">{error}</p>}
                
                <button
                    onClick={() => setIsSigningUp(!isSigningUp)}
                    className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    {isSigningUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default AuthScreen;