import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AboutArtwork3D from './AboutArtwork3D';

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    'PRODUCT DESIGN',
    'UI / UX',
    'INTERACTION DESIGN',
    'CREATIVE DEVELOPMENT',
    'FRONTEND DEVELOPMENT',
    'THREE.JS',
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        background: '#e5e4df',
        color: '#111',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        paddingTop: '64px',
      }}
    >

      {/* =====================================================
          FRAME 01 — ABOUT / IDENTITY
      ===================================================== */}

      <div className="about-identity-frame">

        <div className="about-info-panel">

          {/* 06 / ABOUT */}
          <div className="about-header-row about-reveal">
            <span className="about-section-tag">06 / ABOUT</span>
          </div>

          <div className="about-frame-divider about-reveal" />

          {/* MAIN QUOTE */}
          <div className="about-quote-container about-reveal">
            <h1 className="about-quote-text">
              <span className="quote-line-dark">
                “Design gives<br />structure to ideas.
              </span>
              <span className="quote-line-light">
                Code gives<br />them life.”
              </span>
            </h1>

            <div className="about-quote-sub">
              — I SIT IN THE SPACE BETWEEN THE TWO.
            </div>
          </div>

          <div className="about-frame-divider about-reveal" />

          {/* 01 IDENTITY */}
          <div className="about-section-block about-reveal">
            <div className="about-block-title">
              01 &nbsp;IDENTITY
            </div>

            <h2 className="about-name">
              SHLOK SHINDE
            </h2>

            <p className="about-role">
              Digital Product Design<br />
              × Creative Development
            </p>
          </div>

          <div className="about-frame-divider about-reveal" />

          {/* 02 BACKGROUND */}
          <div className="about-section-block about-reveal">
            <div className="about-block-title">
              02 &nbsp;BACKGROUND
            </div>

            <div className="about-bg-grid">

              <div className="about-bg-item">
                <span className="about-bg-num">01</span>
                <span className="about-bg-text">
                  Information Technology
                </span>
              </div>

              <div className="about-bg-item">
                <span className="about-bg-num">02</span>
                <span className="about-bg-text">
                  Vidyalankar Institute of Technology
                </span>
              </div>

              <div className="about-bg-item">
                <span className="about-bg-num">03</span>
                <span className="about-bg-text">
                  Mumbai, India
                </span>
              </div>

              <div className="about-bg-item">
                <span className="about-bg-num">04</span>
                <span className="about-bg-text">
                  2026
                </span>
              </div>

            </div>
          </div>

          <div className="about-frame-divider about-reveal" />

          {/* BOTTOM METADATA LINE */}
          <div className="about-meta-row about-reveal">
            <span>IDEAS</span>
            <span className="meta-bullet">•</span>
            <span>INTERFACES</span>
            <span className="meta-bullet">•</span>
            <span>INTERACTIONS</span>
            <span className="meta-bullet">•</span>
            <span>EXPERIENCES</span>
          </div>

        </div>

        {/* RIGHT 3D ARTWORK */}

        <div className="about-art-panel">
          <AboutArtwork3D />
        </div>

      </div>


      {/* =====================================================
          FRAME 02 — CORE CAPABILITIES
      ===================================================== */}

      <section className="capabilities-frame">

        <div className="capabilities-header about-reveal">

          <div>
            <span className="capabilities-index">
              07 / CAPABILITIES
            </span>

            <h2>CORE CAPABILITIES</h2>
          </div>

          <span className="capabilities-count">
            06 / 06
          </span>

        </div>

        <div className="capabilities-list">

          {capabilities.map((item, index) => (
            <div
              className="capability-row about-reveal"
              key={item}
            >

              <span className="capability-number">
                0{index + 1}
              </span>

              <span className="capability-name">
                {item}
              </span>

              <span className="capability-plus">
                +
              </span>

            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          FRAME 03 — APPROACH
      ===================================================== */}

      <section className="about-approach-frame">

        <div className="approach-copy about-reveal">

          <span className="approach-index">
            08 / APPROACH
          </span>

          <p>
            Design gives structure to ideas.
            <br />
            Code gives them life.
            <br />
            I sit in the space between the two.
          </p>

        </div>

        <div className="approach-title about-reveal">
          <span>DESIGN.</span>
          <span>BUILD.</span>
          <span>REFINE.</span>
        </div>

      </section>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `

            /* =================================================
               ABOUT / IDENTITY FRAME
            ================================================= */

            .about-identity-frame {
              width: calc(100% - 6vw);
              margin: 0 3vw;

              display: grid;

              grid-template-columns: 38% 62%;

              align-items: center;

              position: relative;

              min-height: min(625px, calc(100vh - 76px));

              padding: 0.5rem 0 1rem 0;

              border-bottom:
                1px solid rgba(0,0,0,0.22);

              overflow: visible;
            }


            /* =================================================
               LEFT EDITORIAL INFORMATION FRAME
            ================================================= */

            .about-info-panel {
              position: relative;
              z-index: 30;

              padding-right: 2rem;

              display: flex;
              flex-direction: column;

              justify-content: center;

              min-width: 0;

              /* LIFT THE COMPLETE LEFT EDITORIAL BLOCK */
              transform: translateY(-35px);
            }


            /* =================================================
               SECTION DIVIDER LINES
            ================================================= */

            .about-frame-divider {
              width: 100%;
              height: 1px;
              background: rgba(0,0,0,0.18);
              margin: 0.65rem 0;
            }


            /* =================================================
               06 / ABOUT
            ================================================= */

            .about-header-row {
              display: flex;
              align-items: center;
              margin: 0;
            }


            .about-section-tag {
              font-size: 0.82rem;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: #777;
            }


            /* =================================================
               QUOTE
            ================================================= */

            .about-quote-container {
              position: relative;
              width: 100%;
            }


            .about-quote-text {
              margin: 0;
              font-size: clamp(46px, 3.3vw, 54px);
              line-height: 0.94;
              letter-spacing: -0.045em;
              font-weight: 800;
            }


            .quote-line-dark {
              color: #111;
              display: block;
              margin-bottom: 0.25rem;
            }


            .quote-line-light {
              color: #8c8c8c;
              display: block;
            }


            .about-quote-sub {
              margin-top: 0.65rem;
              font-size: clamp(0.78rem, 0.85vw, 0.88rem);
              line-height: 1.35;
              font-weight: 700;
              letter-spacing: 0.04em;
              color: #444;
            }


            /* =================================================
               01 IDENTITY & 02 BACKGROUND BLOCKS
            ================================================= */

            .about-section-block {
              width: 100%;
            }


            .about-block-title {
              font-size: 0.82rem;
              letter-spacing: 0.08em;
              font-weight: 700;
              color: #777;
              text-transform: uppercase;
              margin-bottom: 0.25rem;
            }


            .about-name {
              margin: 0 0 0.15rem 0;
              font-size: clamp(34px, 2.5vw, 42px);
              line-height: 0.95;
              letter-spacing: -0.04em;
              font-weight: 800;
              color: #111;
            }


            .about-role {
              margin: 0;
              font-size: 1.05rem;
              line-height: 1.38;
              color: #555;
              font-weight: 500;
            }


            /* =================================================
               BACKGROUND GRID
            ================================================= */

            .about-bg-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 1.2rem;
              row-gap: 0.25rem;
            }


            .about-bg-item {
              display: flex;
              align-items: baseline;
              gap: 0.45rem;
              font-size: 0.95rem;
              line-height: 1.35;
              color: #333;
              font-weight: 500;
            }


            .about-bg-num {
              color: #999;
              font-size: 0.72rem;
              font-weight: 700;
              letter-spacing: 0.04em;
              flex-shrink: 0;
            }


            .about-bg-text {
              color: #333;
            }


            /* =================================================
               BOTTOM METADATA LINE
            ================================================= */

            .about-meta-row {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              font-size: 0.78rem;
              letter-spacing: 0.09em;
              color: #777;
              font-weight: 700;
              text-transform: uppercase;
              margin: 0;
            }


            .meta-bullet {
              color: #999;
              font-size: 0.8rem;
            }


            /* =================================================
               ARTWORK PANEL
            ================================================= */

            .about-art-panel {
              position: relative;
              min-width: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: visible;
              padding: 0;
            }


            .about-art-panel > .about-artwork {
              width: 100% !important;
              max-width: 960px !important;
              height: 590px !important;
              margin: 0 !important;
              transform: scale(1.12) translateY(-22px);
              transform-origin: center 30%;
            }


            /* =================================================
               CORE CAPABILITIES
            ================================================= */

            .capabilities-frame {
              width: calc(100% - 6vw);

              margin: 0 3vw;

              padding:
                2.2rem 0 0;

              border-bottom:
                1px solid rgba(0,0,0,0.22);
            }


            .capabilities-header {
              display: flex;

              justify-content: space-between;

              align-items: flex-end;

              padding-bottom: 1.7rem;

              border-bottom:
                2px solid #111;
            }


            .capabilities-index {
              display: block;

              margin-bottom: 0.65rem;

              font-size: 0.6rem;

              letter-spacing: 0.08em;

              color: #888;

              text-transform: uppercase;

              font-weight: 700;
            }


            .capabilities-header h2 {
              margin: 0;

              font-size:
                clamp(2.7rem, 4.2vw, 5rem);

              line-height: 0.88;

              letter-spacing: -0.055em;

              font-weight: 800;
            }


            .capabilities-count {
              font-size: 0.62rem;

              color: #888;

              letter-spacing: 0.08em;

              font-weight: 600;

              padding-bottom: 0.15rem;
            }


            .capability-row {
              min-height: 130px;

              display: grid;

              grid-template-columns:
                75px 1fr 50px;

              align-items: center;

              border-bottom:
                1px solid rgba(0,0,0,0.15);

              transition:
                padding 0.3s ease;
            }


            .capability-row:hover {
              padding-left: 12px;
            }


            .capability-number {
              font-size: 0.85rem;

              color: #999;

              font-weight: 600;

              letter-spacing: 0.04em;
            }


            .capability-name {
              font-size:
                clamp(2.1rem, 3.4vw, 4.5rem);

              font-weight: 800;

              line-height: 0.92;

              letter-spacing: -0.055em;
            }


            .capability-plus {
              justify-self: end;

              font-size: 2.3rem;

              font-weight: 500;

              line-height: 1;
            }


            /* =================================================
               APPROACH
            ================================================= */

            .about-approach-frame {
              width: calc(100% - 8vw);

              margin: 0 4vw;

              min-height: 620px;

              padding:
                5rem 0 7rem;

              display: flex;

              flex-direction: column;

              justify-content: space-between;
            }


            .approach-copy {
              display: flex;

              justify-content: space-between;

              align-items: flex-start;
            }


            .approach-index {
              font-size: 0.62rem;

              color: #888;

              letter-spacing: 0.08em;

              text-transform: uppercase;

              font-weight: 700;
            }


            .approach-copy p {
              margin: 0;

              max-width: 500px;

              font-size: 1rem;

              line-height: 1.6;

              color: #777;

              font-weight: 500;
            }


            .approach-title {
              display: flex;

              flex-direction: column;

              align-items: center;

              justify-content: center;
            }


            .approach-title span {
              display: block;

              font-size:
                clamp(4.5rem, 9vw, 10rem);

              line-height: 0.82;

              font-weight: 800;

              letter-spacing: -0.07em;
            }


            /* =================================================
               RESPONSIVE
            ================================================= */

            @media (max-width: 1200px) {

              .about-identity-frame {
                grid-template-columns: 40% 60%;
              }


              .about-quote-text {
                font-size: clamp(38px, 3.2vw, 46px);
              }


              .about-art-panel > .about-artwork {
                height: 540px !important;

                transform: scale(0.96);
              }

            }


            @media (max-width: 900px) {

              #about {
                padding-top: 80px !important;
              }


              .about-identity-frame {
                width: calc(100% - 3rem);

                margin: 0 1.5rem;

                display: flex;

                flex-direction: column;

                align-items: stretch;

                min-height: auto;

                padding-top: 1rem;
              }


              .about-info-panel {
                padding: 1rem 0 1.5rem;

                width: 100%;

                /* No desktop uplift on mobile */
                transform: none;
              }


              .about-quote-text {
                font-size: clamp(28px, 6.2vw, 40px);
              }


              .about-art-panel {
                min-height: 480px;

                width: 100%;
              }


              .about-art-panel > .about-artwork {
                height: 480px !important;

                transform: none;

                width: 100% !important;
              }


              .about-bg-grid {
                grid-template-columns: 1fr;
              }


              .about-meta-row {
                flex-wrap: wrap;
              }


              .capabilities-frame,
              .about-approach-frame {
                width: calc(100% - 3rem);

                margin: 0 1.5rem;
              }


              .capabilities-frame {
                padding-top: 3.5rem;
              }


              .capability-row {
                min-height: 105px;

                grid-template-columns:
                  45px 1fr 35px;
              }


              .capability-name {
                font-size:
                  clamp(1.5rem, 6vw, 3rem);
              }


              .about-approach-frame {
                min-height: 560px;
              }


              .approach-copy {
                flex-direction: column;

                gap: 1.5rem;
              }


              .approach-title span {
                font-size:
                  clamp(4rem, 13vw, 8rem);
              }

            }


            @media (max-width: 600px) {

              #about {
                padding-top: 75px !important;
              }


              .about-quote-text {
                font-size: 26px;

                line-height: 1;
              }


              .about-quote-sub {
                font-size: 0.65rem;
              }


              .about-name {
                font-size: 1.9rem;
              }


              .about-bg-grid {
                grid-template-columns: 1fr;
              }


              .about-art-panel {
                min-height: 400px;
              }


              .about-art-panel > .about-artwork {
                height: 400px !important;
              }


              .capabilities-header {
                align-items: flex-start;

                flex-direction: column;

                gap: 1rem;
              }


              .capabilities-header h2 {
                font-size: 2.5rem;
              }


              .capability-row {
                min-height: 90px;
              }


              .capability-number {
                font-size: 0.65rem;
              }


              .capability-name {
                font-size: 1.25rem;
              }


              .capability-plus {
                font-size: 1.5rem;
              }


              .about-approach-frame {
                min-height: 500px;

                padding-top: 4rem;
              }


              .approach-copy p {
                font-size: 0.88rem;
              }


              .approach-title span {
                font-size: 4rem;
              }

            }

          `,
        }}
      />

    </section>
  );
}