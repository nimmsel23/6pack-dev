// Frame-Zeitstempel und Vorschaubilder für das Schnittfenster.
// Weg 1: mediabunny liest den Container (echte Frame-Zeiten, auch VFR vom Handy)
//        und dekodiert Vorschaubilder. Braucht Range/CORS auf der Datei-URL.
// Weg 2: verstecktes <video>, das gesucht und auf Canvas gezeichnet wird.
//        Geht ohne CORS (Canvas bleibt nur anzeigbar), Frames dann als Raster.
const MAX_PACKETS = 20000;

export async function openMedia(url) {
  const { Input, UrlSource, ALL_FORMATS, EncodedPacketSink, CanvasSink } = await import('mediabunny');
  const input = new Input({ source: new UrlSource(url), formats: ALL_FORMATS });
  try {
    const track = await input.getPrimaryVideoTrack();
    if (!track) throw new Error('Keine Videospur.');
    const packets = new EncodedPacketSink(track);
    const frames = [];
    let packet = await packets.getFirstPacket({ metadataOnly: true });
    while (packet && frames.length < MAX_PACKETS) {
      frames.push(packet.timestamp);
      packet = await packets.getNextPacket(packet, { metadataOnly: true });
    }
    if (frames.length < 2) throw new Error('Keine Frames lesbar.');
    frames.sort((a, b) => a - b);
    const canDecode = await track.canDecode().catch(() => false);
    const [width, height] = await Promise.all([track.getDisplayWidth(), track.getDisplayHeight()]).catch(() => [0, 0]);
    const aspect = width && height ? width / height : 16 / 9;
    return {
      exact: true,
      frames,
      aspect,
      sink: canDecode ? new CanvasSink(track, { height: 96 }) : null,
      dispose: () => input.dispose(),
    };
  } catch (error) {
    input.dispose();
    throw error;
  }
}

// Vorschaubilder für sortierte Zeitpunkte; ruft onThumb(index, canvas) laufend.
export async function decodeThumbs(media, times, onThumb, isCancelled) {
  let index = 0;
  for await (const wrapped of media.sink.canvasesAtTimestamps(times)) {
    if (isCancelled()) return;
    if (wrapped?.canvas) onThumb(index, wrapped.canvas);
    index += 1;
  }
}

export async function seekThumbs(url, times, onThumb, isCancelled) {
  const video = document.createElement('video');
  video.muted = true;
  video.preload = 'auto';
  video.playsInline = true;
  video.src = url;
  const once = (name, timeout = 8000) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { cleanup(); reject(new Error(`${name} timeout`)); }, timeout);
    const ok = () => { cleanup(); resolve(); };
    const fail = () => { cleanup(); reject(new Error('Videofehler')); };
    const cleanup = () => { clearTimeout(timer); video.removeEventListener(name, ok); video.removeEventListener('error', fail); };
    video.addEventListener(name, ok);
    video.addEventListener('error', fail);
  });
  try {
    if (video.readyState < 1) await once('loadedmetadata');
    const height = 96;
    const width = Math.max(1, Math.round(height * (video.videoWidth / video.videoHeight || 16 / 9)));
    for (let index = 0; index < times.length; index += 1) {
      if (isCancelled()) return;
      const seeked = once('seeked');
      video.currentTime = times[index];
      await seeked;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(video, 0, 0, width, height);
      onThumb(index, canvas);
    }
  } finally {
    video.removeAttribute('src');
    video.load?.();
  }
}
