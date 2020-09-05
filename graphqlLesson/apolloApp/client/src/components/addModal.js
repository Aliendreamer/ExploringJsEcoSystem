
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
         Form, FormGroup, Label, Input
} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useHistory} from 'react-router-dom';
import {GET_AUTHORS} from "./authorList";
const CREATE_AUTHOR=gql`
   mutation addAuthor($name:String){
      addAuthor(name:$name){
         id
      }

}
`;


const AddModal = (props) => {
  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [authorName,setAuthorName] = useState("");
  const toggle = () => setModal(!modal);
  const history = useHistory();


   const [addAuthor] = useMutation(
      CREATE_AUTHOR
      ,{
        update(cache, { data: { addAuthor } }) {
          const { authors } = cache.readQuery({ query: GET_AUTHORS });
          cache.writeQuery({
            query: GET_AUTHORS,
            data: { authors: authors.concat([addAuthor]) },
          });
        }
      }
   );
    
    const onAdd = async()=>{
       const response=  await addAuthor({ variables:{name:authorName}});
        setTimeout(()=>{
          history.push(`/author/${response.data.addAuthor.id}`);
        },2000);
     } 

  return (
    <div>
      <Button outline color="info" onClick={toggle}>add Author</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Author</ModalHeader>
        <ModalBody>
        <Form>
      <FormGroup>
        <Label for="authorName">Enter author name</Label>
        <Input type="text" name="authorName" id="authorName" placeholder="" onChange={(e)=>setAuthorName(e.target.value)} />
      </FormGroup>
      </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>onAdd()}>Add author</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddModal;