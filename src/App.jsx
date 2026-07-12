import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import applauseTrack from '../VỖ TAY.mp3';

const petals = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 13 + 5) % 100}%`,
  delay: `${(index % 14) * -1.1}s`,
  duration: `${8 + (index % 7) * 1.15}s`,
  size: `${7 + (index % 6) * 2.4}px`,
}));

const defaultInviteeName = 'gia đình và bạn bè';
const musicTitle = 'Vỗ tay';
const musicStartTime = 51;
const musicEndTime = 80;
const musicSegmentSrc = `${applauseTrack}#t=${musicStartTime},${musicEndTime}`;

function getInviteeName(searchParams) {
  const guest = searchParams.get('guest')?.trim().replace(/\s+/g, ' ');

  return guest || defaultInviteeName;
}

function GraduationEmblem() {
  return (
    <span className="graduation-emblem" aria-hidden="true">
      <svg viewBox="0 0 220 150" role="img" focusable="false">
        <defs>
          <linearGradient id="capShade" x1="16" y1="22" x2="188" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#202126" />
            <stop offset="0.58" stopColor="#111216" />
            <stop offset="1" stopColor="#2a2b31" />
          </linearGradient>
          <linearGradient id="ribbonShade" x1="74" y1="50" x2="150" y2="98" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffd5de" />
            <stop offset="0.54" stopColor="#e9a8b9" />
            <stop offset="1" stopColor="#c7758c" />
          </linearGradient>
          <linearGradient id="tasselShade" x1="46" y1="84" x2="72" y2="144" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffd8df" />
            <stop offset="1" stopColor="#d88ca0" />
          </linearGradient>
        </defs>
        <path
          d="M109 8 14 48l95 39 97-39L109 8Z"
          fill="url(#capShade)"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M65 61c18 15 72 15 90 0l-8 42c-18 15-55 16-75 0L65 61Z"
          fill="#1a1b20"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M112 53c-16-20-43-23-62-7 13 13 31 18 52 17-13 11-16 26-9 44 15-10 22-26 19-54Z"
          fill="url(#ribbonShade)"
        />
        <path
          d="M116 53c18-20 47-22 64-7-12 13-30 18-51 17 13 11 15 27 7 44-14-11-21-27-20-54Z"
          fill="url(#ribbonShade)"
        />
        <circle cx="113" cy="60" r="13" fill="#f2bccb" stroke="#ffffff" strokeOpacity="0.54" strokeWidth="3" />
        <path d="M61 69c-8 17-12 36-12 59" fill="none" stroke="#f0aabd" strokeWidth="6" strokeLinecap="round" />
        <path d="M48 126h25l-5 17H53l-5-17Z" fill="url(#tasselShade)" />
        <path d="M58 82c4 6 9 6 13 0" fill="none" stroke="#f4c6d0" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PetalField() {
  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          style={{
            '--left': petal.left,
            '--delay': petal.delay,
            '--duration': petal.duration,
            '--size': petal.size,
          }}
        />
      ))}
    </div>
  );
}

function CoverStage({ invitee, onOpen, stage }) {
  const isOpening = stage === 'opening';

  return (
    <section className={`cover-stage ${isOpening ? 'opening' : ''}`} aria-label="Phong bì thiệp mời">
      <button className="envelope-cover" disabled={isOpening} onClick={onOpen} type="button">
        <span className="envelope-glow" />
        <span className="envelope-liner" />
        <span className="letter-peek">
          <img alt="" src="/assets/page-1.png" />
        </span>
        <span className="envelope-paper" />
        <span className="envelope-flap-top" />
        <span className="envelope-side left" />
        <span className="envelope-side right" />
        <span className="envelope-pocket" />
        <span className="envelope-date">24 / 07 / 2026</span>
        <GraduationEmblem />
        <span className="envelope-label">
          <strong>Graduation Party</strong>
          <small>
            Kính mời: <b>{invitee}</b>
          </small>
          <em>24 | 07 | 2026</em>
        </span>
        <span className="open-seal">
          <span>Mở thiệp</span>
        </span>
      </button>
    </section>
  );
}

function InvitationContent() {
  return (
    <section className="content-stage" aria-label="Nội dung thiệp mời">
      <article className="content-card">
        <span className="paper-shine" aria-hidden="true" />
        <img alt="Nội dung thiệp mời tốt nghiệp" src="/assets/page-1.png" />
      </article>
    </section>
  );
}

function MusicWidget({ isPlaying, isReady, onToggle }) {
  return (
    <aside className="music-widget" aria-label="Điều khiển nhạc nền">
      <div className="music-orb" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M9 18V5l10-2v13" />
          <circle cx="7" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      </div>
      <div className="music-copy">
        <span>{isPlaying ? 'Đang phát' : isReady ? 'Nhạc nền' : 'Đang tải'}</span>
        <strong>{musicTitle}</strong>
      </div>
      <button className="music-toggle" type="button" onClick={onToggle} aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M8 5v14M16 5v14" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M8 5v14l11-7-11-7Z" />
          </svg>
        )}
      </button>
    </aside>
  );
}

export default function App() {
  const [searchParams] = useSearchParams();
  const [stage, setStage] = useState('sealed');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicReady, setIsMusicReady] = useState(false);
  const musicRef = useRef(null);
  const hasStartedMusicRef = useRef(false);
  const inviteeName = useMemo(() => getInviteeName(searchParams), [searchParams]);

  const resetMusicToSegmentStart = useCallback(() => {
    const music = musicRef.current;

    if (!music) return false;

    try {
      music.currentTime = musicStartTime;
      return true;
    } catch {
      return false;
    }
  }, []);

  const keepMusicInsideSegment = useCallback(() => {
    const music = musicRef.current;

    if (!music) return;

    if (music.currentTime < musicStartTime || music.currentTime >= musicEndTime) {
      resetMusicToSegmentStart();
    }
  }, [resetMusicToSegmentStart]);

  const playInvitationMusic = useCallback((shouldResetSegment = false) => {
    const music = musicRef.current;

    if (!music) return;

    const isOutsideSelectedSegment = music.currentTime < musicStartTime || music.currentTime >= musicEndTime;

    if ((shouldResetSegment || !hasStartedMusicRef.current || isOutsideSelectedSegment) && !resetMusicToSegmentStart()) {
      return;
    }

    music
      .play()
      .then(() => {
        hasStartedMusicRef.current = true;
        setIsMusicPlaying(true);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  }, [resetMusicToSegmentStart]);

  useEffect(() => {
    playInvitationMusic();

    const startMusicOnInteraction = () => playInvitationMusic();

    window.addEventListener('pointerdown', startMusicOnInteraction, { once: true });
    window.addEventListener('keydown', startMusicOnInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startMusicOnInteraction);
      window.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, [playInvitationMusic]);

  useEffect(() => {
    if (!isMusicPlaying) return undefined;

    const segmentGuard = window.setInterval(keepMusicInsideSegment, 200);

    return () => window.clearInterval(segmentGuard);
  }, [isMusicPlaying, keepMusicInsideSegment]);

  const handleMusicMetadata = () => {
    setIsMusicReady(true);
    resetMusicToSegmentStart();
  };

  const loopMusicSegment = () => {
    const music = musicRef.current;

    if (!music) return;

    if (music.currentTime < musicEndTime && music.currentTime >= musicStartTime) return;

    resetMusicToSegmentStart();

    if (!music.paused) {
      music.play().catch(() => {});
    }
  };

  const toggleInvitationMusic = () => {
    const music = musicRef.current;

    if (!music) return;

    if (isMusicPlaying) {
      music.pause();
      setIsMusicPlaying(false);
      return;
    }

    playInvitationMusic(true);
  };

  const openInvitation = () => {
    if (stage !== 'sealed') return;

    playInvitationMusic(true);
    setStage('opening');
    window.setTimeout(() => setStage('opened'), 950);
  };

  return (
    <main className={`page ${stage}`}>
      <PetalField />
      <MusicWidget isPlaying={isMusicPlaying} isReady={isMusicReady} onToggle={toggleInvitationMusic} />
      {stage === 'opened' ? (
        <InvitationContent />
      ) : (
        <CoverStage invitee={inviteeName} onOpen={openInvitation} stage={stage} />
      )}
      <audio
        ref={musicRef}
        preload="auto"
        src={musicSegmentSrc}
        onCanPlay={() => playInvitationMusic()}
        onLoadedMetadata={handleMusicMetadata}
        onLoadedData={() => setIsMusicReady(true)}
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onTimeUpdate={loopMusicSegment}
        onEnded={loopMusicSegment}
      />
    </main>
  );
}
