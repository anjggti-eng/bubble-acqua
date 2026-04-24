const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { User, Mail, LogOut, Store, Trash2, Scissors, Camera, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, checkUserAuth } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isOwner = user?.role === 'admin';

  // Profile photo + bio editing
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingBio, setSavingBio] = useState(false);
  const fileRef = useRef();

  const switchRole = async () => {
    try {
      await db.auth.updateMe({ role: isOwner ? 'user' : 'admin' });
      await checkUserAuth();
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const appointments = await db.entities.Appointment.filter({ client_email: user?.email });
    await Promise.all(appointments.map(a => db.entities.Appointment.delete(a.id)));
    await db.auth.logout();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPhoto(true);
    const { file_url } = await db.integrations.Core.UploadFile({ file });
    await db.auth.updateMe({ profile_photo: file_url });
    setUploadingPhoto(false);
    window.location.reload();
  };

  const saveBio = async () => {
    setSavingBio(true);
    await db.auth.updateMe({ bio });
    setSavingBio(false);
    setEditingBio(false);
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="font-heading text-2xl font-bold mb-6">Perfil</h1>

      {/* Avatar + info */}
      <div className="bg-card rounded-xl border border-border p-6 mb-4">
        <div className="flex items-start gap-4 mb-5">
          {/* Avatar com upload */}
          <div className="relative shrink-0">
            {user?.profile_photo ? (
              <img
                src={user.profile_photo}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadingPhoto}
              className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              {uploadingPhoto
                ? <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                : <Camera className="w-3.5 h-3.5 text-primary-foreground" />
              }
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-lg font-semibold">{user?.full_name || 'Usuário'}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
              <Mail className="w-3.5 h-3.5 shrink-0" /> {user?.email}
            </p>
            <Badge className={`mt-2 ${isOwner ? 'bg-primary/10 text-primary border-primary/20 border' : 'bg-secondary text-muted-foreground'}`}>
              {isOwner ? '✂️ Dono de Barbearia' : '👤 Cliente'}
            </Badge>
          </div>
        </div>

        {/* Bio */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sobre mim</span>
            {!editingBio && (
              <button onClick={() => { setEditingBio(true); setBio(user?.bio || ''); }} className="text-xs text-primary">
                Editar
              </button>
            )}
          </div>
          {editingBio ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Escreva uma bio curta sobre você..."
                maxLength={160}
                rows={3}
                className="w-full bg-secondary rounded-lg border border-border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{bio.length}/160</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingBio(false)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={saveBio} disabled={savingBio} className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    {savingBio
                      ? <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      : <Check className="w-4 h-4 text-primary-foreground" />
                    }
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {user?.bio || <span className="italic opacity-60">Sem bio ainda. Toque em Editar para adicionar.</span>}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card rounded-xl border border-border p-4 mb-4 space-y-2">
        {isOwner && (
          <Link to="/minha-loja">
            <Button variant="outline" className="w-full justify-start h-12 border-border">
              <Store className="w-5 h-5 mr-3 text-primary" />
              Minha Barbearia
            </Button>
          </Link>
        )}
        <Button
          variant="outline"
          className="w-full justify-start h-12 border-border text-muted-foreground"
          onClick={switchRole}
        >
          <Scissors className="w-5 h-5 mr-3 text-muted-foreground" />
          {isOwner ? 'Mudar para Modo Cliente' : 'Sou Dono de Barbearia'}
        </Button>
      </div>

      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 h-12"
          onClick={() => db.auth.logout()}
        >
          <LogOut className="w-5 h-5 mr-2" /> Sair
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-10 text-sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Excluir minha conta
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading">Excluir conta?</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os seus agendamentos serão removidos. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Excluindo...' : 'Sim, excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}