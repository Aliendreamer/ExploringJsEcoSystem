import { useEffect,useState } from "react";
import React from 'react';
import {Alert} from 'reactstrap';

const BaseAlert =({open,success})=>{
   const color = success ?"success": " danger";
   const [visible, setVisible] = useState(false);
   const onDismiss = () => setVisible(false);
   useEffect(()=>{
      setVisible(open)
   },[open])
   return (
      <>
      {visible?
      <Alert color={`${color}`} isOpen={visible} toggle={onDismiss}>
         {success? "Author successfully deleted":"Something happened could not delete author"}
       </Alert>
       :null}
      </>
   )
}
export default BaseAlert;