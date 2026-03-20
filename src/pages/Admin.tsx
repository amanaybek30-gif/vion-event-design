import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, LogOut, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GalleryImage } from "@/pages/Gallery";

interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  impact: string;
}

const ADMIN_EMAIL = "admin@vionevents.com";
const ADMIN_PASS = "vionadmin123";

const Admin = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"portfolio" | "gallery">("portfolio");

  // Portfolio state
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);

  // Gallery state
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryAlt, setNewGalleryAlt] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("vion-admin");
    if (session === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      const storedPortfolio = localStorage.getItem("vion-portfolio");
      if (storedPortfolio) setPortfolio(JSON.parse(storedPortfolio));

      const storedGallery = localStorage.getItem("vion-gallery");
      if (storedGallery) setGallery(JSON.parse(storedGallery));
    }
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setAuthed(true);
      localStorage.setItem("vion-admin", "true");
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vion-admin");
    setAuthed(false);
    navigate("/");
  };

  const savePortfolio = (items: PortfolioItem[]) => {
    setPortfolio(items);
    localStorage.setItem("vion-portfolio", JSON.stringify(items));
  };

  const saveGallery = (items: GalleryImage[]) => {
    setGallery(items);
    localStorage.setItem("vion-gallery", JSON.stringify(items));
  };

  const addPortfolioItem = () => {
    setEditItem({
      id: crypto.randomUUID(),
      image: "",
      title: "",
      category: "",
      description: "",
      impact: "",
    });
  };

  const saveEditItem = () => {
    if (!editItem) return;
    const exists = portfolio.find((p) => p.id === editItem.id);
    const updated = exists
      ? portfolio.map((p) => (p.id === editItem.id ? editItem : p))
      : [...portfolio, editItem];
    savePortfolio(updated);
    setEditItem(null);
  };

  const deletePortfolioItem = (id: string) => {
    savePortfolio(portfolio.filter((p) => p.id !== id));
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    const newImg: GalleryImage = {
      id: crypto.randomUUID(),
      src: newGalleryUrl.trim(),
      alt: newGalleryAlt.trim() || "Gallery image",
    };
    saveGallery([...gallery, newImg]);
    setNewGalleryUrl("");
    setNewGalleryAlt("");
  };

  const deleteGalleryImage = (id: string) => {
    saveGallery(gallery.filter((g) => g.id !== id));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <h1 className="font-display text-2xl font-bold text-secondary-foreground text-center mb-8">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary-foreground/10 border-border/30 text-secondary-foreground placeholder:text-secondary-foreground/40"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary-foreground/10 border-border/30 text-secondary-foreground placeholder:text-secondary-foreground/40"
            />
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full bg-gold-gradient text-primary-foreground">
              Sign In
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold">VION Admin</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setTab("portfolio")}
            className={`pb-2 text-sm font-body tracking-wider uppercase transition-colors ${
              tab === "portfolio"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`pb-2 text-sm font-body tracking-wider uppercase transition-colors ${
              tab === "gallery"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Gallery
          </button>
        </div>

        {/* Portfolio Tab */}
        {tab === "portfolio" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold">Portfolio Items</h2>
              <Button onClick={addPortfolioItem} className="bg-gold-gradient text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> Add Work
              </Button>
            </div>

            {editItem && (
              <div className="border border-border rounded-sm p-6 mb-6 space-y-4 bg-card">
                <Input
                  placeholder="Title"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                />
                <Input
                  placeholder="Category (e.g., Festival, Corporate)"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                />
                <Input
                  placeholder="Image URL"
                  value={editItem.image}
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                />
                <Input
                  placeholder="Impact (e.g., 5,000+ attendees)"
                  value={editItem.impact}
                  onChange={(e) => setEditItem({ ...editItem, impact: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={saveEditItem} className="bg-gold-gradient text-primary-foreground">
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditItem(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-border rounded-sm p-4"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-14 object-cover rounded-sm"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.category}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditItem({ ...item })}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePortfolioItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {portfolio.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No portfolio items yet. Click "Add Work" to get started.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === "gallery" && (
          <div>
            <h2 className="font-display text-xl font-semibold mb-6">Gallery Images</h2>
            <div className="border border-border rounded-sm p-6 mb-6 space-y-4 bg-card">
              <Input
                placeholder="Image URL"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
              />
              <Input
                placeholder="Alt text (optional)"
                value={newGalleryAlt}
                onChange={(e) => setNewGalleryAlt(e.target.value)}
              />
              <Button onClick={addGalleryImage} className="bg-gold-gradient text-primary-foreground">
                <ImageIcon className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-32 object-cover rounded-sm"
                  />
                  <button
                    onClick={() => deleteGalleryImage(img.id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            {gallery.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">
                No gallery images yet. Add image URLs above.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
