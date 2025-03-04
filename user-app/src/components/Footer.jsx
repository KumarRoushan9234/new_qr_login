const Footer = () => {
  return (
    <footer className="text-center py-6 mt-12 bg-gray-100">
      <p>
        © 2025 QR Check-in | Built by{" "}
        <span className="font-semibold">Roushan</span>
      </p>
      <div className="mt-2">
        <a
          href="https://linkedin.com/in/roushan"
          target="_blank"
          className="text-blue-600 mx-2"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/roushan"
          target="_blank"
          className="text-gray-800 mx-2"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
