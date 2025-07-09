import ContactForm from '../components/contact/contact';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-grow py-8">
        <ContactForm />
      </section>
    </main>
  );
}
