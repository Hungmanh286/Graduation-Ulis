import { useState } from 'react';

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 17 + 8) % 100}%`,
  delay: `${(index % 9) * -1.7}s`,
  duration: `${10 + (index % 6) * 1.4}s`,
  size: `${8 + (index % 5) * 3}px`,
}));

const inviteeName = 'gia đình và bạn bè';

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
        <span className="envelope-label">
          <strong>Graduation Party</strong>
          <small>
            Kính mời: <b>{invitee}</b>
          </small>
          <span>Please join us for a</span>
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

export default function App() {
  const [stage, setStage] = useState('sealed');

  const openInvitation = () => {
    if (stage !== 'sealed') return;

    setStage('opening');
    window.setTimeout(() => setStage('opened'), 950);
  };

  return (
    <main className={`page ${stage}`}>
      <PetalField />
      {stage === 'opened' ? (
        <InvitationContent />
      ) : (
        <CoverStage invitee={inviteeName} onOpen={openInvitation} stage={stage} />
      )}
    </main>
  );
}
