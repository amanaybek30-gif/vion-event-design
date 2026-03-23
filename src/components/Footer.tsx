import { Link, useNavigate } from "react-router-dom";
import vionLogo from "@/assets/vion-logo.jpg";

const Footer = () => {
  const navigate = useNavigate();
  let clickCount = 0;
  let clickTimer: ReturnType<typeof setTimeout>;

  const handleCopyrightClick = () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 800);
    if (clickCount >= 5) {
      clickCount = 0;
      navigate("/admin");
    }
  };

  return (
    <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl flex flex-col items-center gap-6 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/">
          <img src={vionLogo} alt="VION Events" className="h-8 sm:h-10 w-auto" />
        </Link>
        <p
          className="text-muted-foreground font-body text-xs tracking-wider cursor-default select-none order-3 sm:order-2"
          onClick={handleCopyrightClick}
        >
          © {new Date().getFullYear()} VION Events. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-2 sm:order-3">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Gallery", href: "/gallery" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-muted-foreground font-body text-xs tracking-widest uppercase hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
