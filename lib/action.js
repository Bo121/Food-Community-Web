// (1) This directive indicates that the function should be executed on the server side.
// (2) In frameworks like Next.js, this can be used to specify that certain logic should run on the server, 
//     providing better security for sensitive operations like database interactions or data processing.
'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from "./meals";
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

/**
 *  1. An asynchronous function defined to handle form submission.
 *  2. Asynchronous Function:
 *      (1) The async keyword allows the function to use the await keyword within it, enabling asynchronous operations such as network requests.
 *      (2) It allows the function to handle tasks that might take some time to complete, like saving data to a server, 
 *          without blocking the execution of other code.
 */
export async function shareMeal(prevState, formData) {
  const meal = {
    // The name in "get" is identical to the "name" defined in the "form"
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  }

  if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || 
      isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || 
      !meal.image || meal.image.size === 0
  ) {
      return {
        message: 'Invalid Input.'
      };
  }

  await saveMeal(meal);

  /**
   *  1. revalidatePath('/meals'): only revalidate a single path, no nested path
   *     will be revalidated.
   *  2. If revalidatePath('/meals', 'layout'): the nested path will be revalidated
   *  3. revalidatePath('/', 'layout'): all the path will be revalidated
   */
  revalidatePath('/meals');

  // Redirect the user to "meal" page after the form is submitted
  redirect('/meals');
}

/**
 * Deletes a meal from the database where the slug matches the provided parameter.
 */
export async function deleteMeal(slug) {
  const meal = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  if (meal) {
    const filePath = path.join(process.cwd(), 'public', meal.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the image file from the file system
    }
    db.prepare('DELETE FROM meals WHERE slug = ?').run(slug);
    return true;
  }
  return false;
}

