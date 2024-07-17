"use client"; // Mark this file as a Client Component

import classes from './page.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MealDetailPageClient({ meal }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete the meal: ${meal.title}?`);
    if (confirmed) {
      const response = await fetch(`/meals/${meal.slug}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/meals'); // Redirect to the meals list page
      } else {
        alert('Failed to delete the meal. Please try again.');
      }
    }
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
          <button className={classes.deleteButton} onClick={handleDelete}>Delete</button>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ 
          __html: meal.instructions, 
         }}></p>
      </main>
    </>
  );
}
