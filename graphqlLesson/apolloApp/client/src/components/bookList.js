import React from 'react';
import {Button,Table} from 'reactstrap';
import Loader from 'react-loader';
import {useHistory} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_BOOKS = gql`{
   books{
      id
      title
      author{
         name
      }
      pages
   }
}

`;



const BookList =()=>{
   const history = useHistory();
   const {loading,error,data} = useQuery(GET_BOOKS, {fetchPolicy: 'network-only'});
   let index=0;
   return (
      <>
         <Loader loaded={!loading}>

          {!loading &&
          <Table bordered>
         <thead>
           <tr>
             <th>#</th>
             <th>book name</th>
             <th>Author</th>
             <th>Pages</th>
           </tr>
         </thead>
         <tbody>
            {data ?
             data.books.map(book=>(<tr key={book.id}>
            <th scope="row">{index++}</th>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.pages} </td>
              </tr>
            ))
             :<div>{error.message}</div>}        
         </tbody>
       </Table>}
      <Button onClick={()=>history.push("/")}>Go to authors</Button>
      </Loader>
      </>
   )
}
export default BookList;