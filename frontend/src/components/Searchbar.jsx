import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar({ setSelectedToken }) {
  const [query, setQuery] = useState("");
  const [tokens, setTokens] = useState([]);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(true);

  const fetchTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
        {
          headers: {
            "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK"
          }
        }
      );
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function handleInputFocus() {
    setSuggestionsVisible(true);
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search tokens..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            ></path>
          </svg>
        </div>
      </div>

      {query && filteredTokens.length > 0 && isSuggestionsVisible ? (
        <div className="suggestions-container">
          {filteredTokens.map((token) => (
            <Link
              to={`/tokendetails/${token.id}`} // token details route
              key={token.id}
              className="suggestion-item"
              onClick={() => {
                setSelectedToken(token);
                setQuery(token.name);
                setSuggestionsVisible(false);
              }}
            >
              <p>{token.name}</p>
              <p>{token.symbol.toUpperCase()}</p>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="glow"></div>
    </div>
  );
}
