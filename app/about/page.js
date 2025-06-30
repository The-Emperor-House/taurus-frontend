export default function About() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-4">
          We are a small team passionate about building great web experiences with Next.js.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          To demonstrate how easy it is to create a website with Next.js 15 without needing a database or API.
        </p>
      </div>
    </div>
  )
}