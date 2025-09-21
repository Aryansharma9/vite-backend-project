import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import AthleteDashboard from './pages/AthleteDashboard.jsx';
import CoachDashboard from './pages/CoachDashboard.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import './App.css';
import './index.css';

const API_BASE = import.meta.env.VITE_API_URL; // ✅ use env variable

const App = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('athlete');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [athleteData, setAthleteData] = useState({ id: 'new', name: 'Your Performance', activityType: '', metrics: {} });
    const [analysisStatus, setAnalysisStatus] = useState('');
    const [athletes, setAthletes] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [userId, setUserId] = useState(null);
    const [isAppLoading, setIsAppLoading] = useState(true);

    // Fetch athlete data from the backend when the component mounts
    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/athletes`);
                if (response.ok) {
                    const data = await response.json();
                    setAthletes(data);
                } else {
                    console.error("Failed to fetch athletes data:", await response.text());
                }
            } catch (error) {
                console.error("Error fetching athletes data:", error);
            } finally {
                setIsAppLoading(false);
            }
        };
        fetchAthletes();
    }, [user]); // Re-fetch data when the user state changes

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.userType);
                setUserId(data.userId);
                setLoginError('');

                // Fetch the current athlete's data after a successful login
                if (data.userType === 'athlete') {
                    const athleteResponse = await fetch(`${API_BASE}/api/athletes/${data.userId}`);
                    if (athleteResponse.ok) {
                        const athleteProfile = await athleteResponse.json();
                        setAthleteData(athleteProfile);
                    }
                }
            } else {
                setLoginError(data.message);
            }
        } catch (error) {
            setLoginError('Could not connect to the server.');
        }
    };

    const handleSignUp = async () => {
        if (password.length < 6) {
            setLoginError('Password must be at least 6 characters.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, password, userType }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user.userType);
                setUserId(data.user._id);
                setLoginError('');
            } else {
                setLoginError(data.message);
            }
        } catch (error) {
            setLoginError('Could not connect to the server.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        setUsername('');
        setPassword('');
        setAnalysisStatus('');
        setIsSigningUp(false);
        setAthleteData({ id: 'new', name: 'Your Performance', activityType: '', metrics: {} });
        setUserId(null); 
        setCurrentPage('dashboard'); // Reset to dashboard on logout
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoPreview = document.getElementById('video-preview');
            videoPreview.src = URL.createObjectURL(file);
            videoPreview.classList.remove('hidden');
            document.getElementById('analyze-button').classList.remove('hidden');
        }
    };

    const handleVideoAnalysis = async () => {
        setIsAnalyzing(true);
        setAnalysisStatus('Analyzing video with AI...');

        const videoPreview = document.getElementById('video-preview');
        const videoFile = videoPreview.src;

        try {
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
                fetch(videoFile).then(res => res.blob()).then(blob => reader.readAsDataURL(blob));
            });

            const prompt = `
                Act as a sports performance analyst. Analyze the provided video of a sports activity and generate performance metrics.
                Your response must be a valid JSON object only, with no additional text or explanations.
                The JSON object should have the following structure:
                {
                    "activityType": <string>, 
                    "metrics": {
                        "sprintTime": <number>,
                        "jumpHeight": <number>,
                        "agility": <number>
                    }
                }
            `;

            const payload = {
                contents: [
                    {
                        parts: [
                            { text: prompt },
                            {
                                inlineData: {
                                    mimeType: 'video/mp4',
                                    data: base64Data,
                                },
                            },
                        ],
                    },
                ],
                model: 'gemini-2.5-flash-preview-05-20',
            };

            const apiKey = "AIzaSyCiLqVwzG8F_YskP8x1Z6fzuq0Lm1nU3js"
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            let responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!responseText) {
                 throw new Error("Gemini API returned an empty or invalid response.");
            }
            
            if (responseText.startsWith('```json')) {
                responseText = responseText.substring(7, responseText.lastIndexOf('```')).trim();
            }

            let geminiResponse;
            try {
                geminiResponse = JSON.parse(responseText);
            } catch (jsonError) {
                console.error("Error parsing Gemini response:", jsonError);
                console.log("Raw API response:", responseText);
                throw new Error("Invalid JSON response from Gemini API.");
            }

            const newAthleteData = {
                userId: userId,
                name: username,
                activityType: geminiResponse.activityType || 'N/A',
                metrics: geminiResponse.metrics || {},
            };
            
            const updateResponse = await fetch(`${API_BASE}/api/athletes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAthleteData),
            });

            const updatedData = await updateResponse.json();
            if (updateResponse.ok) {
                setAthleteData(updatedData);
                setAnalysisStatus('Analysis complete! Your metrics are updated above.');
            } else {
                throw new Error(updatedData.message);
            }

        } catch (error) {
            console.error("Error analyzing video with Gemini:", error);
            setAnalysisStatus(`Error during AI analysis: ${error.message}. Please try again.`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const renderPage = () => {
        if (!user) {
            return (
                <AuthScreen
                    onLogin={handleLogin}
                    onSignUp={handleSignUp}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    error={loginError}
                    isSigningUp={isSigningUp}
                    setIsSigningUp={setIsSigningUp}
                    userType={userType}
                    setUserType={setUserType}
                />
            );
        }

        if (currentPage === 'dashboard') {
            return user === 'athlete' ? (
                <AthleteDashboard
                    athleteData={athleteData}
                    onVideoUpload={handleVideoUpload}
                    analysisStatus={analysisStatus}
                    onAnalyze={handleVideoAnalysis}
                    isAnalyzing={isAnalyzing}
                />
            ) : (
                <CoachDashboard athletes={athletes} />
            );
        }

        if (currentPage === 'leaderboard') {
            return <LeaderboardPage athletes={athletes} />;
        }

        return <p className="text-center text-red-500">Page not found.</p>;
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen">
            <div className="container mx-auto py-8">
                {isAppLoading ? (
                    <div className="flex items-center justify-center h-screen text-teal-400">
                        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xl">Loading...</span>
                    </div>
                ) : (
                    <>
                        {user && <Header onLogout={handleLogout} user={username} onNavigate={setCurrentPage} currentPage={currentPage} />}
                        {renderPage()}
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
