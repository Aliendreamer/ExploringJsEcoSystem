const { gql } = require('apollo-server');

const resolvers = gql`
   # we are gonna define the types here

   type Book {
      id:Int
      title:String
      author:Author
   }
   type Author{
      id:Int
      name
      Books:[Book]!
   }
   type Query {
      books:[Books]!
      authors:[Author]!
      getAuthor:Author
   }
   type MutationResponse {
      success: Boolean!
      message: String
    }
   type Mutation{
      addBook(name:String!, author:Int):MutationResponse
      addAuthor():MutationResponse
      deleteBook():MutationResponse
      deleteAuthor():MutationResponse
   }
`;


export default resolvers;