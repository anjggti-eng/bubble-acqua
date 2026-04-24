const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Tag, Loader2, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CouponManager({ shop }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: '',
    title: '',
    description: '',
    discount_type: 'percent',
    discount_value: '',
    expires_at: '',
  });

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons', shop.id],
    queryFn: () => db.entities.Coupon.filter({ barbershop_id: shop.id }),
  });

  const createMutation = useMutation({
    mutationFn: (data) => db.entities.Coupon.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons', shop.id] });
      toast({ title: 'Cupom criado!' });
      setShowForm(false);
      setForm({ code: '', title: '', description: '', discount_type: 'percent', discount_value: '', expires_at: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => db.entities.Coupon.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons', shop.id] });
      toast({ title: 'Cupom removido' });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }) => db.entities.Coupon.update(id, { active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons', shop.id] }),
  });

  const handleSave = () => {
    if (!form.code.trim() || !form.title.trim() || !form.discount_value) {
      toast({ title: 'Preencha código, título e desconto', variant: 'destructive' });
      return;
    }
    createMutation.mutate({
      barbershop_id: shop.id,
      barbershop_name: shop.name,
      ...form,
      code: form.code.toUpperCase().trim(),
      discount_value: Number(form.discount_value),
      active: true,
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({ title: `Código ${code} copiado!` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Promoções & Cupons</h3>
        <Button size="sm" onClick={() => setShowForm(v => !v)} className="h-8 text-xs">
          <Plus className="w-3.5 h-3.5 mr-1" /> Novo Cupom
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Código *</Label>
              <Input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value }))}
                placeholder="EX: BARBER10" className="bg-secondary uppercase h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tipo</Label>
              <select
                value={form.discount_type}
                onChange={e => setForm(p => ({ ...p, discount_type: e.target.value }))}
                className="w-full h-9 rounded-md border border-input bg-secondary text-sm px-2"
              >
                <option value="percent">Porcentagem (%)</option>
                <option value="fixed">Valor fixo (R$)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Título *</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="10% de desconto" className="bg-secondary h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Desconto *</Label>
              <Input type="number" value={form.discount_value} onChange={e => setForm(p => ({ ...p, discount_value: e.target.value }))}
                placeholder={form.discount_type === 'percent' ? '10' : '15.00'} className="bg-secondary h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Descrição</Label>
            <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Ex: Válido para corte + barba" className="bg-secondary text-sm h-16" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Expira em</Label>
            <Input type="date" value={form.expires_at} onChange={e => setForm(p => ({ ...p, expires_at: e.target.value }))}
              className="bg-secondary h-9 text-sm" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={createMutation.isPending} className="flex-1 h-9">
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar Cupom'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowForm(false)} className="h-9">Cancelar</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1,2].map(i => <div key={i} className="h-20 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      ) : coupons.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <Tag className="w-8 h-8 mx-auto mb-2 opacity-40" />
          Nenhum cupom criado
        </div>
      ) : (
        <div className="space-y-3">
          {coupons.map(c => (
            <div key={c.id} className={`rounded-xl border p-3 flex items-start gap-3 ${c.active ? 'border-primary/20 bg-primary/5' : 'border-border bg-secondary/30 opacity-60'}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-primary text-sm">{c.code}</span>
                  <button onClick={() => copyCode(c.code)} className="text-muted-foreground hover:text-primary">
                    <Copy className="w-3 h-3" />
                  </button>
                  <Badge variant={c.active ? 'default' : 'secondary'} className="text-xs py-0">
                    {c.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <p className="text-xs font-semibold">{c.title}</p>
                {c.description && <p className="text-xs text-muted-foreground">{c.description}</p>}
                <p className="text-xs text-primary font-semibold mt-1">
                  {c.discount_type === 'percent' ? `${c.discount_value}% de desconto` : `R$ ${Number(c.discount_value).toFixed(2)} de desconto`}
                  {c.expires_at && ` · Até ${c.expires_at}`}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => toggleMutation.mutate({ id: c.id, active: !c.active })}
                  className="text-xs text-muted-foreground hover:text-foreground underline">
                  {c.active ? 'Desativar' : 'Ativar'}
                </button>
                <button onClick={() => deleteMutation.mutate(c.id)} className="text-destructive hover:opacity-70">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}