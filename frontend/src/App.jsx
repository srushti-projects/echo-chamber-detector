import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addPost = () => {
    if (postText.trim()) {
      setPosts([...posts, postText])
      setPostText('')
      setError('')
    }
  }

  const removePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index))
  }

  const analyzeEchoChamber = async () => {
    if (posts.length === 0) {
      setError('Please add at least one post to analyze')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      console.log('Sending request to backend with posts:', posts)
      const response = await axios.post('http://localhost:8000/analyze', {
        posts: posts
      }, {
        timeout: 30000
      })
      console.log('Response received:', response.data)
      setResult(response.data)
    } catch (err) {
      console.error('Full error:', err)
      let errorMessage = 'Unable to connect to backend'
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.detail || `Server error: ${err.response.status}`
      } else if (err.request) {
        // Request made but no response
        errorMessage = 'Backend not responding. Trying again...'
        // Retry once with 127.0.0.1
        try {
          console.log('Retrying with 127.0.0.1...')
          const retryResponse = await axios.post('http://127.0.0.1:8000/analyze', {
            posts: posts
          }, {
            timeout: 10000
          })
          setResult(retryResponse.data)
          return
        } catch (retryErr) {
          errorMessage = 'Backend is not running on http://localhost:8000. Please ensure the backend server is started.'
        }
      } else if (err.message) {
        // Error in request setup
        errorMessage = err.message
      }
      
      setError(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setPosts([])
    setResult(null)
    setError('')
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🔍 Echo Chamber Detector</h1>
        <p className="subtitle">Analyze political bias in social media posts</p>

        <div className="input-section">
          <div className="input-group">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && addPost()}
              placeholder="Enter a post... (Ctrl+Enter to add)"
              className="textarea"
            />
            <button onClick={addPost} className="btn btn-add">
              + Add Post
            </button>
          </div>

          {posts.length > 0 && (
            <div className="posts-list">
              <h3>Posts to analyze ({posts.length})</h3>
              {posts.map((post, index) => (
                <div key={index} className="post-item">
                  <p>{post}</p>
                  <button onClick={() => removePost(index)} className="btn-remove">✕</button>
                </div>
              ))}
            </div>
          )}

          <div className="button-group">
            <button
              onClick={analyzeEchoChamber}
              disabled={loading || posts.length === 0}
              className="btn btn-primary"
            >
              {loading ? 'Analyzing...' : '📊 Analyze Posts'}
            </button>
            {result && (
              <button onClick={reset} className="btn btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="results-section">
            <h2>Analysis Results</h2>

            <div className="chart-container">
              <div className="bias-bar">
                <div className="bias-segment left" style={{ width: `${result.left}%` }}>
                  {result.left > 5 && <span>{result.left.toFixed(1)}%</span>}
                </div>
                <div className="bias-segment neutral" style={{ width: `${result.neutral}%` }}>
                  {result.neutral > 5 && <span>{result.neutral.toFixed(1)}%</span>}
                </div>
                <div className="bias-segment right" style={{ width: `${result.right}%` }}>
                  {result.right > 5 && <span>{result.right.toFixed(1)}%</span>}
                </div>
              </div>
              <div className="bias-labels">
                <span>🔴 Left</span>
                <span>⚪ Neutral</span>
                <span>🔵 Right</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat left">
                <div className="stat-value">{result.left.toFixed(1)}%</div>
                <div className="stat-label">Left-leaning</div>
              </div>
              <div className="stat neutral">
                <div className="stat-value">{result.neutral.toFixed(1)}%</div>
                <div className="stat-label">Neutral</div>
              </div>
              <div className="stat right">
                <div className="stat-value">{result.right.toFixed(1)}%</div>
                <div className="stat-label">Right-leaning</div>
              </div>
            </div>

            <div className="echo-score">
              <h3>Echo Chamber Score</h3>
              <div className="score-value">{result.echo_score.toFixed(1)}%</div>
              <p className="score-description">
                {result.echo_score > 70
                  ? '🚨 Strong echo chamber detected'
                  : result.echo_score > 50
                  ? '⚠️ Moderate echo chamber'
                  : '✅ Balanced political perspectives'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
