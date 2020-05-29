import React, { useEffect, useState } from 'react';
import { Table,Button } from 'reactstrap';
import { useQuery,useMutation } from '@apollo/react-hooks';
import Loader from 'react-loader';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import AddModal from "./addModal";
export const GET_AUTHORS = gql`{
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

const DELETE_AUTHOR=gql`
   mutation deleteAuthor($id:Int){
    deleteAuthor(id:$id){
         success
      }

}
`;
const AuthorList = ()=>{
   const { loading, error, data } = useQuery(GET_AUTHORS, {fetchPolicy: 'network-only'});

   const [ deleteAuthor,{ loading: mutationLoading, error: mutationError }] = useMutation(DELETE_AUTHOR);


  const deleteAction= async (id)=>{
    await deleteAuthor({variables:{id},refetchQueries:[{query:GET_AUTHORS}],awaitRefetchQueries:true})
  }


    useEffect(()=>{

    });

   let index=0;
   return (
    <>
   <Loader loaded={!loading||mutationLoading}>
    {!loading &&
     <Table bordered>
         <thead>
           <tr>
             <th>#</th>
             <th>Author name</th>
             <th>Total writings</th>
             <th>Link</th>
             <th>Delete</th>
           </tr>
         </thead>
         <tbody>
            {data ?
             data.authors.map(author=>(<tr key={author.id}>
            <th scope="row">{index++}</th>
                <td>{author.name}</td>
                <td>{author.writings.length}</td>
                <td>
                   <Link to={`/author/${author.id}`}>
                      check author details
                   </Link>
                </td>
                <td>
                  <Button onClick={()=> deleteAction(author.id)} >delete author</Button>
                </td>
              </tr>
            ))
             :<div>{error.message}</div>}        
         </tbody>
       </Table>
   }
    {<AddModal/>}
  </Loader>
  </>
  );
}  

export default AuthorList;