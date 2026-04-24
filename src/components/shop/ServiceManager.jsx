const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import ServiceCard from '@/components/shared/ServiceCard';

export default function ServiceManager({ shopId }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', duration_minutes: '30' });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services = [] } = useQuery({
    queryKey: ['shop-services', shopId],
    queryFn: () => db.entities.Service.filter({ barbershop_id: shopId }),
    enabled: !!shopId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => db.entities.Service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop-services'] });
      toast({ title: 'Serviço removido' });
    },
  });

  const handleAdd = async () => {
    if (!form.name.trim() || !form.price) {
      toast({ title: 'Preencha nome e preço', variant: 'destructive' });
      return;
    }
    setSaving(true);
    await db.entities.Service.create({
      barbershop_id: shopId,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      duration_minutes: Number(form.duration_minutes),
    });
    setSaving(false);
    setForm({ name: '', description: '', price: '', duration_minutes: '30' });
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['shop-services'] });
    toast({ title: 'Serviço adicionado!' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">Serviços</h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-1" /> Novo
        </Button>
      </div>

      {showForm && (
        <div className="p-4 bg-secondary rounded-xl space-y-3">
          <div className="space-y-2">
            <Label>Nome do serviço</Label>
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ex: Corte Degradê" className="bg-card" />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Breve descrição" className="bg-card" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Preço (R$)</Label>
              <Input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="35.00" className="bg-card" />
            </div>
            <div className="space-y-2">
              <Label>Duração (min)</Label>
              <Input type="number" value={form.duration_minutes} onChange={e => setForm(p => ({ ...p, duration_minutes: e.target.value }))} placeholder="30" className="bg-card" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd} disabled={saving} className="flex-1 bg-primary text-primary-foreground">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Adicionar'}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground text-sm">Nenhum serviço cadastrado</p>
      ) : (
        <div className="space-y-3">
          {services.map(s => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex-1">
                <ServiceCard service={s} />
              </div>
              <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(s.id)} className="text-destructive hover:bg-destructive/10 flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}