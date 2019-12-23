import React,{useState,useEffect} from 'react';


const initialLocationState = {
  latitude: null,
  longtitude: null,
  speed: null
}

const  App = () => {

  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [location,setLocation] = useState(initialLocationState)
  let mounted = true;
  useEffect(() => {
    document.title = `you clicked ${count}`
    window.addEventListener('mousemove', handleMousePositions)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeolocation)
    const watchId = navigator.geolocation.watchPosition(handleGeolocation)
    return () => {
      window.removeEventListener('mousemove', handleMousePositions)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    }
  },[count])

  const handleGeolocation = event => {
    if (mounted) {
    setLocation({
      latitude: event.coords.latitude,
      longtitude: event.coords.longtitude,
      speed: event.coords.speed
    })
  }
  }
  const handleOnline = ()=> {
    setStatus(true)
  }

  const handleOffline = () => {
    setStatus(false)
  }
  const handleMousePositions = event => {
    setMousePosition(
      {
        x: event.pageX,
        y:event.pageY
      }
    )
  }
  const  incrementCount = () => {
     setCount(count+1)
  }

  const toggleLight = () => {
    setIsOn(previsOn=>!previsOn)
  }
  return (
    <>
      <h2>counter</h2>
    <button onClick={incrementCount}> I was clicked {count} times </button>
      <h2>toggle light</h2>
      <img style=
      {{
          height: '50px',
          width: '50px',
      }}
        src={isOn ? 'http://icon.now.sh/highlight/fd0' : 'http://icon.now.sh/highlight/aaa' }
        alt="flashlight"
        onClick={toggleLight}>
      
      </img>
      <h2> mouse positiongs</h2>
      {JSON.stringify(mousePosition, null, 2)}<br />
      <h2> network status </h2>
      <p>you are {status ? "online" : "offline"}</p>
      <h2>Geolocation</h2>
      <p>latitude: {location.latitude}</p>
      <p>longtitude: {location.longtitude}</p>
      <p>speed: {location.speed ? location.speed : "0"}</p>
    </>
  );
}
    
    export default App;
