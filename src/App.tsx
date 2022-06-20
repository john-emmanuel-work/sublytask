import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import {Form} from "react-bootstrap";

interface CardProps {
  id: number,
  name: string,
  cover: string,
  languages: string[],
  errorMessage?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

function App() {
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardProps[]>([]);

  const apiUrl: string = "https://run.mocky.io/v3/a811c0e9-adae-4554-9694-173aa23bc38b";

  useEffect(()=> {

    async function getMedia() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setCardData(data.media);
    }

    getMedia();

  }, [])



  return (
    <div className='flex-column'>

    <div className='flex-row wrappable'>

      <select className="form-select" aria-label="Default select example" style={{marginLeft: "20px", marginTop: "20px", width: "auto"}}>
        <option value="1">All statuses</option>
        <option value="2">Ready</option>
        <option value="3">Error</option>
        <option value="4">Transcribing</option>
      </select>

      <select className="form-select" placeholder='Filter by language' aria-label="Default select example" style={{marginLeft: "20px", marginTop: "20px", width: "auto"}}>
        <option value="1">All languages</option>
        <option value="2">English</option>
        <option value="3">Dutch</option>
        <option value="4">Czech</option>
      </select>

      </div>


    <div className='flex-row wrappable'>

      {cardData.map(currentMedium => {
        return(
          <Card
          id={currentMedium.id}
          name={currentMedium.name}
          cover={currentMedium.cover}
          languages={currentMedium.languages}
          errorMessage={currentMedium.errorMessage}
          status={currentMedium.status}
          createdAt={currentMedium.createdAt}
          updatedAt={currentMedium.updatedAt}
          />
        )
      })}

    </div>
    </div>
  );
}

export default App;
