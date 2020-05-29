import React, { useState } from 'react';
import { Table,Button } from 'reactstrap';
import { useQuery,useMutation } from '@apollo/react-hooks';
import Loader from 'react-loader';
import gql from 'graphql-tag';
import {Link,useHistory} from 'react-router-dom';
import AddModal from "./addModal";
import BaseAlert from './baseAlert';
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
   const history = useHistory();
   const [ deleteAuthor,{ loading: mutationLoading }] = useMutation(DELETE_AUTHOR);
   const [openAlert,setOpenAlert]= useState(false);
   const [deleteSuccess,setDeleteSuccess] = useState(false);
  const deleteAction= async (id)=>{
    const result = await deleteAuthor({variables:{id},refetchQueries:[{query:GET_AUTHORS}],awaitRefetchQueries:true});
    setOpenAlert(true);
    setDeleteSuccess(result.data.deleteAuthor.success);
    setTimeout(()=>{
      setOpenAlert(false)
    },3000);
  }

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
    <Button onClick={()=>history.push("/books")}>Go to books</Button>
    {<BaseAlert open={openAlert} success={deleteSuccess}/>}
  </Loader>
  </>
  );
}  

export default AuthorList;