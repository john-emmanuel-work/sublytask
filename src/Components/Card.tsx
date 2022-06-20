import React, {useState, useEffect} from 'react';
import logo from '../logo.svg';
import './Card.css';
import warningicon from '../Resources/warningicon.svg'
import deleteicon from '../Resources/deleteicon.svg'
import languagesicon from '../Resources/languagesicon.svg'

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

function Card(props:CardProps) {
  const [cardStatus, setCardStatus] = useState(props.status);
  const [editStatus, setEditStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stillTranscribing, setStillTranscribing] = useState(true);

  let startDate: Date = new Date(props.updatedAt);
  let currentDate: Date = new Date();
  let interval: any = undefined;

  function handleMouseEnter(){
    setEditStatus(true);
  }

  function handleMouseLeave(){
    setEditStatus(false);
  }

  function getMonthDifference(startDate: Date, currentDate: Date) {
    return (
      currentDate.getMonth() -
      startDate.getMonth() +
      12 * (currentDate.getFullYear() - startDate.getFullYear())
    );
  }

  function getLanguageNo(langArray: string[]){
    let noOfLangs: number = langArray.length;
    if (noOfLangs >= 2) {
      return (
        `${noOfLangs} languages`
      );
    } else if (noOfLangs == 1) {
      return (
        `${noOfLangs} language`
      );
    } else {
      return (
        `0 languague`
      );
    };
  }

  useEffect(() => {
    if (stillTranscribing) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 300);
    } else {
      clearInterval(interval);
    }
  }, [stillTranscribing]);

  useEffect(() => {
    if (progress == 100) {
      setStillTranscribing(false);
      clearInterval(interval);
    }
  }, [progress]);

  return (
    <div key={props.id}>

      {cardStatus === "ready" &&   
          <div className='card-container' onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>handleMouseLeave()}>
            <div className='flex-column'>
              <div className={editStatus === true ? 'cover-image-container greyed-out' : 'cover-image-container'}>
                <img src={props.cover} alt="Background"/>
                <div className={editStatus === true ? 'delete-icon-wrapper' : 'hidden'}>
                  <img className='delete-icon' src={deleteicon} style={{height: "20px"}}  alt="Delete Icon"/>
                </div>
                <button className={editStatus === true ? 'edit-button' : 'hidden'}>Edit</button>
                <div className={editStatus === true ? 'languages-container flex-row' : 'hidden'}>
                  <div className='languages-icon-background'>
                    <img className='languages-icon' src={languagesicon}></img>
                 </div>
                 <div className='languages-text'>{getLanguageNo(props.languages)}</div>
                </div>
              </div>
              <div className='card-body'>
                  <div className='card-name'>
                    {props.name}
                  </div>
                  <div className='card-status'>
                    {`Edited ${getMonthDifference(startDate,currentDate)} months ago`}
                  </div>
                </div>
            </div>
          </div>
      }

      {cardStatus === "error" &&   
          <div className='card-container'>
            <div className='flex-column'>
              <div className='card-error-background flex-column'>
                <div style={{marginBottom: "10px"}}>
                  <div className='flex-row'>
                  <img src={warningicon} style={{height: "20px", padding: "5px 10px 0px 0px", alignSelf: "flex-start"}} alt="Warning Icon"/>
                  <span>{props.errorMessage}</span>
                  </div>
                </div>
                <div className='card-status flex-row'>
                  <button className='error-button delete-button'>Delete File</button>
                  <button className='error-button report-button'>Report Issue</button>
                </div>
              </div>
              <div className='card-body'>
                <div className='card-name'>
                {props.name}
                </div>
                <div className='card-status'>
                  Error in processing
                </div>
              </div>
            </div>
          </div>
      }

      {cardStatus === "transcribing" &&   
          <div className='card-container'>
            <div className='flex-column'>
            <div className='cover-image-container transcribing'>
              <img src={props.cover} alt="Background Image"/>
              <p className='transcribing-text'>Transcribing subtitles</p>

              <>

              <div className="new-progress-bar-wrapper">              
                <div className="new-progress">
                  <div className="progress-fill" style={{width: `${progress}%`}}></div>
                </div>              
              </div>


              </>

            </div>
            <div className='card-body'>
                <div className='card-name'>
                {props.name}
                </div>
                <div className='card-status'>
                  Transcribing
                </div>
              </div>
            </div>
          </div>
      }


    </div>   
  );
}

export default Card;
