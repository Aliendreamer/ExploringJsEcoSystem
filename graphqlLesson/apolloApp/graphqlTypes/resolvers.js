const fs = require("fs");
const path = require("path");
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)
const fs_readFile = util.promisify(fs.readFile)
const { auth, hasRole } = require('keycloak-connect-graphql')

const resolvers = {
   //we are gonna define the resolvers here
   Query: {
      books: auth( async () => {
         const books = await fs_readFile(path.resolve(__dirname,"../","db","books.json"),'utf8');
         const parsedBooks = JSON.parse(books);
         return parsedBooks.content;
       }),
      authors: async (obj, args, context, info)=>{
         const a = context;
         const user = context.kauth.accessToken.content // get the user details from the access token
         console.log(context.kauth.accessToken)
         console.log(context);
         const authorsJson  = await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         return parsedAuthors;
      },
      getAuthor:async(obj, {id}, context, info)=>{
          const authorList = await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
          const parsedAuthors = JSON.parse(authorList).content;
          const author = parsedAuthors.find(x=>x.id===id);
         return author;
      }
    },
    Mutation:{
      addAuthor:hasRole("canPublish")(async(obj, {name}, context, info)=>{
         const a = context;
         const user = context.kauth.accessToken.content // get the user details from the access token
         console.log(context.kauth.accessToken)
         console.log(context);
         const authorList =await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorList);s
         const newAuthor ={
            name,
            id:parsedAuthors.content.length+1
         }
         parsedAuthors.content.push(newAuthor);
        await fs_writeFile(path.resolve(__dirname,"../","db","authors.json"),JSON.stringify(parsedAuthors));
         return newAuthor;
     }),
     deleteAuthor:hasRole("canAdd")(async (obj, {id}, context, info)=>{
      const a = context;
      const user = context.kauth.accessToken.content // get the user details from the access token
      console.log(context.kauth.accessToken)
      console.log(context);
      const authorList = await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
      const parsedAuthors = JSON.parse(authorList);
      const updatedAuthors = parsedAuthors.content.filter(a=>a.id!==id);
      parsedAuthors.content= updatedAuthors;
     await fs_writeFile(path.resolve(__dirname,"../","db","authors.json"),JSON.stringify(parsedAuthors));
      return {success:true,message:"Deleted author"};
  })
    },
    Author:{
      async writings(author, args, context,info) {
         const books = await fs_readFile(path.resolve(__dirname,"../","db","books.json"),'utf8');
         const booksJson = JSON.parse(books).content;
         const authorBooks = booksJson.filter(x=>x.author===author.id);
         const poems = await fs_readFile(path.resolve(__dirname,"../","db","poems.json"),'utf8');
         const poemsJson = JSON.parse(poems).content;
         const authorPoems = poemsJson.filter(x=>x.author===author.id);
         return [...authorBooks,...authorPoems];
     }
    },
    Writings:{
      __resolveType(obj, context, info){
         if(obj.isPoem){
           return 'Poem';
         }
         return 'Book';
      }
    },
    Book:{
     async author(book, args, context,info) {
         const authorsJson  = await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         const author = parsedAuthors.find(a=>a.id === book.author);
         return author;
      }
    },
    Poem:{
      async author(poem, args, context,info) {
         const authorsJson  = await fs_readFile(path.resolve(__dirname,"../","db","authors.json"),'utf8');
         const parsedAuthors = JSON.parse(authorsJson).content;
         const author = parsedAuthors.find(a=>a.id === poem.author);
         return author;
      }
    }
}


module.exports = resolvers;