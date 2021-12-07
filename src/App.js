import React, { useState, useEffect } from "react";
import { ApiClient} from './ApiClient';

function App() {

  const responseStatusCheck = (responseObject) => {
    if(responseObject.status >= 200 && responseObject.status < 300){
      return Promise.resolve(responseObject);

    }else{
      return Promise.reject(new Error(responseObject.statusText));
    }
  }

  const [quotes, changeQuotes] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const api = new ApiClient();

  const [fetching,changeFetching] = useState(false);

  const refreshQuote = () => {
    changeQuotes({
      content: "Loading...",
      author: "Loading...",
      tags: [],

    })
    changeFetching(true);

    api
    .getQuote()
    
      .then( (res) => {
        changeQuotes(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally( (state) => changeFetching(false) );
     
  }

  useEffect(() => {
      refreshQuote();
  }, []);

  return (
    <>
      <h1>Quote of the Day</h1>
      <p>
        <b>Content:</b> {quotes.content}{" "}
      </p>
      <p>
        <b>Author:</b> {quotes.author}{" "}
      </p>
      <p>
        <b>Tags:</b> {quotes.tags.join(", ")}
      </p>

      <button disabled={fetching} onClick={() => refreshQuote()}>Get new Quote</button>
    </>
  );
}

export default App;
