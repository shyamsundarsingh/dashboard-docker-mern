import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setData(response.data);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to load dashboard"
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
            }
        };

        getDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {data && (
                <>
                    <h2>{data.message}</h2>

                    <p>
                        User ID: {data.user.userId}
                    </p>

                    <p>
                        Role: {data.user.role}
                    </p>
                </>
            )}

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;