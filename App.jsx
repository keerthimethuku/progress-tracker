import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function App() {
    const [progressList, setProgressList] = useState([]);
    const [subject, setSubject] = useState("");
    const [completedTopics, setCompletedTopics] = useState("");
    const [totalTopics, setTotalTopics] = useState("");

    // Fetch all progress from backend
    const fetchProgress = async () => {
        const res = await axios.get(`${API_BASE}/all-progress`);
        setProgressList(res.data);
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const handleAdd = async () => {
        if (!subject || !completedTopics || !totalTopics) {
            alert("Please fill all fields");
            return;
        }
        await axios.post(`${API_BASE}/add-progress`, {
            subject,
            completedTopics: Number(completedTopics),
            totalTopics: Number(totalTopics),
        });
        setSubject("");
        setCompletedTopics("");
        setTotalTopics("");
        fetchProgress();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_BASE}/delete-progress/${id}`);
        fetchProgress();
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
            <h1>Placement Progress Tracker</h1>

            <div style={{ marginBottom: 20 }}>
                <input
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ padding: 8, width: "30%", marginRight: 10 }}
                />
                <input
                    placeholder="Completed Topics"
                    type="number"
                    value={completedTopics}
                    onChange={(e) => setCompletedTopics(e.target.value)}
                    style={{ padding: 8, width: "20%", marginRight: 10 }}
                />
                <input
                    placeholder="Total Topics"
                    type="number"
                    value={totalTopics}
                    onChange={(e) => setTotalTopics(e.target.value)}
                    style={{ padding: 8, width: "20%", marginRight: 10 }}
                />
                <button onClick={handleAdd} style={{ padding: 8 }}>
                    Add Progress
                </button>
            </div>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Completed</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {progressList.map((item) => (
                        <tr key={item._id}>
                            <td>{item.subject}</td>
                            <td>{item.completedTopics}</td>
                            <td>{item.totalTopics}</td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {progressList.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No data yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
