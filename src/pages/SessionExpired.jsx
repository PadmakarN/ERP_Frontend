import { useNavigate } from "react-router-dom";

function SessionExpired() {
    const navigate = useNavigate();

    return(
        <div className=" flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow text-center">
                <h2 className="text-2xl font-bold mb-4">Session Expired</h2>    
                <p className="mb-6">Your session has expired. Please log in again.</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>
            </div>
        </div>  

    )
}
export default SessionExpired;