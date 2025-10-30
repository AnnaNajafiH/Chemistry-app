function Footer() {
  return (
    <div className="text-center p-3 md:p-4 mt-4 backdrop-blur-sm bg-white/40 rounded-xl shadow-inner border border-white/50 w-full max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        <div className="text-gray-500 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} ChemCalc - Professional Chemistry
          Tool
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <a
            href="https://en.wikipedia.org/wiki/Molar_mass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors text-xs md:text-sm"
          >
            About Molar Mass
          </a>
          <a
            href="https://pubchem.ncbi.nlm.nih.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors text-xs md:text-sm"
          >
            PubChem Database
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
