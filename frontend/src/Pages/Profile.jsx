import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const response = await axios.get('http://localhost:8000/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <>
            <Navbar hideButtons={true} />
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">

                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={user.profilePic 
                                ? `http://localhost:8000${user.profilePic}`   // ✅ Corrected Image Path
                                : "https://img.icons8.com/ios-filled/100/user-male-circle.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg"
                        />
                    </div>

                    {/* Welcome Text */}
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                        <span className='text-orange-400'>Welcome </span>
                        <span className='text-gray-900'>{user.name}</span>
                    </h1>

                    {/* User Details */}
                    <div className="space-y-6 text-lg">
                        <div>
                            <strong className="text-gray-700">Name:</strong>
                            <span className="ml-2">{user.name}</span>
                        </div>
                        <div>
                            <strong className="text-gray-700">Email:</strong>
                            <span className="ml-2">{user.email}</span>
                        </div>
                        <div>
                            <strong className="text-gray-700">Address:</strong>
                            <span className="ml-2">
                                {user.address || "Not provided"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
