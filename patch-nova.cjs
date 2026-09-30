const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectNova.jsx', 'utf8');

// 1. Add dot to Transit_Study
content = content.replace(
  'color="var(--accent)" /> Transit_Study.pdf',
  'color="var(--accent)" /> Transit_Study.pdf <div className="nova-pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent)", marginLeft: "auto" }}></div>'
);

// 2. Add blink cursor to Synthesis
content = content.replace(
  'AI SYNTHESIS</span>',
  'AI SYNTHESIS <span className="nova-blink">_</span></span>'
);

// 3. Add pulse to icon
content = content.replace(
  '<Sparkles size={16} color="var(--accent)" />',
  '<Sparkles size={16} color="var(--accent)" className="nova-pulse-icon" />'
);

// 4. Add CSS
const css = `
        @keyframes novaPulse { 0% { border-color: #1a1a1a; box-shadow: inset 0 0 0 rgba(255,100,0,0); } 50% { border-color: rgba(255,100,0,0.3); box-shadow: inset 0 0 20px rgba(255,100,0,0.05); } 100% { border-color: #1a1a1a; box-shadow: inset 0 0 0 rgba(255,100,0,0); } }
        .nova-evidence-box { animation: novaPulse 4s infinite ease-in-out; }
        @keyframes novaBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .nova-blink { animation: novaBlink 1s infinite; }
        @keyframes novaShimmer { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }
        .nova-shimmer { animation: novaShimmer 4s infinite linear; }
        @keyframes novaPulseIcon { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .nova-pulse-icon { animation: novaPulseIcon 3s infinite ease-in-out; }
        @keyframes novaDotPulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        .nova-pulse-dot { animation: novaDotPulse 2s infinite ease-in-out; }
`;
content = content.replace('flex-wrap: wrap; gap: 2rem !important; }', 'flex-wrap: wrap; gap: 2rem !important; }\n' + css);

// 5. Add box class
content = content.replace(
  '<div className="nova-center-item" style={{ padding: \'2rem\', backgroundColor: \'#141414\', borderRadius: \'8px\', border: \'1px solid #1a1a1a\', transition: \'transform 0.3s, border-color 0.3s, box-shadow 0.3s\', cursor: \'default\' }}',
  '<div className="nova-center-item nova-evidence-box" style={{ padding: \'2rem\', backgroundColor: \'#141414\', borderRadius: \'8px\', border: \'1px solid #1a1a1a\', transition: \'transform 0.3s, border-color 0.3s, box-shadow 0.3s\', cursor: \'default\' }}'
);

// 6. Add shimmer to text
content = content.replace(
  'Source: Transit_Study.pdf (Pg. 12)</div>',
  'Source: Transit_Study.pdf (Pg. 12)<div className="nova-shimmer" style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}></div></div>'
);
content = content.replace(
  'padding: \'0.4rem 0.8rem\', backgroundColor: \'#1a1a1a\', borderRadius: \'4px\', fontSize: \'0.75rem\', color: \'#888\' }}',
  'padding: \'0.4rem 0.8rem\', backgroundColor: \'#1a1a1a\', borderRadius: \'4px\', fontSize: \'0.75rem\', color: \'#888\', position: \'relative\', overflow: \'hidden\' }}'
);

fs.writeFileSync('src/components/ProjectNova.jsx', content);
