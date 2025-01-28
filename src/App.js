import "bootstrap/dist/css/bootstrap.min.css"
import {useState} from 'react';
import AllBooks from "./components/AllBooks";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: ""
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
     ...prevData, [name]: name === "publishedYear" || name === "rating"?parseInt(value):value 
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      const response = await fetch('https://book-api-project-sepia.vercel.app/books', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      if(!response.ok){
        console.log("failed to add book.");
      }
      const data = await response.json();
      console.log('added book: ', data);
    }
    catch (error) {
      throw error;
    }
  }
  return (
    <div className="container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label><br/>
        <input type='text' name="title" value={formData.title} onChange={handleChange}/><br/><br/>

        <label>Author:</label><br/>
        <input type='text' name="author" value={formData.author} onChange={handleChange}/><br/><br/>

        <label>Published Year:</label><br/>
        <input type='number' name="publishedYear" value={formData.publishedYear} onChange={handleChange}/><br/><br/>

        <label>Genre:</label><br/>
        <input type='text' name="genre" value={formData.genre} onChange={handleChange}/><br/><br/>

        <label>Language:</label><br/>
        <input type='text' name="language" value={formData.language} onChange={handleChange}/><br/><br/>

        <label>Rating:</label><br/>
        <input type='number' name="rating" value={formData.rating} onChange={handleChange}/><br/><br/>
        
        <label>Country:</label><br/>
        <input type='text' name="country" value={formData.country} onChange={handleChange}/><br/><br/>

        <label>summary:</label><br/>
        <input type='text' name="summary" value={formData.summary} onChange={handleChange}/><br/><br/>
        
        <label>Cover Image Url:</label><br/>
        <input type='text' name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange}/><br/><br/>

        <button type="submit">submit</button>
      </form>
      <h2>All Book Title List</h2>
      <AllBooks/>
    </div>
  );
}

export default App;
