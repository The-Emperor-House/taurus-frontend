const Footer = () => {
  return (
    <footer className="bg-[#404040] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">MyApp</h2>
            <p className="text-gray-400 mt-2">Building amazing experiences</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">About</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;