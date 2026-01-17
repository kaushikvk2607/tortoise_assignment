const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>Made by <span className="font-semibold text-foreground">Vikas Kaushik</span></p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Tortoise Assignment © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
