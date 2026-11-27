import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { videoDescriptor } from './exerciseMedia.js';
import { clipLoopHandlers } from './exerciseVideo.js';

function VideoDialog({ name, playback, onClose }) {
  const dialog = useRef(null);
  const [failed, setFailed] = useState(false);
  const video = videoDescriptor(playback.url);
  useEffect(() => {
    const element = dialog.current;
    if (!element.open) element.showModal();
  }, []);
  return <dialog ref={dialog} aria-label={`Übungsvideo: ${name}`} onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
    className="sixpack-video-dialog" style={{ width: 'min(92vw, 760px)', maxHeight: '90dvh', margin: 'auto', overflow: 'auto', padding: 0, background: '#111', color: '#fff', border: '1px solid #444', borderRadius: 12 }}>
    <div className="flex items-center justify-between gap-3 px-4 py-2">
      <h2 className="text-sm font-bold">{name}</h2>
      <button type="button" autoFocus aria-label="Video schließen" onClick={() => dialog.current.close()} className="p-3"><X size={20} /></button>
    </div>
    {failed || !video ? <p role="status" className="p-4 text-sm">Video konnte nicht geladen werden. Schließe die Vorschau und versuche es erneut.</p>
      : video.kind === 'file' ? <video src={video.src} controls muted playsInline preload="metadata" className="w-full aspect-video bg-black object-contain" onError={() => setFailed(true)} {...clipLoopHandlers(playback.clip)} />
        : <iframe src={video.src} title={`Übungsvideo: ${name}`} className="w-full aspect-video border-0 bg-black" allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen />}
  </dialog>;
}

export default function ExerciseVideoPreview({ name, playback }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const trigger = useRef(null);
  const video = videoDescriptor(playback?.url);
  useEffect(() => setFailed(false), [playback?.url]);
  if (!video) return null;
  const close = () => { setOpen(false); trigger.current?.focus({ preventScroll: true }); };
  return <>
    <button ref={trigger} type="button" aria-label={`Video ansehen: ${name}`} onClick={() => setOpen(true)}
      className="relative shrink-0 overflow-hidden rounded-md border border-neutral-600 bg-black" style={{ width: 88, height: 56 }}>
      {video.kind === 'file' && !failed && <video key={video.src} src={`${video.src}${video.src.includes('#') ? '' : `#t=${playback.clip?.start ?? 0.1}`}`} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)} className="w-full h-full object-cover pointer-events-none" />}
      <span className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,.25)', color: '#fff' }}><Play size={22} fill="currentColor" /></span>
    </button>
    {open && <VideoDialog name={name} playback={playback} onClose={close} />}
  </>;
}
