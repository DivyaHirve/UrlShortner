import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        setShortUrl(''); // Clear previous short URL
        try {
            // Send a POST request to your backend API
            const response = await axios.post('https://54.236.205.144:8443/api/shorten', originalUrl, {
            // const response = await axios.post('http://localhost:8080/api/shorten', originalUrl, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            setError('Failed to shorten the URL. Please try again.');
        }
    };

    return (
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter long URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                    style={{ padding: '10px', width: '300px' }}
                />
                <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>Shorten</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {shortUrl && (
                <div style={{ marginTop: '20px' }}>
                    <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
}

export default UrlShortener;
