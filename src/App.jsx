import React, { useEffect, useRef, useState } from 'react';
import { experience, projects } from './data.js';

const LINKS = {
  resume: '',
  linkedin: 'https://www.linkedin.com/in/stellar-shar',
  github: '',
  email: 'sharstellar@gmail.com'
};

// PINK DOODLES

function Star({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <path
        d="M21 2 25 15 38 10 29 22 41 29 26 27 21 42 17 27 3 31 13 22 5 10 17 15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SmallSparkle() {
  return (
    <svg className="small-sparkle" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1 15 9 23 12 15 15 12 23 9 15 1 12 9 9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Heart({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 21C9 18 2 13 2 7.5 2 2 9 1 12 6 15 1 22 2 22 7.5 22 13 15 18 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowDoodle() {
  return (
    <svg
      className="arrow-doodle"
      viewBox="0 0 30 22"
      aria-hidden="true"
    >
      <path
        d="M2 16Q12 1 28 7M23 3 29 7 24 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// LINKS

function TextLink({ href, children }) {
  if (!href) return null;

  const external = href.startsWith('http');

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children} ↗
    </a>
  );
}

const CONTACT_LINKS = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'email', label: 'Email' }
];

function ContactIcon({ type }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {type === 'linkedin' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" />
          <circle cx="7.5" cy="8" r="1.2" fill="white" />
          <path d="M7.5 11v6M11.5 17v-6m0 2.5c0-3.5 5-3.5 5 0V17" fill="none" stroke="white" strokeWidth="2" />
        </>
      )}
      {type === 'email' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </g>
      )}
    </svg>
  );
}

function ContactLinks() {
  return (
    <div className="contact-links" aria-label="Connect with me">
      {CONTACT_LINKS.map(({ key, label }) => {
        const href = key === 'email' ? `mailto:${LINKS.email}` : LINKS[key];
        const content = <><ContactIcon type={key} /><span>{label}</span></>;

        return href ? (
          <a
            key={key}
            className="contact-social"
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel={key === 'email' ? undefined : 'noreferrer'}
          >
            {content}
          </a>
        ) : (
          <span
            key={key}
            className="contact-social contact-placeholder"
            aria-disabled="true"
            title={`${label} profile coming soon`}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

// EXPERIENCE SECTION

function ExperienceSection() {
  const [tab, setTab] = useState('work');
  const [expanded, setExpanded] = useState(null);

  const changeTab = (newTab) => {
    setTab(newTab);
    setExpanded(null);
  };

  return (
    <section
      className="section experience-section"
      id="experience"
    >
      <div className="section-heading">
        <div className="heading-with-doodle">
          <h2>Experience</h2>
          <ArrowDoodle />
        </div>

        <span>01 / EXPERIENCE</span>
      </div>

      <div
        className="tabs"
        role="tablist"
        aria-label="Experience category"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'work'}
          className={tab === 'work' ? 'active' : ''}
          onClick={() => changeTab('work')}
        >
          Work Experience
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={tab === 'leadership'}
          className={tab === 'leadership' ? 'active' : ''}
          onClick={() => changeTab('leadership')}
        >
          Leadership
        </button>
      </div>

      <div className="experience-list">
        {experience[tab].map((item, index) => {
          const isExpanded = expanded === index;

          return (
            <div
              className="experience-row"
              key={`${tab}-${item.organization}-${item.role}`}
            >
              <button
                type="button"
                className="experience-toggle"
                aria-expanded={isExpanded}
                onClick={() =>
                  setExpanded(isExpanded ? null : index)
                }
              >
                <span className="experience-main">
                  <strong>{item.role}</strong>
                  <span>{item.organization}</span>
                </span>

                <span className="experience-side">
                  <span>{item.dates}</span>
                  <span className="expand-symbol">
                    {isExpanded ? '−' : '+'}
                  </span>
                </span>
              </button>

              {isExpanded && (
                <ul className="experience-description">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// PROJECT POPUP MODAL

function ProjectModal({ index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const project = projects[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();
    dialogRef.current?.scrollTo({ top: 0 });

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowRight') {
        onChange((index + 1) % projects.length);
      }

      if (event.key === 'ArrowLeft') {
        onChange(
          (index - 1 + projects.length) % projects.length
        );
      }

      if (event.key === 'Tab') {
        const buttons = [
          ...dialogRef.current.querySelectorAll(
            'button:not([disabled])'
          )
        ];

        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [index, onClose, onChange]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="modal-top">
          <span>
            PROJECT / {String(index + 1).padStart(2, '0')}
          </span>

          <button type="button" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-category">
          {project.category}
        </div>

        <h2 id="modal-title">{project.title}</h2>

        <p className="modal-summary">
          {project.summary}
        </p>

        <div className="modal-metric">
          <strong>{project.keyMetric}</strong>
          <span>{project.keyMetricLabel}</span>
        </div>

        <div className="modal-facts">
          <div><small>ROLE</small><span>{project.role}</span></div>
          <div><small>ORGANIZATION</small><span>{project.organization}</span></div>
          <div><small>TIMELINE</small><span>{project.timeline}</span></div>
        </div>

        {[
          ['Overview', project.overview],
          ['My Role', project.myRole],
          ['Approach', project.approach],
          ['Impact', project.impact]
        ].map(([heading, content]) => (
          <section className="modal-case-section" key={heading}>
            <h3>{heading}</h3>
            <p className="modal-paragraph">{content}</p>
          </section>
        ))}

        <div className="modal-bottom">
          <button
            type="button"
            onClick={() =>
              onChange(
                (index - 1 + projects.length) %
                  projects.length
              )
            }
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={() =>
              onChange((index + 1) % projects.length)
            }
          >
            Next project →
          </button>
        </div>
      </div>
    </div>
  );
}

function CafeScene() {
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const selected = hovered ?? focused;
  const treats = [
    { id: 'coffee', label: 'Iced coffee', note: 'Iced coffee for a serious lock-in session.' },
    { id: 'matcha', label: 'Matcha', note: 'Matcha for slow, relaxing mornings.' },
    { id: 'strawberry', label: 'Strawberry latte', note: 'Strawberry latte, just for the fun of it.' }
  ];

  return (
    <aside
      className="cafe-scene"
      aria-label="My little cafe corner"
    >
      <span className="cafe-title">a little cafe break</span>
      <div className="cafe-table">
        {treats.map(({ id, label }) => (
          <button
            type="button"
            key={id}
            className={`cafe-treat cafe-${id}`}
            aria-label={label}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused(null)}
          >
            <img className="cafe-drink-art" src={`/images/cafe-${id}.png`} alt="" />
            <span>{label.toLowerCase()}</span>
          </button>
        ))}
      </div>
      <p className="cafe-note" aria-live="polite">
        <span key={selected}>{treats.find(({ id }) => id === selected)?.note || 'A little drink for every mood.'}</span>
      </p>
    </aside>
  );
}

function AboutPhoto() {
  const [flipped, setFlipped] = useState(false);

  return (
    <figure className="about-photo">
      <button
        type="button"
        className={`about-photo-frame about-photo-flip${flipped ? ' is-flipped' : ''}`}
        onClick={() => setFlipped((value) => !value)}
        aria-label={flipped ? 'Flip back to Stellar' : 'Flip to meet Mochi, the love of my life'}
        aria-pressed={flipped}
      >
        <span className="about-photo-sides">
          <img className="about-photo-front" src="/images/stellar.jpg" alt="Stellar smiling beneath blooming cherry blossom trees" aria-hidden={flipped} />
          <img className="about-photo-back" src="/images/mochi.jpeg" alt="Mochi, Stellar’s cat" aria-hidden={!flipped} />
        </span>
      </button>
      <figcaption aria-live="polite">
        {flipped ? "This is Mochi, she’s turning 10 this year!" : 'Flip to see the love of my life.'}
      </figcaption>
      <SmallSparkle />
    </figure>
  );
}

// MAIN WEBSITE

export default function App() {
  const [page, setPage] = useState('work');
  const [contactJump, setContactJump] = useState(0);

  useEffect(() => {
    if (!contactJump) return;
    const section = document.getElementById('connect');
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [contactJump]);

  const goToContact = (event) => {
    event.preventDefault();
    setPage('work');
    setContactJump((count) => count + 1);
  };
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState(null);
  const projectTriggerRef = useRef(null);

  const openProject = (index) => {
    projectTriggerRef.current = document.activeElement;
    setSelectedProject(index);
  };

  const closeProject = () => {
    setSelectedProject(null);
    projectTriggerRef.current?.focus();
  };

  const changePage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const projectEntries = projects.map((project, index) => ({ project, index }));
  const renderProjectCard = ({ project, index }) => (
                  <button
                    type="button"
                    className="project-card"
                    key={project.id}
                    onClick={() => openProject(index)}
                  >
                    <div className="project-card-copy">
                      <strong>{project.title}</strong>
                      <p className="project-card-summary">{project.cardDescription}</p>
                    </div>
                    <div className="project-card-footer">
                      <span className="project-card-meta">{project.category}</span>
                      <span className="project-card-arrow" aria-hidden="true">↗</span>
                    </div>
                  </button>
  );

  return (
    <>
      <div className="site-container">

        {/* HEADER */}

        <header className="site-header">
          <button
            type="button"
            className="brand"
            onClick={() => changePage('work')}
          >
            stellar shar.
            <Star className="brand-star" />
          </button>

          <nav aria-label="Main navigation">
            <button
              type="button"
              className={
                page === 'work' ? 'nav-active' : ''
              }
              onClick={() => changePage('work')}
            >
              work
            </button>

            <button
              type="button"
              className={
                page === 'about' ? 'nav-active' : ''
              }
              onClick={() => changePage('about')}
            >
              about
            </button>

            <a href="#connect" onClick={goToContact}>contact</a>
          </nav>
        </header>

        {page === 'work' ? (
          <main>

            {/* INTRODUCTION */}

            <section className="hero">
              <div className="hero-copy">
              <div className="eyebrow">
                VANCOUVER, CANADA · PRODUCT & TECHNOLOGY
              </div>

              <div className="hero-title">
                <h1>Hi, I'm Stellar.</h1>
                <Star className="hero-star" />
              </div>

              <p>
                I work at the intersection of product,
                technology, and people. I like turning
                complex problems into thoughtful,
                useful experiences.
              </p>

              {(LINKS.resume || LINKS.github) && <div className="hero-links">
                <TextLink href={LINKS.resume}>
                  Resume
                </TextLink>

                <TextLink href={LINKS.github}>
                  GitHub
                </TextLink>
              </div>}
              </div>
              <CafeScene />
            </section>

            {/* EXPERIENCE */}

            <ExperienceSection />

            {/* PROJECTS */}

            <section
              className="section projects-section"
              id="projects"
            >
              <div className="section-heading">
                <div className="heading-with-doodle">
                  <h2>Selected work</h2>
                  <SmallSparkle />
                </div>

                <span>02 / PROJECTS & COMMUNITY</span>
              </div>

              <p className="section-subtitle">
                A few things I've helped build, bring together, and teach.
                Click to explore.
              </p>

              <div className="projects-list">
                {projectEntries.filter(({ project }) => !project.showInMore).map(renderProjectCard)}
              </div>
              <div id="more-projects" hidden={!showMoreProjects}>
                <div className="projects-list projects-more">
                  {projectEntries.filter(({ project }) => project.showInMore).map(renderProjectCard)}
                </div>
              </div>
              <button
                type="button"
                className="projects-more-toggle"
                aria-expanded={showMoreProjects}
                aria-controls="more-projects"
                onClick={() => setShowMoreProjects((visible) => !visible)}
              >
                {showMoreProjects ? 'See less −' : 'See more +'}
              </button>
            </section>

            {/* CONTACT */}

            <section className="contact-section" id="connect" tabIndex={-1} aria-labelledby="connect-title">
              <div className="eyebrow">
                03 / GET IN TOUCH
              </div>

              <div className="heading-with-doodle">
                <h2 id="connect-title">Let's connect.</h2>
                <Heart className="contact-heart" />
              </div>

              <p>
                Always happy to chat about products,
                technology, or interesting ideas.
              </p>

              <ContactLinks />
            </section>
          </main>
        ) : (

          /* ABOUT PAGE */

          <main className="about-page">
            <div className="about-intro">
              <div className="about-copy">
                <div className="eyebrow">THE PERSON BEHIND THE PROJECTS</div>
                <div className="heading-with-doodle about-title">
                  <h1>A little more me.</h1>
                  <Heart className="about-heart" />
                </div>
                <p>
                  I'm Stellar, a Computer Science and Statistics student at UBC.
                  I like bringing people and ideas together to make complicated things feel simple.
                </p>
                <p>
                  My work spans product management, software, AI, and student communities.
                  I'm drawn to thoughtful products and the people who make them happen.
                </p>
              </div>
              <AboutPhoto />
            </div>

            <section className="about-offline" aria-labelledby="offline-title">
              <div className="heading-with-doodle">
                <h2 id="offline-title">Life outside the tabs.</h2>
                <SmallSparkle />
              </div>
              <div className="about-interests">
                <div><span className="eyebrow">01 / SLOW MOMENTS</span><h3>Cafe catch-ups</h3><p>I love visiting cafes and trying new pastries and desserts with my friends.</p></div>
                <div><span className="eyebrow">02 / A LITTLE RESET</span><h3>Pilates or spin class</h3><p>A little movement and a break from the screen.</p></div>
                <div><span className="eyebrow">03 / ONE MORE EPISODE</span><h3>Sitcom nights</h3><p>My favorites are Abbott Elementary, Modern Family, The Neighborhood, and Friends!</p></div>
              </div>
              <p className="about-invitation">Have a cafe or sitcom recommendation? <a href="#connect" onClick={goToContact}>Let's chat.</a></p>
            </section>

            <button type="button" className="about-back" onClick={() => changePage('work')}>← Back to work</button>
          </main>
        )}

        {/* FOOTER */}

        <footer className="site-footer">
          <span>© 2026 Stellar Shar</span>

          <span className="footer-message">
            Powered by energy drinks, gummy bears, and saltbread.
          </span>
        </footer>
      </div>

      {/* PROJECT MODAL */}

      {selectedProject !== null && (
        <ProjectModal
          index={selectedProject}
          onClose={closeProject}
          onChange={setSelectedProject}
        />
      )}
    </>
  );
}
