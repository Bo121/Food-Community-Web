// pages/api/meals/[mealSlug].js

/**
 * The handler function defined in the API route file pages/api/meals/[mealSlug].js is automatically used by Next.js to handle requests to the corresponding URL. You don't need to manually call this handler; Next.js takes care of routing the requests to this handler.

Here's a breakdown of how it works:

API Route Setup: The file pages/api/meals/[mealSlug].js defines an API route in Next.js. The [mealSlug] part of the filename makes it a dynamic route, where mealSlug is a placeholder for any meal slug.

Handler Definition: The handler function in this file processes incoming requests to this API endpoint. It checks the request method (req.method), and if it's a DELETE request, it proceeds to delete the meal using the deleteMeal function from your lib/meals.js file.

Client-side Request: When the delete button is clicked in your MealDetailPageClient component, it sends a DELETE request to this API endpoint using the fetch function. The URL for the request is constructed based on the meal's slug, e.g., /api/meals/some-meal-slug.


 */

import { deleteMeal } from '@/lib/meals'; // Import the deleteMeal function

export default async function handler(req, res) {
  const { mealSlug } = req.query;

  if (req.method === 'DELETE') {
    try {
      const success = deleteMeal(mealSlug);
      if (success) {
        res.status(200).json({ message: 'Meal deleted successfully' });
      } else {
        res.status(404).json({ message: 'Meal not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete meal' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
