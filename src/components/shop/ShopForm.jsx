const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const DAYS = [
  { value: 'segunda', label: 'Seg' },
  { value: 'terca', label: 'Ter' },
  { value: 'quarta', label: 'Qua' },
  { value: 'quinta', label: 'Qui' },
  { value: 'sexta', label: 'Sex' },
  { value: 'sabado', label: 'Sáb' },
  { value: 'domingo', label: 'Dom' },
];

export default function ShopForm({ shop, onSaved }) {
  const [form, setForm] = useState({
    name: shop?.name || '',
    description: shop?.description || '',
    address: shop?.address || '',
    phone: shop?.phone || '',
    latitude: shop?.latitude || '',
    longitude: shop?.longitude || '',
    opening_hour: shop?.opening_hour || '08:00',
    closing_hour: shop?.closing_hour || '20:00',
    working_days: shop?.working_days || ['segunda','terca','quarta','quinta','sexta','sabado'],
    cover_image: shop?.cover_image || '',
    logo: shop?.logo || '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const { toast } = useToast();

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleUploadCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const { file_url } = await db.integrations.Core.UploadFile({ file });
    handleChange('cover_image', file_url);
    setUploadingCover(false);
  };

  const toggleDay = (day) => {
    setForm(prev => ({
      ...prev,
      working_days: prev.working_days.includes(day)
        ? prev.working_days.filter(d => d !== day)
        : [...prev.working_days, day]
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast({ title: 'Preencha nome e endereço', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const data = {
      ...form,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
    };
    if (shop?.id) {
      await db.entities.Barbershop.update(shop.id, data);
    } else {
      await db.entities.Barbershop.create({ ...data, owner_email: (await db.auth.me()).email });
    }
    setLoading(false);
    toast({ title: 'Barbearia salva!' });
    onSaved();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Foto de Capa</Label>
        <div className="relative h-32 rounded-xl bg-secondary border border-dashed border-border overflow-hidden">
          {form.cover_image ? (
            <img src={form.cover_image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Sem foto de capa
            </div>
          )}
          <label className="absolute bottom-2 right-2 cursor-pointer z-10">
            <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border shadow-sm hover:bg-secondary/80 transition ${uploadingCover ? 'opacity-60 pointer-events-none' : ''}`}>
              {uploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploadingCover ? 'Enviando...' : 'Upload'}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadCover} disabled={uploadingCover} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label>Nome da Barbearia *</Label>
          <Input value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Ex: Barbearia Vintage" className="bg-secondary" />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Fale sobre sua barbearia..." className="bg-secondary h-20" />
        </div>
        <div className="space-y-2">
          <Label>Endereço *</Label>
          <Input value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="Rua, número, bairro, cidade" className="bg-secondary" />
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="(11) 99999-9999" className="bg-secondary" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Abertura</Label>
            <Input type="time" value={form.opening_hour} onChange={e => handleChange('opening_hour', e.target.value)} className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Fechamento</Label>
            <Input type="time" value={form.closing_hour} onChange={e => handleChange('closing_hour', e.target.value)} className="bg-secondary" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Latitude</Label>
            <Input type="number" step="any" value={form.latitude} onChange={e => handleChange('latitude', e.target.value)} placeholder="-23.55" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Longitude</Label>
            <Input type="number" step="any" value={form.longitude} onChange={e => handleChange('longitude', e.target.value)} placeholder="-46.63" className="bg-secondary" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Dias de funcionamento</Label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map(d => (
              <label key={d.value} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-all ${
                form.working_days.includes(d.value) ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border text-muted-foreground'
              }`}>
                <input type="checkbox" className="hidden" checked={form.working_days.includes(d.value)} onChange={() => toggleDay(d.value)} />
                {d.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={loading} className="w-full bg-primary text-primary-foreground h-12 font-semibold">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Salvar Barbearia</>}
      </Button>
    </div>
  );
}