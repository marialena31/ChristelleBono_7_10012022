import React from 'react';
import axios from 'axios';

const NewPostForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/api/images/posts",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className='form_title'>Quoi de neuf, aujourd'hui?</div>
        <label htmlFor='title' className='form_label'>title</label>
        <br />
        <input type='text' name='title' id='title' placeholder='Ecrivez un titre' />
        <br />
        <label htmlFor='image_URL' name='image_URL' id='image_URL' className='form_label'>Insérez une image</label>
        <br />
        <input type="file" onChange={handleFileSelect}/>
        <br />
        <input type="submit" value="Publier" className="btn" />
    </form>
  )
};

export default NewPostForm;