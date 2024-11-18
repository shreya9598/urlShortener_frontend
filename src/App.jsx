import { useState } from 'react'
import axios from 'axios'

function App() {
  const [inputUrl, setInputUrl] = useState(""); // Use state for the input URL
  const [urlAlias, setUrlAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("")

  async function getShortUrlFromBackend(){
    let backendUrl = getBackendUrl()
    let payload = {url: inputUrl, customCode: urlAlias}
    try {
      const result = await postData(backendUrl, payload);
      setShortUrl(result.shortUrl)

  } catch (error) {
      console.error("Failed to fetch data:", error);
  }
  }

  const postData = async (url, payload) => {
    try {
        console.log("payload   ", payload);
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Returns the response data
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }
};

  function getBackendUrl(){
    return "http://localhost:3000/shorten"
  }

  return (
    <>
      <textarea onChange = {(e) => {
        setInputUrl(e.target.value)
      }} placeholder='Enter your url' cols="30" rows="10"></textarea>

      <input onChange = {(e) => {
        setUrlAlias(e.target.value)
      }}type="text" placeholder='Enter your alias' />
      
      <button onClick={getShortUrlFromBackend}>Submit</button>
      
      <div>
        {shortUrl && (
          <p>
            Your short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
        )}
      </div>
    </>
  )
}

export default App
