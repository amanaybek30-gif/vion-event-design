import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, LogOut, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  impact: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const getPublicUrl = (path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/images/${path}`;

const Admin = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"portfolio" | "gallery">("portfolio");

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [newGalleryAlt, setNewGalleryAlt] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);

  const portfolioFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (authed) {
      fetchPortfolio();
      fetchGallery();
    }
  }, [authed]);

  const fetchPortfolio = async () => {
    const { data } = await supabase.from("portfolio_items").select("*").order("created_at");
    if (data) setPortfolio(data);
  };

  const fetchGallery = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at");
    if (data) setGallery(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Invalid credentials");
    else setError("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    return getPublicUrl(path);
  };

  const handlePortfolioImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editItem) return;
    setUploading(true);
    const url = await uploadImage(file, "portfolio");
    if (url) setEditItem({ ...editItem, image: url });
    setUploading(false);
  };

  const addPortfolioItem = () => {
    setEditItem({ id: "", image: "", title: "", category: "", description: "", impact: "" });
  };

  const saveEditItem = async () => {
    if (!editItem) return;
    if (editItem.id) {
      await supabase.from("portfolio_items").update({
        image: editItem.image,
        title: editItem.title,
        category: editItem.category,
        description: editItem.description,
        impact: editItem.impact,
      }).eq("id", editItem.id);
    } else {
      await supabase.from("portfolio_items").insert({
        image: editItem.image,
        title: editItem.title,
        category: editItem.category,
        description: editItem.description,
        impact: editItem.impact,
      });
    }
    setEditItem(null);
    fetchPortfolio();
  };

  const deletePortfolioItem = async (id: string) => {
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchPortfolio();
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryUploading(true);
    const url = await uploadImage(file, "gallery");
    if (url) {
      await supabase.from("gallery_images").insert({
        src: url,
        alt: newGalleryAlt.trim() || "Gallery image",
      });
      setNewGalleryAlt("");
      fetchGallery();
    }
    setGalleryUploading(false);
    if (galleryFileRef.current) galleryFileRef.current.value = "";
  };

  const deleteGalleryImage = async (id: string) => {
    await supabase.from("gallery_images").delete().eq("id", id);
    fetchGallery();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-secondary-foreground">Loading...</p>
      </div>
    );
  }

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
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary-foreground/10 border-border/30 text-secondary-foreground placeholder:text-secondary-foreground/40" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary-foreground/10 border-border/30 text-secondary-foreground placeholder:text-secondary-foreground/40" />
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-gold-gradient text-primary-foreground">Sign In</Button>
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

        <div className="flex gap-4 mb-8 border-b border-border">
          <button onClick={() => setTab("portfolio")}
            className={`pb-2 text-sm font-body tracking-wider uppercase transition-colors ${tab === "portfolio" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
            Portfolio
          </button>
          <button onClick={() => setTab("gallery")}
            className={`pb-2 text-sm font-body tracking-wider uppercase transition-colors ${tab === "gallery" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
            Gallery
          </button>
        </div>

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
                <Input placeholder="Title" value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} />
                <Input placeholder="Category (e.g., Festival, Corporate)" value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} />

                {/* Image upload */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground font-body">Image</label>
                  {editItem.image && (
                    <img src={editItem.image} alt="Preview" className="w-32 h-20 object-cover rounded-sm border border-border" />
                  )}
                  <input type="file" accept="image/*" ref={portfolioFileRef} onChange={handlePortfolioImageUpload} className="hidden" />
                  <Button type="button" variant="outline" size="sm" disabled={uploading}
                    onClick={() => portfolioFileRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>

                <Textarea placeholder="Description" value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} />
                <Input placeholder="Impact (e.g., 5,000+ attendees)" value={editItem.impact} onChange={(e) => setEditItem({ ...editItem, impact: e.target.value })} />
                <div className="flex gap-2">
                  <Button onClick={saveEditItem} className="bg-gold-gradient text-primary-foreground">Save</Button>
                  <Button variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {portfolio.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border border-border rounded-sm p-4">
                  {item.image && <img src={item.image} alt={item.title} className="w-20 h-14 object-cover rounded-sm" />}
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.category}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setEditItem({ ...item })}>Edit</Button>
                  <Button variant="ghost" size="icon" onClick={() => deletePortfolioItem(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {portfolio.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">No portfolio items yet. Click "Add Work" to get started.</p>
              )}
            </div>
          </div>
        )}

        {tab === "gallery" && (
          <div>
            <h2 className="font-display text-xl font-semibold mb-6">Gallery Images</h2>
            <div className="border border-border rounded-sm p-6 mb-6 space-y-4 bg-card">
              <Input placeholder="Alt text (optional)" value={newGalleryAlt} onChange={(e) => setNewGalleryAlt(e.target.value)} />
              <input type="file" accept="image/*" ref={galleryFileRef} onChange={handleGalleryUpload} className="hidden" />
              <Button onClick={() => galleryFileRef.current?.click()} disabled={galleryUploading} className="bg-gold-gradient text-primary-foreground">
                <Upload className="w-4 h-4 mr-2" /> {galleryUploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative group">
                  <img src={img.src} alt={img.alt} className="w-full h-32 object-cover rounded-sm" />
                  <button onClick={() => deleteGalleryImage(img.id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            {gallery.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">No gallery images yet. Upload images above.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
