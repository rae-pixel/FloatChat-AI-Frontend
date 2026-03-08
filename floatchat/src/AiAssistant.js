import { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, IconButton, Stack } from '@mui/material';
import { FaPlus, FaPaperPlane } from 'react-icons/fa';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Animated dots loading indicator
function LoadingDots() {
  const [dots, setDots] = useState('.');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => (dots.length < 3 ? dots + '.' : '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ fontSize: 24, letterSpacing: 6 }}>{dots}</span>;
}

export default function AiAssistant() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = 'http://10.180.9.216:8000/ask';

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const question = input;
    setInput('');
    setIsLoading(true);

    setChat(prev => [
      ...prev,
      { role: 'user', text: question, showMap: false },
      { role: 'loading', text: '', showMap: false }
    ]);

    try {
      const response = await axios.post(backendUrl, { question });
      const answer = response.data?.answer || 'Sorry, no response from backend.';
      const showMap =
        question.toLowerCase().includes('map') ||
        answer.toLowerCase().includes('map');
      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', text: answer, showMap };
        return updated;
      });
    } catch {
      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: 'Sorry, I had trouble processing your request. Please try again.',
          showMap: false
        };
        return updated;
      });
    }
    setIsLoading(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSend();
  };

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    alert(`Uploaded file: ${file.name}`);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#eef6fd', py: 7, px: 5 }}>
      {/* Top ocean wave decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 150,
          zIndex: 0,
          opacity: 0.45,
        }}
      >
        <svg viewBox="0 0 1440 320" style={{ width: '100%', height: '100%' }}>
          <path
            fill="#b2dffb"
            fillOpacity="1"
            d="M0,128L80,122.7C160,117,320,107,480,117.3C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </Box>

      {/* Bottom right animated bubbles */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 22,
          right: 30,
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'bubblefloat 6s infinite linear',
        }}
      >
        <svg width="160" height="80">
          <circle cx="20" cy="50" r="12" fill="#b2dffb" />
          <circle cx="60" cy="65" r="6.5" fill="#d9f2fb" />
          <circle cx="95" cy="40" r="10" fill="#90cbe9" opacity="0.7" />
          <circle cx="125" cy="15" r="8" fill="#b2dffb" opacity="0.32" />
          <circle cx="50" cy="20" r="4" fill="#67b4e0" opacity="0.25" />
        </svg>
      </Box>
      <style>
        {`
          @keyframes bubblefloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      <Typography variant="h4" gutterBottom color="#1c4673" sx={{ position: 'relative', zIndex: 2 }}>
        FloatChat AI Assistant
      </Typography>
      <Paper
        sx={{
          p: 3,
          minHeight: 420,
          maxWidth: 720,
          mb: 4,
          overflowY: 'auto',
          position: 'relative',
          zIndex: 2,
          boxShadow: 4,
          borderRadius: 4,
        }}
      >
        {chat.length === 0 && (
          <Typography color="text.secondary">
            Start by asking a question about Indian ARGO oceanographic data.
            <br />
            e.g., "Show me temperature profiles in the Bay of Bengal"
          </Typography>
        )}
        {chat.map((msg, idx) => (
          <Box key={idx} sx={{ my: 2 }}>
            {msg.role === 'user' && (
              <Box sx={{ textAlign: 'right', mb: 0.7 }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-block',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                    bgcolor: 'linear-gradient(90deg, #0968ed, #0f3a5a)',
                    color: 'white',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            )}
            {msg.role === 'loading' && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-block',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                    bgcolor: '#d9e8fb',
                    color: '#18517f',
                    fontSize: 24,
                    letterSpacing: 8,
                  }}
                >
                  <LoadingDots />
                </Typography>
              </Box>
            )}
            {msg.role === 'assistant' && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-block',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                    bgcolor: '#d9e8fb',
                    color: '#18517f',
                  }}
                >
                  {msg.text}
                </Typography>
                {msg.showMap && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: 300, width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </MapContainer>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Paper>
      <Stack direction="row" spacing={1} maxWidth={720} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          accept="image/*,application/pdf"
        />
        <label htmlFor="file-upload">
          <IconButton component="span" color="primary">
            <FaPlus />
          </IconButton>
        </label>
        <TextField
          fullWidth
          placeholder="Ask about ocean data..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          disabled={isLoading}
        />
        <IconButton onClick={handleSend} color="primary" disabled={!input.trim() || isLoading}>
          <FaPaperPlane />
        </IconButton>
      </Stack>
    </Box>
  );
}
