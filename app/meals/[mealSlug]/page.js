// import classes from './page.module.css';
// import { getMeal } from '@/lib/meals';

// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// /**
//  *  To generate dynamic meta data
//  */
// export async function generateMetadata({ params }) {
//   const meal = getMeal(params.mealSlug);
//   if (!meal)  {
//     notFound();
//   }
//   return {
//     title: meal.title,
//     description: meal.summary
//   };
// }

// /**
//  * I mentioned before that NextJS is passing some special props
//     to these special files or to these components in those special files.
//     And for example, every component that's stored in a page.js file will receive a special params prop,
//     which you can, therefore, destructure.
//    And this params prop will then itself contain an object as a value where any dynamic path segment
//     that's configured for this route will be stored as a key-value pair.
//    And this name you chose here
//     between those square brackets will be used as a key and the actual value encoded in the URL will be used
//     as a value for that key.
//    And it is that value I need to get to look for that value in the database.
//    So therefore, we can now pass params.mealsSlug to getMeal, and that will be that identifier
//     that hopefully allows us to fetch a meal from the database.
//  */
// export default function MealDetailPage({ params }) {
//   const meal = getMeal(params.mealSlug);

//   // 1. If the user is trying to access to the meal that cannot be found,
//   //    then it will be executed and the following codes would not be executed
//   // 2. It will show the closest  not-found or error page (in this case, will be the not-found.js in the meals folder)
//   if (!meal)  {
//     notFound();
//   }

//   // Format the instructions to make it look neat
//   meal.instructions = meal.instructions.replace(/\n/g, '<br />');

//   return (
//     <>
//       <header className={classes.header}>
//         <div className={classes.image}>
//           <Image src={meal.image} fill />
//         </div>
//         <div className={classes.headerText}>
//           <h1>{meal.title}</h1>
          
//           <p className={classes.creator}>
//             by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
//           </p>
          
//           <p className={classes.summary}>{meal.summary}</p>
//           <button className={classes.deleteButton}>Delete</button>
//         </div>
        
//       </header>
//       <main>
//         <p className={classes.instructions} dangerouslySetInnerHTML={{ 
//           __html: meal.instructions, 
//          }}></p>
//       </main>
//     </>
//   );
// }

import { getMeal } from '@/lib/meals';
import MealDetailPageClient from './MealDetailPageClient';

/**
 * To generate dynamic meta data
 */
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal)  {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary
  };
}

export default function MealDetailPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  // Format the instructions to make it look neat
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return <MealDetailPageClient meal={meal} />;
}
