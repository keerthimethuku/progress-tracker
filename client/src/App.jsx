import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [progress, setProgress] = useState([]);
  const [form, setForm] = useState({
    date: '', dsaQuestions: '', csTopic: '', projectTask: '', mockInterview: '', contestRank: ''
  });

  const fetchProgress = async () => {
    const res = await axios.get('http://localhost:5000/all-progress');
    setProgress(res.data);
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProgress = async () => {
    await axios.post('http://localhost:5000/add-progress', form);
    fetchProgress();
    setForm({ date: '', dsaQuestions: '', csTopic: '', projectTask: '', mockInterview: '', contestRank: '' });
  };

  const deleteProgress = async (id) => {
    await axios.delete(`http://localhost:5000/delete-progress/${id}`);
    fetchProgress();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Placement Progress Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {['date', 'dsaQuestions', 'csTopic', 'projectTask', 'mockInterview', 'contestRank'].map(field => (
          <input
            key={field}
            className="p-2 border rounded"
            placeholder={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        ))}
        <button onClick={addProgress} className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Entry</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              {['Date','DSA','CS','Project','Mock','Contest','Action'].map(h => (
                <th key={h} className="p-3 border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {progress.map(item => (
              <tr key={item._id}>
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">{item.dsaQuestions}</td>
                <td className="p-2 border">{item.csTopic}</td>
                <td className="p-2 border">{item.projectTask}</td>
                <td className="p-2 border">{item.mockInterview}</td>
                <td className="p-2 border">{item.contestRank}</td>
                <td className="p-2 border">
                  <button onClick={() => deleteProgress(item._id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
