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
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/">
          <img src={vionLogo} alt="VION Events" className="h-10 w-auto" />
        </Link>
        <p
          className="text-muted-foreground font-body text-xs tracking-wider cursor-default select-none"
          onClick={handleCopyrightClick}
        >
          © {new Date().getFullYear()} VION Events. All rights reserved.
        </p>
        <div className="flex gap-6">
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
