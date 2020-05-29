import React from 'react';
import { Table,Button,Toast, ToastBody } from 'reactstrap';
import {useParams,useHistory} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const GET_AUTHOR=gql`
   query getAuthor($id:Int){
    getAuthor(id:$id){
     id
     name
        writings{
       ...on Book{
       id
       title
         pages
       }
       ...on Poem{
         id
             title
         isPoem
         pages
       }
     }
   }
 }`;

const AuthorDetail =()=>{
   let { id } = useParams();
   const history = useHistory();
   const { loading, error, data } = useQuery(GET_AUTHOR, { variables:{id:Number(id)}, fetchPolicy: 'network-only'});
   debugger;
   let index=0;
   return(
     <>
     {!loading &&
     <>
      <Toast isOpen={true}>
      <ToastBody>
        <p>Name : {data.getAuthor.name}</p>
        <p>Total works: {data.getAuthor.writings.length}</p>
      </ToastBody>
    </Toast>
     <Table bordered>
         <thead>
           <tr>
             <th>#</th>
             <th>writing</th>
             <th>Total pages</th>
             <th>Type</th>
           </tr>
         </thead>
         <tbody>
            {data ?
             data.getAuthor.writings.map(writing=>(<tr key={writing.id}>
            <th scope="row">{index++}</th>
                <td>{writing.title}</td>
                <td>{writing.pages}</td>
                <td>
                 {writing.isPoem ? "Poem":"Book"}
                </td>
              </tr>
            ))
             :<div>{error.message}</div>}        
         </tbody>
       </Table>
      <Button onClick={()=>history.push("/")}>Back to authors</Button>
      </>
    }
    </> 
   )
}

export default AuthorDetail;