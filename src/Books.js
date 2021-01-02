import React, { useEffect, useRef } from "react";
import useFetchBooks from "./useFetchBooks";
import { useState } from "react";

export default function Books() {
  //If it only re-renders on new object, then why was it re-rendering in the first place
  //If i pass new Array, then also it re-renders, WTF!!!
  //Does react work on change of reference or change of object??
  
  let data = useFetchBooks('http://localhost:3000/links.json');

  let bookId = useRef();
  let bookName = useRef();
  let bookAuthor = useRef();
  let bookPublication = useRef();
  let submitButton = useRef();




  const [fetchedData, updateData] = useState([]);
  const [showIdBox, updateShowIdBox] = useState(false);
  const [isNewBook, updateIsNewBook] = useState(false)

  useEffect(() => {
    updateData(data);
  }, [data])

  const deleteBook = (e) => {
    for(var i =0; i< data.length; i++){
      if(data[i].id === Number(e.currentTarget.id)){
        let spliceIndex = data.indexOf(data[i])
        data.splice(spliceIndex, 1);
        data = [...data]; 
      }
    }
    updateData((data));
  }

  const editBook = (e) => {
    let bookDetails;
   
    updateIsNewBook(false);
    for(var i =0; i< data.length; i++){
      if(data[i].id === Number(e.currentTarget.id)){
        let selectedBook = data.indexOf(data[i])
        bookDetails = data[selectedBook]
        bookName.current.value = bookDetails.name;
        bookAuthor.current.value = bookDetails.author;
        bookPublication.current.value = bookDetails.publication;
        submitButton.current.id = bookDetails.id;
      }
    }
  }

  const submitChange = (e) => {
    if(isNewBook === true){
      let newBookValue = {
        id: Number(bookId.current.value),
        name: bookName.current.value,
        author: bookAuthor.current.value,
        publication: bookPublication.current.value
      }
      data.push(newBookValue);
      data = [...data];
      updateData((data));

    }
    else if (isNewBook === false){  
      let editedBookValues = {
        name: bookName.current.value,
        author: bookAuthor.current.value,
        publication: bookPublication.current.value
      }
      for(var i =0; i< data.length; i++){
        if(data[i].id === Number(e.currentTarget.id)){
          let replaceIndex = data.indexOf(data[i]);
          data[replaceIndex] = { id: data[replaceIndex].id, ...editedBookValues };
          data = [...data];
        }
      }
    }
    updateData((data));
    updateShowIdBox(false);
    bookId.current.value= '';
    bookName.current.value= '';
    bookAuthor.current.value= '';
    bookPublication.current.value='';
  }

  const addNewBook = () => {
    console.log(`This will add a new book`);
    updateShowIdBox(true);
    bookId.current.value= '';
    bookName.current.value= '';
    bookAuthor.current.value= '';
    bookPublication.current.value='';
    updateIsNewBook(true)
   
  }
  

   return (
    <>
    <h1>Books</h1>
    <button type="button" onClick={addNewBook}>Add a New Book</button>
    <ul> 
      {fetchedData.length > 0 && fetchedData.map((el) => {
        return(
          <BookList 
            key={el.id}
            el={el}
            deleteBook={deleteBook}
            editBook = {editBook}
            />
        )
        })
      }
    </ul>

    

    <form>
      <label className={(showIdBox === true) ? "displayBlock" : "displayNone"}>Book Id:</label>
      <input ref={bookId} type="text" className={(showIdBox === true) ? "displayBlock" : "displayNone"}/>
      <label>Book Name:</label>
      <input ref={bookName} type="text"/>
      <label>Book Author</label>
      <input ref={bookAuthor} type="text"/>
      <label>Book Publication</label>
      <input ref={bookPublication} type="text"/>
      <button ref={submitButton} type="button" onClick={submitChange}>Submit Changes</button>
    </form>
    </>
  );
}

function BookList({el, deleteBook, editBook}){
 
  return(
    <li id={el.id} >
        <span>{el.name}</span>
        <span>{el.author}</span>
        <span>{el.publication}</span>
        <span><button id={el.id} type="button" onClick={deleteBook}>Delete</button></span>
        <span><button id={el.id} type="button" onClick={editBook}>Edit</button></span>
    </li>
  )
}


