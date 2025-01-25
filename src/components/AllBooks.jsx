import { useState } from "react";
import useFetch from "../useFetch";

const AllBooks = () => {
    const [successMessage, setMessage] = useState('');
    const {data, loading, error} = useFetch('http://localhost:3000/allbooks');
    //console.log(data);

    const handleDelete = async (bookId) => {
        try{
            const response = await fetch(`http://localhost:3000/books/delete/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'content-type':'application/json'
                },
            });

            if(!response.ok){
                throw 'failed to delete book';
            }
            const data = await response.json();
            if(data){
                setMessage("book deleted successfully.")
                window.location.reload();
            }
        }
        catch (error) {
            throw error;
        }
    }

    return(
        <div className="container">
            {loading && <p>loading...</p>}
            <ul>
                {data? data.map(book => (
                    <>
                    <li key={book._id}>
                        {book.title}
                        <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </li>
                    <br/>
                    </>
                )): error && <p>{error}</p>}
            </ul>
            <p>{successMessage}</p>
        </div>
    )
}
export default AllBooks;