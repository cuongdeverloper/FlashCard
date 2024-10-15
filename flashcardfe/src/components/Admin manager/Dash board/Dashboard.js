import { useEffect, useState } from "react";
import { getDataDashBoardAdm } from "../../../service/ApiService";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const Dashboard = () => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    const getDataDashBoard = async () => {
        const response = await getDataDashBoardAdm();
        console.log(response);
        if (response && response.errorCode === 0) {
            setDataOverView(response.data);
            const data = [
                {
                    name: "Flash Card",
                    uv: response.data.flashcardCount,
                    pv: 0, // Placeholder for values not used
                    amt: 0, // Placeholder for values not used
                },
                {
                    name: "Question Pack",
                    uv: 0, // Placeholder for values not used
                    pv: response.data.questionPackCount,
                    amt: 0, // Placeholder for values not used
                },
                {
                    name: "User",
                    uv: 0, // Placeholder for values not used
                    pv: 0, // Placeholder for values not used
                    amt: response.data.userCount,
                },
            ];
            setDataChart(data);
        }
    };

    useEffect(() => {
        getDataDashBoard();
    }, []);

    return (
        <div className="dashboard-container row mt-3">
            <div className="dashboard-left col-md-6 row">
                <div className="dashboard-left-ct col-md-5 border">
                    Flash Card:<br />{dataOverView?.flashcardCount}
                </div>
                <div className="dashboard-left-ct col-md-5 border">
                    Question Pack:<br />{dataOverView?.questionPackCount}
                </div>
                <div className="dashboard-left-ct col-md-5 border">
                    User:<br />{dataOverView?.userCount}
                </div>
            </div>
            <div className="dashboard-right col-md-6">
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart data={dataChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" fill="#8884d8" />
                        <Bar dataKey="pv" fill="#82ca9d" />
                        <Bar dataKey="amt" fill="#ffc658" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
