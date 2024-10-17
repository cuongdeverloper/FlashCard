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
import { Card } from "react-bootstrap";
import { FaRegAddressCard, FaQuestion, FaUserAlt } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const navigate = useNavigate()
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
            {dataOverView && Object.keys(dataOverView).length > 0 && (
                <div className="dashboard-left col-md-6 row">
                    <Card style={{ width: "18rem", margin: "10px" }} onClick={()=>navigate('admin-user')}>
                        <Card.Body>
                            <Card.Title>
                                <FaRegAddressCard style={{ marginRight: "10px", color: "#3498db" }} />
                                Flash Card
                            </Card.Title>
                            <Card.Text>{dataOverView.flashcardCount}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "18rem", margin: "10px" }} onClick={()=>navigate('admin-questionPack')}>
                        <Card.Body>
                            <Card.Title>
                                <FaQuestion style={{ marginRight: "10px", color: "#e74c3c" }} />
                                Question Pack
                            </Card.Title>
                            <Card.Text>{dataOverView.questionPackCount}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "18rem", margin: "10px" }}>
                        <Card.Body>
                            <Card.Title>
                                <FaUserAlt style={{ marginRight: "10px", color: "#2ecc71" }} />
                                User
                            </Card.Title>
                            <Card.Text>{dataOverView.userCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}

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
