// This directive ensures that the following code is executed on the client side.
'use client';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/action';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

import { useFormState } from 'react-dom';

export default function ShareMealPage() {
  // 1. The form uses formAction as its action attribute, which means formAction will 
  //    be called when the form is submitted.
  // 2. The form fields collect user input, including name, email, title, summary, 
  //    instructions, and an image.
  // 3. The ShareMealPage component uses the useFormState hook to manage form submission and state.
  // 4. When the form is submitted, formAction (provided by useFormState) calls the shareMeal function on the server.
  const [ state, formAction ] = useFormState(shareMeal, {message: null});
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/**
         *  "action={shareMeal}" sets the function to be called when the form is submitted.
         */}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          {/**
           *  It is located in '@/components/meals/image-picker'
           */}
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            {/**
             * By using context and state, the form submission status can be managed and shared between components, 
             * allowing the "MealsFormSubmit" component to reflect the current submission state accurately.
             */}
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}