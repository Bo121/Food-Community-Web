'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // It is also working on the client side, which means 
  // we need to have 'use client'
  const [pickedImage, setPickedImage] = useState(null);

  const imageInputRef = useRef();

  // 1. Since all the components are executed on the server side, 
  //    while the event happened in the client side (browser), 
  //    so we need to have 'use client'
  // 2. Trigger a click on the input, which is connected to this ref,
  //    defined below
  function handlePickClick() {
    imageInputRef.current.click();
  }

  // 1. Here we want to preview the image and update the UI
  // 2. For the useState, we automatically get an "event" object
  function handleImageChange(event) {
    // Since we only try to access the first file, and the first file
    // is always at index "0"
    const file = event.target.files[0];

    // If the file is not selected
    if (!file) {
      setPickedImage(null);
      return;
    }

    // This line creates a new instance of FileReader. FileReader is a built-in JavaScript API 
    // that allows web applications to asynchronously read the contents of files (or raw data buffers) stored on the user's computer.
    const fileReader = new FileReader();

    /**
     * 1. This line sets up an event handler for the "onload" event of the FileReader instance.
       2. The "onload" event is triggered when the file has been successfully read.
       3. The arrow function updates the state (using a state setter function setPickedImage) with the result of the file read operation, 
          which is stored in fileReader.result.
       4. "fileReader.result" will contain a data URL representing the file's data.
     */
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    }

    /**
     * 1. This line starts reading the contents of the file as a data URL. A data URL is a base64-encoded string representing the file data.
       2. Once the file is read, the onload event handler (defined earlier) is called, updating the state with the data URL.
     */
    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <div className={classes.picker}>
        {/** 
         *  1. In HTML, the <label> element is used to provide a clickable label for an input element. 
         *     When a user clicks on a label, the associated input element (like a text field or file input) receives focus.
         *  2. Purpose: The htmlFor attribute in HTML links the label to a specific input element. The value of "htmlFor" 
         *     should match the "id" of the associated input element.
         */}
        <label htmlFor={name}>{label}</label>
        {/**
         *  1. Here, we are using useState to manage the preview of the image selected by the user.
         */}
        <div className={classes.controls}>
          <div className={classes.preview}>
            {!pickedImage && <p>No image picked yet.</p>}
            {pickedImage && (
              <Image 
                src={pickedImage} 
                alt="Selected image by the user"
                fill/>
              )
            }
          </div>
          {/**
           *  1. "id={name}" dynamically sets the id attribute of the input element. 
           *     This ID should match the "htmlFor" attribute of the label to link them together.
           *  2. Here we have the "ref" which is connected to the ref we defined above
           *  3. "required" ensures that the <form> can't be submitted without an image being selected.
           */}
          <input 
            id={name}
            className={classes.input}
            type='file' 
            accept='image/png, image/jpeg' 
            name={name}
            ref={imageInputRef}
            onChange={handleImageChange}
            required
          />
          {/**
           *  1. Now we have our own style, otherwise the button will be a system default button
           *  2. We need to specific, otherwise by default it will be "submit" type
           *  3. When we click on the button, it is connected to the "input" we defined above
           */}
          <button 
            className={classes.button} 
            type="button"
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}