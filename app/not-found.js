// when go to http://localhost:3000/my-meals
// http://localhost:3000/my-lol, whatever invalid route

export default function NotFound() {
  return (
    <>
      <main className="not-found">
        <h1>Not Found</h1>
        <p>Unfortunately, we could not find the requested page or resource.</p>
      </main>
    </>
  );
}