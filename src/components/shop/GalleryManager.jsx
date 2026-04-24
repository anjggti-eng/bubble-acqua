const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Upload, Loader2 } from 'lucide-react';

const CATEGORIES = ['degradê', 'social', 'navalhado', 'barba', 'infantil', 'coloração', 'outro'];

export default function GalleryManager({ shopId }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'degradê', image_url: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: photos = [] } = useQuery({
    queryKey: ['shop-photos', shopId],
    queryFn: () => db.entities.GalleryPhoto.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => db.entities.GalleryPhoto.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['shop-photos', shopId] });
      const previous = queryClient.getQueryData(['shop-photos', shopId]);
      queryClient.setQueryData(['shop-photos', shopId], (old = []) => old.filter(p => p.id !== id));
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(['shop-photos', shopId], ctx.previous);
      toast({ title: 'Erro ao remover foto', variant: 'destructive' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop-photos'] });
      toast({ title: 'Foto removida' });
    },
  });

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await db.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, image_url: file_url }));
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!form.image_url) {
      toast({ title: 'Faça upload de uma foto', variant: 'destructive' });
      return;
    }
    setSaving(true);
    await db.entities.GalleryPhoto.create({
      barbershop_id: shopId,
      image_url: form.image_url,
      title: form.title,
      category: form.category,
    });
    setSaving(false);
    setForm({ title: '', category: 'degradê', image_url: '' });
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['shop-photos'] });
    toast({ title: 'Foto adicionada!' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">Galeria / Vitrine</h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-1" /> Nova Foto
        </Button>
      </div>

      {showForm && (
        <div className="p-4 bg-secondary rounded-xl space-y-3">
          <div className="space-y-2">
            <Label>Foto</Label>
            {form.image_url ? (
              <img src={form.image_url} alt="" className="w-full h-40 object-cover rounded-lg" />
            ) : (
              <label className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                {uploading ? <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /> : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Clique para upload</span>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            )}
          </div>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Degradê Americano" className="bg-card" />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger className="bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd} disabled={saving} className="flex-1 bg-primary text-primary-foreground">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Adicionar'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      {photos.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground text-sm">Nenhuma foto na galeria</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map(photo => (
            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden">
              <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover" />
              <button
                onClick={() => deleteMutation.mutate(photo.id)}
                className="absolute top-1 right-1 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}