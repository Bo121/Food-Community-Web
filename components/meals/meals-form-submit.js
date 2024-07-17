// This directive indicates that the following code should be executed on the client side.
// It is used in frameworks like Next.js to explicitly mark components that should run in the browser.
'use client';

// This hook is used to track the status of form submissions, providing useful information about whether a form is currently being submitted.
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit({ meals }) {
  // The useFormStatus hook is called to get the current form status.
  // When used in the context of a form, the pending status is shared between components
  const { pending } = useFormStatus();

  return (
    // The disabled attribute of the button is set based on the pending state. 
    // If pending is true, the button is disabled, preventing further submissions while the current submission is in progress.
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}