import React, {useState,useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
const initialFilter='reacthooks'
const initialHits =[]
function App() {

const[results,setResults]=useState(initialHits);
const [filter,setFilter] = useState(initialFilter);
const[loading, setLoading]= useState(false);
const [error,setError] = useState('');
const searchInputRef = useRef();

const getResults = useCallback(async()=>{
    setLoading(true)
    try{
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${filter}`)
     setResults(response.data.hits)
    }catch(e){
      setLoading(false)
      setError(e.message)
    }
    setLoading(false)
},[filter])

useEffect(()=>{
    getResults()
  },[])

 const handleSearch = event =>{
  event.preventDefault()
  getResults()
 }

 const handleClearSearch =()=>{
   setFilter('')
   searchInputRef.current.focus()
 }

  return (
    <>
    <form onSubmit={handleSearch}>
    <input ref={searchInputRef} type='text' value={filter} name='search' onChange={event=>setFilter(event.target.value)}></input>
    <button type="submit">change filter</button>
    <button type='button' onClick={handleClearSearch}>clear search</button>
    </form>
    {loading ? (<div> loading</div>) :<ul>
    {results.map((res)=><li key={results.indexOf(res)}><a href={res.url}>{res.title}</a></li>)}
    </ul>}
    {error &&(<div>{error}</div>)}
    </>
  );
}

export default App;
