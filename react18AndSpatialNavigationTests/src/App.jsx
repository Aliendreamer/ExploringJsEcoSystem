import React, { useEffect } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './App.css'
import { v4 as uuidv } from "uuid";



const MENU_FOCUS_KEY = 'MENU';
const menuItems = [1, 2, 3, 4, 5];
const rowItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const galleries= [1,3,4]
function MenuItem({value}) {
  const { ref, focused } = useFocusable();

  return (
    <div ref={ref} className={focused ? 'menu-item-focused' : 'menu-item'} >
			{`menu ${value}`}
	</div>
  );
}

function Menu() {
  const { ref, focusKey } = useFocusable({ focusKey: MENU_FOCUS_KEY });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="menu">
        {menuItems.map((menuItem,index) => (
          <MenuItem key={index === 0 ? MENU_FOCUS_KEY : uuidv()}  value={index}/>
        ))}
      </div>
    </FocusContext.Provider>
  );
}

function GalleryItem({value}) {
  const { ref, focused } = useFocusable();

  return (
    <div
      ref={ref}
      className={focused ? 'gallery-item-focused' : 'gallery-item'}
    >
		{`gallery ${value}`}
	</div>
  );
}

function GalleryRow() {
  const { ref, focusKey } = useFocusable();

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="gallery-row">
        {rowItems.map((galleryItem,index) => (
          <GalleryItem key={uuidv()}  value={index}/>
        ))}
      </div>
    </FocusContext.Provider>
  );
}

function App() {
	const { ref, setFocus, focusKey } = useFocusable();

	useEffect(() => {
	  setFocus(MENU_FOCUS_KEY);
	}, [setFocus]);

	return (
	  <FocusContext.Provider value={focusKey}>
		<div ref={ref}>
		  <Menu />
		{galleries.map(_=> <GalleryRow key={uuidv()} />)}
		</div>
	  </FocusContext.Provider>
	);
}

export default App
