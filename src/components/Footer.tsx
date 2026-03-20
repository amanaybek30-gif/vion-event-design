const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-display text-xl font-bold tracking-wider text-gold-gradient">
          VION
        </a>
        <p className="text-muted-foreground font-body text-xs tracking-wider">
          © {new Date().getFullYear()} VION Events. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["About", "Services", "Work", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted-foreground font-body text-xs tracking-widest uppercase hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
