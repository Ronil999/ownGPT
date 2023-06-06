import React, { useState, useEffect } from 'react';
import './history.css'

const History = () => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`https://owngpt-api.vercel.app/history/${userId}`);
      const result = await response.json();
      if (Array.isArray(result)) {
        setHistory(result);
      } else {
        setHistory([]);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className='container'>
      {history.length === 0 ? (
        <h1 style={{ color: 'Black', textAlign: 'center', marginTop: '10px' }}>
          No History found
        </h1>
      ) : (
        <>
          <h2 style={{textAlign: 'center',margin:"15px"}}>History</h2>
          <ul style={{ listStyleType: 'none' }}>
            {history
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item, index) => (
                <div className="form-control3">
                  <li key={index}>
                    <p className='date' style={{marginBottom:"0px"}}>
                      <strong>Date:</strong>{' '}
                      {new Date(item.date).toLocaleDateString()}
                      <strong>Time:</strong>{' '}
                      {new Date(item.date).toLocaleTimeString()}
                    </p>
                    <div
                      className="form-control"
                      contentEditable={false}
                      style={{
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        backgroundColor:"mediumturquoise",
                        border:"0px",
                        borderRadius:"0rem"
                      }}
                    >Question: {item.userInput}</div>
                    <div
                      className="form-control"
                      contentEditable={false}
                      style={{
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        marginBottom:"2rem",
                        backgroundColor: "darkseagreen",
                        border:"0px",
                        borderRadius:"0rem"
                      }}
                    >
                      {item.aiOutput}
                    </div>
                  </li>
                </div>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default History;
