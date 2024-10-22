import { useEffect, useState } from 'react'
import './App.css'
import TotalArt from './components/TotalArt';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllArtObjects = async () => {
      const response = await fetch(
        "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=3ed436da00851e32d5e94e890bf51c34" 
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllArtObjects().catch(console.error);
  }, []);

  
  const totalItems = list && list.objects ? list.objects.length : 0;

  const meanTitleLength = list && list.objects && totalItems > 0
    ? list.objects.reduce((sum, art) => sum + (art.title.length || 0), 0) / totalItems
    : 0;

  // Calculate median title length
  const medianTitleLength = list && list.objects && totalItems > 0
    ? (() => {
        const sortedLengths = list.objects
          .map(art => art.title.length || 0)
          .sort((a, b) => a - b); // Sort lengths in ascending order
        const mid = Math.floor(sortedLengths.length / 2);
        
        return sortedLengths.length % 2 !== 0 
          ? sortedLengths[mid] // Odd number of items
          : (sortedLengths[mid - 1] + sortedLengths[mid]) / 2; // Even number of items
      })()
    : 0;

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.objects.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
  };


  return (
    <div className="whole-page">
      <h1>My Art List</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
          />
        <ul>
            {/* {list && list.objects && list.objects.map((art) =>
              art.on_display === "1" ? (
                  <li key={art.id}>{art.title}</li>
                ) : null
            )} */}

          {searchInput.length > 0 ? (
              filteredResults.length > 0 ? (
                filteredResults.map((art) =>
                  art.on_display === "1" ? (
                    <li key={art.id}>{art.title}</li>
                  ) : null
                )
              ) : (
                <p>No results found for "{searchInput}"</p>
              )
            ) : (
              list && list.objects && list.objects.map((art) =>
                art.on_display === "1" ? (
                  <li key={art.id}>{art.title}</li>
                ) : null
              )
          )}
        </ul>

       

        <TotalArt
          total={totalItems}
          mean={meanTitleLength}
          median={medianTitleLength}

        />

    </div>
  )
};

export default App
