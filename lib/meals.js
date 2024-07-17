// This module provides an API for interacting with the file system.
import fs from 'fs';
// This module provides a simple and fast SQLite3 database wrapper
import sql from 'better-sqlite3';
import path from 'path';
// This module is used to convert strings into URL-friendly slugs.
import slugify from 'slugify';
// This module is used to sanitize HTML and prevent cross-site scripting (XSS) attacks.
import xss from 'xss';

// This line initializes a connection to the SQLite database file named meals.db.
const db = sql('meals.db');

/**
 *  1. The function starts by creating a 2-second delay using a promise.
 *  2. The function retrieves all records from the meals table in the database.
 */
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // The way how we can handle error page with the file in the "meals" folder (error.js)
  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

/**
 *  This function retrieves a single meal from the database where the slug matches the provided parameter.
 */
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

/**
 * Generates a unique slug for the meal title by appending a number if a conflict is detected.
 */
function generateUniqueSlug(title) {
  let slug = slugify(title, { lower: true });
  let count = 1;

  while (db.prepare('SELECT COUNT(*) as count FROM meals WHERE slug = ?').get(slug).count > 0) {
    slug = `${slugify(title, { lower: true })}-${count}`;
    count++;
  }

  return slug;
}

/**
 * Saves a new meal to the database, including handling the image upload and sanitizing input data.
 */
export async function saveMeal(meal) {
  // Generates a unique slug for the meal title.
  meal.slug = generateUniqueSlug(meal.title);
  // Sanitizes the meal instructions using xss to prevent XSS attacks.
  meal.instructions = xss(meal.instructions);

  // Extracts the file extension from the uploaded image's name.
  const extension = meal.image.name.split('.').pop();
  // Constructs a file name using the slug and the extracted extension.
  const fileName = `${meal.slug}.${extension}`;

  const filePath = path.join(process.cwd(), 'public/images', fileName);
  // Creates a write stream to save the image file in the public/images directory.
  const stream = fs.createWriteStream(filePath);
  // Converts the image to a buffer and writes it to the file system.
  const bufferedImage = await meal.image.arrayBuffer();

  // Throws an error if the image cannot be saved.
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image, please try again!");
    }
  });

  // Updates the meal.image path to the relative URL of the saved image.
  // Here we do not have 'public' in front
  meal.image = `/images/${fileName}`;

  // Inserts the meal data into the meals table in the database using a prepared statement.
  db.prepare(`
    INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
    )
  `).run(meal);
}

/**
 * Deletes a meal from the database where the slug matches the provided parameter.
 */
export function deleteMeal(slug) {
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
