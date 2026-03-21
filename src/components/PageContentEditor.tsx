import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { fetchAllPageContents, savePageContent } from "@/hooks/usePageContent";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea";
}

interface PageContentEditorProps {
  page: string;
  fields: FieldDef[];
  defaults: Record<string, string>;
}

const PageContentEditor = ({ page, fields, defaults }: PageContentEditorProps) => {
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchAllPageContents(page).then((data) => {
      const merged = { ...defaults };
      Object.entries(data).forEach(([k, v]) => (merged[k] = v));
      setValues(merged);
    });
  }, [page]);

  const handleSave = async () => {
    setSaving(true);
    for (const field of fields) {
      await savePageContent(page, field.key, values[field.key] || "");
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="text-sm text-muted-foreground font-body mb-1 block">{field.label}</label>
          {field.type === "textarea" ? (
            <Textarea
              value={values[field.key] || ""}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              rows={3}
            />
          ) : (
            <Input
              value={values[field.key] || ""}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
            />
          )}
        </div>
      ))}
      <Button onClick={handleSave} disabled={saving} className="bg-gold-gradient text-primary-foreground">
        <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </Button>
    </div>
  );
};

export default PageContentEditor;
