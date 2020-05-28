import React from 'react';
import { Table } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'react-loader';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

const GET_Authors = gql`{
  authors{
    id
    name
    writings{
      ...on Book{
      id
      title
      }
      ...on Poem{
        id
				title
      }
    }
  }
}`;


const AuthorList = ()=>{
   const { loading, error, data } = useQuery(GET_Authors);
   debugger;
   let index=0;
   return (
    <>
   <Loader loaded={!loading}>
    {!loading &&
     <Table bordered>
         <thead>
           <tr>
             <th>#</th>
             <th>Author name</th>
             <th>Total writings</th>
             <th>link</th>
           </tr>
         </thead>
         <tbody>
            {data ?
             data.authors.map(author=>(<tr>
            <th scope="row">{index++}</th>
                <td>{author.name}</td>
                <td>{author.writings.length}</td>
                <td>
                   <Link to={`/author/${author.id}`}>
                      check author details
                   </Link>
                </td>
              </tr>
            ))
             :<div>{error.message}</div>}        
         </tbody>
       </Table>
   }
  </Loader>
    </>
  );
}  

export default AuthorList;