import { useState, useEffect, useCallback, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a2a1f 100%)",
  card: "rgba(255,255,255,0.08)",
  cardHover: "rgba(255,255,255,0.13)",
  border: "rgba(255,255,255,0.15)",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.6)",
  pink: "#FF6B9D",
  purple: "#C44BFF",
  blue: "#4BAAFF",
  green: "#4BFF9D",
  yellow: "#FFD54B",
  orange: "#FF944B",
};

// ─── JUEGOS Y PREGUNTAS ───────────────────────────────────────────────────────
const GAMES = [
  {
    id: "emociones",
    title: "¿Cómo me siento?",
    emoji: "🎭",
    color: T.pink,
    description: "Descubre tus emociones con imágenes divertidas",
    trait: "empatia",
    questions: [
      {
        id: "e1",
        text: "Cuando tu amigo está triste, ¿qué haces?",
        type: "choice",
        options: [
          { text: "Le doy un abrazo y escucho", emoji: "🤗", points: 3, tags: ["empatia", "social"] },
          { text: "Le cuento un chiste para animarlo", emoji: "😄", points: 2, tags: ["creatividad", "social"] },
          { text: "Le traigo su comida favorita", emoji: "🍰", points: 3, tags: ["cuidado", "empatia"] },
          { text: "Le doy espacio si lo necesita", emoji: "🕊️", points: 2, tags: ["respeto", "madureza"] },
        ],
      },
      {
        id: "e2",
        text: "¿Cuándo te sientes MÁS feliz?",
        type: "choice",
        options: [
          { text: "Jugando con amigos", emoji: "👫", points: 2, tags: ["social", "energia"] },
          { text: "Inventando cosas nuevas", emoji: "🎨", points: 3, tags: ["creatividad", "imaginacion"] },
          { text: "Aprendiendo algo nuevo", emoji: "📚", points: 3, tags: ["curiosidad", "logro"] },
          { text: "Estando en la naturaleza", emoji: "🌿", points: 2, tags: ["calma", "naturaleza"] },
        ],
      },
      {
        id: "e3",
        text: "Cuando algo te da miedo, ¿qué haces primero?",
        type: "choice",
        options: [
          { text: "Lo enfrento con valentía", emoji: "🦁", points: 3, tags: ["valentia", "resiliencia"] },
          { text: "Pido ayuda a alguien", emoji: "🙋", points: 3, tags: ["social", "confianza"] },
          { text: "Respiro hondo y pienso", emoji: "🧘", points: 3, tags: ["calma", "reflexivo"] },
          { text: "Me alejo hasta sentirme mejor", emoji: "🚶", points: 2, tags: ["autocuidado", "introspectivo"] },
        ],
      },
    ],
  },
  {
    id: "superpoderes",
    title: "Mis Superpoderes",
    emoji: "⚡",
    color: T.purple,
    description: "Descubre cuáles son tus talentos únicos",
    trait: "fortalezas",
    questions: [
      {
        id: "s1",
        text: "En equipo, ¿cuál es tu papel favorito?",
        type: "choice",
        options: [
          { text: "El que tiene las ideas", emoji: "💡", points: 3, tags: ["liderazgo", "creatividad"] },
          { text: "El que organiza todo", emoji: "📋", points: 3, tags: ["organizacion", "responsabilidad"] },
          { text: "El que anima al equipo", emoji: "📣", points: 2, tags: ["social", "energia"] },
          { text: "El que resuelve problemas difíciles", emoji: "🧩", points: 3, tags: ["logica", "analisis"] },
        ],
      },
      {
        id: "s2",
        text: "¿Qué actividad podrías hacer horas sin aburrirte?",
        type: "choice",
        options: [
          { text: "Dibujar o construir cosas", emoji: "🎨", points: 3, tags: ["creatividad", "arte"] },
          { text: "Jugar y hacer deporte", emoji: "⚽", points: 2, tags: ["energia", "cuerpo"] },
          { text: "Leer o escuchar historias", emoji: "📖", points: 3, tags: ["imaginacion", "curiosidad"] },
          { text: "Hablar y ayudar a otros", emoji: "💬", points: 3, tags: ["social", "empatia"] },
        ],
      },
      {
        id: "s3",
        text: "Tus amigos dicen que eres...",
        type: "choice",
        options: [
          { text: "Muy divertido/a", emoji: "🎉", points: 2, tags: ["social", "energia"] },
          { text: "Muy inteligente", emoji: "🧠", points: 3, tags: ["logica", "curiosidad"] },
          { text: "Muy buena persona", emoji: "💛", points: 3, tags: ["empatia", "bondad"] },
          { text: "Muy creativo/a", emoji: "✨", points: 3, tags: ["creatividad", "arte"] },
        ],
      },
    ],
  },
  {
    id: "mundo",
    title: "Mi Mundo Interior",
    emoji: "🌈",
    color: T.blue,
    description: "Explora cómo ves el mundo que te rodea",
    trait: "perspectiva",
    questions: [
      {
        id: "m1",
        text: "Si fueras un animal, ¿cuál serías?",
        type: "choice",
        options: [
          { text: "León — valiente y protector", emoji: "🦁", points: 3, tags: ["valentia", "liderazgo"] },
          { text: "Delfín — juguetón e inteligente", emoji: "🐬", points: 3, tags: ["social", "logica"] },
          { text: "Mariposa — libre y colorida", emoji: "🦋", points: 2, tags: ["creatividad", "libertad"] },
          { text: "Búho — sabio y observador", emoji: "🦉", points: 3, tags: ["reflexivo", "curiosidad"] },
        ],
      },
      {
        id: "m2",
        text: "¿Qué harías si tuvieras un superpoder por un día?",
        type: "choice",
        options: [
          { text: "Curar a todos los enfermos", emoji: "💊", points: 3, tags: ["empatia", "bondad"] },
          { text: "Volar y explorar el mundo", emoji: "✈️", points: 2, tags: ["aventura", "libertad"] },
          { text: "Leer mentes para ayudar mejor", emoji: "🔮", points: 3, tags: ["empatia", "analisis"] },
          { text: "Parar el tiempo para pensar", emoji: "⏱️", points: 3, tags: ["reflexivo", "calma"] },
        ],
      },
      {
        id: "m3",
        text: "Si pudieras cambiar algo del mundo, ¿qué sería?",
        type: "choice",
        options: [
          { text: "Que nadie pasara hambre", emoji: "🍎", points: 3, tags: ["bondad", "justicia"] },
          { text: "Que hubiera más diversión", emoji: "🎡", points: 2, tags: ["energia", "alegria"] },
          { text: "Que todos fueran amigos", emoji: "🤝", points: 3, tags: ["empatia", "social"] },
          { text: "Que hubiera más naturaleza", emoji: "🌳", points: 3, tags: ["naturaleza", "cuidado"] },
        ],
      },
    ],
  },
  {
    id: "aventura",
    title: "Gran Aventura",
    emoji: "🗺️",
    color: T.green,
    description: "¿Cómo afrontas los desafíos y retos?",
    trait: "resiliencia",
    questions: [
      {
        id: "a1",
        text: "Encuentras un tesoro escondido. ¿Qué haces?",
        type: "choice",
        options: [
          { text: "Lo comparto con todos", emoji: "🎁", points: 3, tags: ["generosidad", "bondad"] },
          { text: "Busco más tesoros", emoji: "🔍", points: 2, tags: ["aventura", "curiosidad"] },
          { text: "Lo uso para ayudar a mi familia", emoji: "👨‍👩‍👧", points: 3, tags: ["cuidado", "responsabilidad"] },
          { text: "Hago algo creativo con él", emoji: "🎨", points: 3, tags: ["creatividad", "arte"] },
        ],
      },
      {
        id: "a2",
        text: "Cuando algo no te sale bien, ¿qué piensas?",
        type: "choice",
        options: [
          { text: "\"Lo intentaré de nuevo\"", emoji: "💪", points: 3, tags: ["resiliencia", "perseverancia"] },
          { text: "\"Necesito aprender más\"", emoji: "📚", points: 3, tags: ["curiosidad", "humildad"] },
          { text: "\"Pediré ayuda\"", emoji: "🙋", points: 3, tags: ["social", "confianza"] },
          { text: "\"Probaré un camino diferente\"", emoji: "🔄", points: 3, tags: ["creatividad", "flexibilidad"] },
        ],
      },
      {
        id: "a3",
        text: "Tu aventura favorita sería...",
        type: "choice",
        options: [
          { text: "Explorar una selva misteriosa", emoji: "🌴", points: 2, tags: ["aventura", "valentia"] },
          { text: "Descubrir un planeta nuevo", emoji: "🚀", points: 3, tags: ["curiosidad", "imaginacion"] },
          { text: "Construir una ciudad ideal", emoji: "🏙️", points: 3, tags: ["organizacion", "creatividad"] },
          { text: "Salvar animales en peligro", emoji: "🐘", points: 3, tags: ["empatia", "naturaleza"] },
        ],
      },
    ],
  },
];

// ─── PERFIL HELPERS ───────────────────────────────────────────────────────────
const TRAIT_LABELS = {
  empatia: { label: "Empatía", emoji: "💛", color: T.pink },
  creatividad: { label: "Creatividad", emoji: "🎨", color: T.purple },
  social: { label: "Social", emoji: "👫", color: T.blue },
  logica: { label: "Lógica", emoji: "🧠", color: T.blue },
  valentia: { label: "Valentía", emoji: "🦁", color: T.yellow },
  curiosidad: { label: "Curiosidad", emoji: "🔭", color: T.green },
  resiliencia: { label: "Resiliencia", emoji: "💪", color: T.orange },
  bondad: { label: "Bondad", emoji: "✨", color: T.yellow },
  calma: { label: "Calma", emoji: "🌊", color: T.blue },
  liderazgo: { label: "Liderazgo", emoji: "⭐", color: T.purple },
  responsabilidad: { label: "Responsabilidad", emoji: "🏆", color: T.green },
  imaginacion: { label: "Imaginación", emoji: "🌈", color: T.purple },
};

const PLANET_NAMES = {
  empatia: "Planeta Corazón",
  creatividad: "Planeta Arcoíris",
  logica: "Planeta Estrella",
  valentia: "Planeta Fuego",
  curiosidad: "Planeta Explorador",
  social: "Planeta Amistad",
  resiliencia: "Planeta Diamante",
  bondad: "Planeta Luz",
};

function getTopTrait(tags) {
  const counts = {};
  tags.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "empatia";
}

// ─── CONFETTI COMPONENT ───────────────────────────────────────────────────────
function Confetti({ active }) {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  if (!active) return null;
  const colors = ["#FF6B9D","#C44BFF","#4BAAFF","#4BFF9D","#FFD54B","#FF944B"];
  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:9999 }}>
      {pieces.map(i => (
        <div key={i} style={{
          position:"absolute",
          left: `${Math.random()*100}%`,
          top: "-20px",
          width: "10px",
          height: "10px",
          borderRadius: Math.random() > 0.5 ? "50%" : "0",
          background: colors[i % colors.length],
          animation: `fall ${1.5 + Math.random()*2}s ease-in forwards`,
          animationDelay: `${Math.random()*0.8}s`,
          transform: `rotate(${Math.random()*360}deg)`,
        }} />
      ))}
    </div>
  );
}

// ─── FLOATING STARS ───────────────────────────────────────────────────────────
function FloatingStars() {
  const stars = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }}>
      {stars.map(i => (
        <div key={i} style={{
          position:"absolute",
          left:`${5 + (i*4.7)%90}%`,
          top:`${(i*7.3)%90}%`,
          fontSize: `${8 + (i%3)*6}px`,
          opacity: 0.15 + (i%4)*0.1,
          animation: `float ${3 + (i%4)}s ease-in-out infinite alternate`,
          animationDelay: `${(i*0.3)%2}s`,
        }}>
          {["✨","⭐","🌟","💫","🔮"][i%5]}
        </div>
      ))}
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total, color }) {
  return (
    <div style={{ width:"100%", background:"rgba(255,255,255,0.1)", borderRadius:99, height:8, overflow:"hidden" }}>
      <div style={{
        height:"100%",
        width:`${(current/total)*100}%`,
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        borderRadius:99,
        transition:"width 0.5s cubic-bezier(0.34,1.2,0.64,1)",
        boxShadow:`0 0 10px ${color}88`,
      }} />
    </div>
  );
}

// ─── PROFILE PLANET ───────────────────────────────────────────────────────────
function ProfilePlanet({ topTrait, size = 120 }) {
  const info = TRAIT_LABELS[topTrait] || TRAIT_LABELS.empatia;
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:`radial-gradient(circle at 35% 35%, ${info.color}cc, ${info.color}44)`,
      boxShadow:`0 0 40px ${info.color}66, inset 0 0 20px rgba(255,255,255,0.1)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize: size * 0.38,
      animation:"pulse 2s ease-in-out infinite",
      border:`2px solid ${info.color}66`,
      position:"relative",
      overflow:"hidden",
    }}>
      <div style={{
        position:"absolute", top:size*0.1, left:size*0.15,
        width:size*0.12, height:size*0.06,
        background:"rgba(255,255,255,0.3)", borderRadius:99,
        transform:"rotate(-30deg)"
      }} />
      {info.emoji}
    </div>
  );
}

// ─── SCORE BADGE ─────────────────────────────────────────────────────────────
function ScoreBadge({ score, maxScore }) {
  const pct = maxScore > 0 ? Math.round((score/maxScore)*100) : 0;
  const level = pct >= 90 ? "🏆 Maestro Mágico" : pct >= 70 ? "⭐ Explorador Estelar" : pct >= 50 ? "🌟 Aventurero" : "🌱 Aprendiz";
  const color = pct >= 90 ? T.yellow : pct >= 70 ? T.purple : pct >= 50 ? T.blue : T.green;
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:10,
      background:`${color}22`, border:`1px solid ${color}66`,
      borderRadius:20, padding:"8px 16px",
      boxShadow:`0 0 20px ${color}33`,
    }}>
      <span style={{ fontSize:20 }}>{level.split(" ")[0]}</span>
      <div>
        <div style={{ color, fontWeight:800, fontSize:18, fontFamily:"'DM Mono', monospace" }}>{score} pts</div>
        <div style={{ color:T.muted, fontSize:11 }}>{level.slice(2)}</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome | name | games | game | results
  const [childName, setChildName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // gameId -> [{option, points, tags}]
  const [totalScore, setTotalScore] = useState(0);
  const [completedGames, setCompletedGames] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animIn, setAnimIn] = useState(false);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    // inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // inject keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-15px) rotate(10deg); } }
      @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity:0; } }
      @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes wiggle { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
      @keyframes slideUp { from { opacity:0; transform: translateY(40px); } to { opacity:1; transform: translateY(0); } }
      @keyframes popIn { from { opacity:0; transform: scale(0.7); } to { opacity:1; transform: scale(1); } }
      * { box-sizing:border-box; margin:0; padding:0; }
      body { overflow-x:hidden; }
      ::-webkit-scrollbar { width:6px; }
      ::-webkit-scrollbar-track { background:rgba(255,255,255,0.05); }
      ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.2); border-radius:99px; }
      input { outline:none; }
    `;
    document.head.appendChild(style);
    setTimeout(() => setAnimIn(true), 100);
  }, []);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleStartGame = (game) => {
    setSelectedGame(game);
    setQuestionIndex(0);
    setSelectedOption(null);
    setScreen("game");
  };

  const handleAnswer = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setTimeout(() => {
      const gameAnswers = answers[selectedGame.id] || [];
      const newAnswers = [...gameAnswers, option];
      setAnswers(prev => ({ ...prev, [selectedGame.id]: newAnswers }));
      setTotalScore(s => s + option.points);
      setAllTags(prev => [...prev, ...(option.tags || [])]);

      if (questionIndex < selectedGame.questions.length - 1) {
        setQuestionIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        // game complete
        triggerConfetti();
        setCompletedGames(prev => [...prev, selectedGame.id]);
        setTimeout(() => {
          setScreen("games");
          setSelectedOption(null);
        }, 1200);
      }
    }, 800);
  };

  const handleFinish = () => {
    triggerConfetti();
    setScreen("results");
  };

  const maxPossibleScore = GAMES.reduce((sum, g) => sum + g.questions.reduce((s, q) => s + Math.max(...q.options.map(o => o.points)), 0), 0);

  // ── TRAIT ANALYSIS ──
  const tagCounts = {};
  allTags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
  const topTraits = Object.entries(tagCounts)
    .filter(([t]) => TRAIT_LABELS[t])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const primaryTrait = topTraits[0]?.[0] || "empatia";
  const planetName = PLANET_NAMES[primaryTrait] || "Planeta Mágico";

  // ── SHARED LAYOUT ──
  const base = {
    minHeight:"100vh",
    background:T.bg,
    fontFamily:"'Poppins', sans-serif",
    color:T.text,
    position:"relative",
    overflow:"hidden",
  };

  const card = (extra={}) => ({
    background:T.card,
    border:`1px solid ${T.border}`,
    borderRadius:24,
    backdropFilter:"blur(20px)",
    ...extra,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SCREEN: WELCOME
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "welcome") return (
    <div style={base}>
      <FloatingStars />
      <Confetti active={showConfetti} />
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", animation:"slideUp 0.8s cubic-bezier(0.34,1.2,0.64,1) forwards", maxWidth:520 }}>
          <div style={{ fontSize:100, marginBottom:16, animation:"wiggle 2s ease-in-out infinite" }}>🌟</div>
          <h1 style={{ fontFamily:"'Nunito', sans-serif", fontSize:48, fontWeight:900, lineHeight:1.1, marginBottom:12 }}>
            <span style={{ background:"linear-gradient(135deg, #FF6B9D, #C44BFF, #4BAAFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Mundo Mágico
            </span>
          </h1>
          <p style={{ fontSize:18, color:T.muted, marginBottom:40, lineHeight:1.6 }}>
            Un lugar especial donde puedes descubrir <br/>
            <strong style={{ color:T.text }}>¡quién eres y cuáles son tus superpoderes!</strong> ✨
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
            {["🎭 Emociones","⚡ Superpoderes","🌈 Tu Mundo","🗺️ Aventuras"].map((t,i) => (
              <div key={i} style={{ ...card(), padding:"8px 16px", fontSize:14, color:T.muted, animation:`popIn 0.5s ease forwards`, animationDelay:`${0.3+i*0.1}s`, opacity:0 }}>{t}</div>
            ))}
          </div>
          <button onClick={() => setScreen("name")} style={{
            background:"linear-gradient(135deg, #FF6B9D, #C44BFF)",
            color:"white", border:"none", borderRadius:99,
            padding:"18px 48px", fontSize:20, fontWeight:800,
            fontFamily:"'Nunito', sans-serif",
            cursor:"pointer", boxShadow:"0 8px 32px rgba(196,75,255,0.4)",
            transition:"all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px) scale(1.05)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(196,75,255,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(196,75,255,0.4)"; }}
          >
            ¡Empezar la Aventura! 🚀
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SCREEN: NAME
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "name") return (
    <div style={base}>
      <FloatingStars />
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative", zIndex:1 }}>
        <div style={{ ...card(), padding:48, maxWidth:460, width:"100%", textAlign:"center", animation:"popIn 0.6s cubic-bezier(0.34,1.2,0.64,1)" }}>
          <div style={{ fontSize:72, marginBottom:16 }}>👋</div>
          <h2 style={{ fontFamily:"'Nunito', sans-serif", fontSize:32, fontWeight:900, marginBottom:8 }}>
            ¡Hola, explorador/a!
          </h2>
          <p style={{ color:T.muted, marginBottom:32 }}>¿Cómo te llamas? Así podré llamarte durante tu aventura mágica</p>
          <input
            autoFocus
            placeholder="Escribe tu nombre aquí..."
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter" && nameInput.trim()) { setChildName(nameInput.trim()); setScreen("games"); } }}
            style={{
              width:"100%", background:"rgba(255,255,255,0.08)",
              border:`2px solid ${nameInput ? T.purple : T.border}`,
              borderRadius:16, padding:"16px 20px", fontSize:18,
              color:T.text, fontFamily:"'Nunito', sans-serif", fontWeight:700,
              marginBottom:24, textAlign:"center",
              transition:"border-color 0.3s ease",
            }}
          />
          <button
            onClick={() => { if(nameInput.trim()) { setChildName(nameInput.trim()); setScreen("games"); } }}
            disabled={!nameInput.trim()}
            style={{
              width:"100%",
              background: nameInput.trim() ? "linear-gradient(135deg, #4BAAFF, #C44BFF)" : "rgba(255,255,255,0.1)",
              color:"white", border:"none", borderRadius:99,
              padding:"16px", fontSize:18, fontWeight:800,
              fontFamily:"'Nunito', sans-serif",
              cursor: nameInput.trim() ? "pointer" : "not-allowed",
              transition:"all 0.3s ease",
              boxShadow: nameInput.trim() ? "0 8px 32px rgba(75,170,255,0.4)" : "none",
            }}
          >
            ¡Esa soy yo / yo! ✨
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SCREEN: GAME SELECT
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "games") return (
    <div style={base}>
      <FloatingStars />
      <Confetti active={showConfetti} />
      <div style={{ minHeight:"100vh", padding:"32px 24px", position:"relative", zIndex:1, maxWidth:700, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <div>
            <h2 style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, fontSize:24 }}>
              Hola, <span style={{ background:"linear-gradient(135deg, #FF6B9D, #C44BFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{childName}</span>! 👋
            </h2>
            <p style={{ color:T.muted, fontSize:14 }}>{completedGames.length}/{GAMES.length} aventuras completadas</p>
          </div>
          <ScoreBadge score={totalScore} maxScore={maxPossibleScore} />
        </div>

        {/* Progress */}
        <div style={{ marginBottom:32 }}>
          <ProgressBar current={completedGames.length} total={GAMES.length} color={T.purple} />
        </div>

        {/* Games Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:20 }}>
          {GAMES.map((game, i) => {
            const done = completedGames.includes(game.id);
            return (
              <div key={game.id}
                onClick={() => !done && handleStartGame(game)}
                style={{
                  ...card(),
                  padding:28, cursor: done ? "default" : "pointer",
                  border:`1px solid ${done ? game.color+"44" : T.border}`,
                  background: done ? `${game.color}11` : T.card,
                  animation:`slideUp 0.5s ease forwards`, animationDelay:`${i*0.1}s`, opacity:0,
                  position:"relative", overflow:"hidden",
                  transition:"all 0.3s ease",
                }}
                onMouseEnter={e => { if(!done) { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 20px 40px ${game.color}33`; e.currentTarget.style.border=`1px solid ${game.color}66`; }}}
                onMouseLeave={e => { if(!done) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.border=`1px solid ${T.border}`; }}}
              >
                {done && <div style={{ position:"absolute", top:12, right:12, background:`${game.color}22`, border:`1px solid ${game.color}66`, borderRadius:99, padding:"4px 10px", fontSize:12, color:game.color, fontWeight:700 }}>✓ ¡Completado!</div>}
                <div style={{ fontSize:52, marginBottom:12 }}>{game.emoji}</div>
                <h3 style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, fontSize:20, marginBottom:6, color: done ? game.color : T.text }}>{game.title}</h3>
                <p style={{ color:T.muted, fontSize:14, lineHeight:1.5 }}>{game.description}</p>
                {!done && (
                  <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:8, color:game.color, fontWeight:700, fontSize:14 }}>
                    <span>Jugar</span><span>→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Finish button */}
        {completedGames.length > 0 && (
          <div style={{ textAlign:"center", marginTop:40, animation:"slideUp 0.5s ease forwards" }}>
            <button onClick={handleFinish} style={{
              background:"linear-gradient(135deg, #FFD54B, #FF944B)",
              color:"#1a0533", border:"none", borderRadius:99,
              padding:"18px 48px", fontSize:18, fontWeight:900,
              fontFamily:"'Nunito', sans-serif", cursor:"pointer",
              boxShadow:"0 8px 32px rgba(255,213,75,0.4)",
              transition:"all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(255,213,75,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(255,213,75,0.4)"; }}
            >
              🏆 Ver Mi Perfil Mágico ({completedGames.length}/{GAMES.length} aventuras)
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SCREEN: GAME (questions)
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "game" && selectedGame) {
    const q = selectedGame.questions[questionIndex];
    const totalQ = selectedGame.questions.length;
    return (
      <div style={base}>
        <FloatingStars />
        <Confetti active={showConfetti} />
        <div style={{ minHeight:"100vh", padding:"24px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1 }}>
          <div style={{ width:"100%", maxWidth:560 }}>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <button onClick={() => setScreen("games")} style={{ background:"rgba(255,255,255,0.1)", border:`1px solid ${T.border}`, borderRadius:99, padding:"8px 16px", color:T.muted, cursor:"pointer", fontSize:14 }}>← Volver</button>
              <div style={{ flex:1 }}>
                <ProgressBar current={questionIndex} total={totalQ} color={selectedGame.color} />
              </div>
              <div style={{ color:T.muted, fontSize:13, fontFamily:"'DM Mono', monospace", minWidth:40, textAlign:"right" }}>{questionIndex+1}/{totalQ}</div>
            </div>

            {/* Game badge */}
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:`${selectedGame.color}22`, border:`1px solid ${selectedGame.color}66`, borderRadius:99, padding:"8px 20px" }}>
                <span style={{ fontSize:20 }}>{selectedGame.emoji}</span>
                <span style={{ color:selectedGame.color, fontWeight:700, fontSize:14 }}>{selectedGame.title}</span>
              </div>
            </div>

            {/* Question card */}
            <div key={q.id} style={{ ...card(), padding:36, textAlign:"center", marginBottom:20, animation:"popIn 0.5s cubic-bezier(0.34,1.2,0.64,1)" }}>
              <div style={{ fontSize:28, fontFamily:"'Nunito', sans-serif", fontWeight:900, lineHeight:1.4, color:T.text }}>
                {q.text}
              </div>
            </div>

            {/* Options */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {q.options.map((opt, i) => {
                const isSelected = selectedOption?.text === opt.text;
                const isOther = selectedOption && !isSelected;
                return (
                  <div key={i}
                    onClick={() => handleAnswer(opt)}
                    style={{
                      ...card(),
                      padding:20, cursor: selectedOption ? "default" : "pointer",
                      textAlign:"center",
                      border: isSelected ? `2px solid ${selectedGame.color}` : `1px solid ${T.border}`,
                      background: isSelected ? `${selectedGame.color}22` : isOther ? "rgba(255,255,255,0.03)" : T.card,
                      opacity: isOther ? 0.5 : 1,
                      transform: isSelected ? "scale(1.03)" : "scale(1)",
                      transition:"all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
                      animation:`popIn 0.4s ease forwards`, animationDelay:`${i*0.07}s`, 
                      boxShadow: isSelected ? `0 0 20px ${selectedGame.color}44` : "none",
                    }}
                    onMouseEnter={e => { if(!selectedOption) { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.border=`1px solid ${selectedGame.color}88`; }}}
                    onMouseLeave={e => { if(!selectedOption) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.border=`1px solid ${T.border}`; }}}
                  >
                    <div style={{ fontSize:36, marginBottom:10 }}>{opt.emoji}</div>
                    <div style={{ fontSize:14, fontWeight:600, lineHeight:1.4, color: isSelected ? selectedGame.color : T.text }}>{opt.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SCREEN: RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  if (screen === "results") {
    const pct = Math.round((totalScore / maxPossibleScore) * 100);
    const level = pct >= 90 ? { emoji:"🏆", name:"Maestro Mágico", desc:"¡Eres increíble! Tienes una personalidad extraordinaria." }
      : pct >= 70 ? { emoji:"⭐", name:"Explorador Estelar", desc:"¡Fantástico! Tu mundo interior es riquísimo." }
      : pct >= 50 ? { emoji:"🌟", name:"Aventurero", desc:"¡Muy bien! Estás descubriendo tus grandes talentos." }
      : { emoji:"🌱", name:"Aprendiz Mágico", desc:"¡Que bien que exploraste! Sigues creciendo cada día." };

    return (
      <div style={base}>
        <FloatingStars />
        <Confetti active={showConfetti} />
        <div style={{ minHeight:"100vh", padding:"32px 24px", position:"relative", zIndex:1, maxWidth:640, margin:"0 auto" }}>

          {/* Hero */}
          <div style={{ textAlign:"center", marginBottom:40, animation:"slideUp 0.8s cubic-bezier(0.34,1.2,0.64,1)" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
              <ProfilePlanet topTrait={primaryTrait} size={140} />
            </div>
            <h1 style={{ fontFamily:"'Nunito', sans-serif", fontSize:36, fontWeight:900, marginBottom:8 }}>
              ✨ {childName} vive en el <br/>
              <span style={{ background:`linear-gradient(135deg, ${TRAIT_LABELS[primaryTrait]?.color || T.purple}, #4BAAFF)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {planetName}
              </span>
            </h1>
            <p style={{ color:T.muted, fontSize:16 }}>{level.desc}</p>
          </div>

          {/* Score card */}
          <div style={{ ...card({ background:`linear-gradient(135deg, rgba(196,75,255,0.15), rgba(75,170,255,0.15))` }), padding:28, textAlign:"center", marginBottom:24, animation:"popIn 0.6s ease 0.2s forwards", opacity:0 }}>
            <div style={{ fontSize:52, marginBottom:8 }}>{level.emoji}</div>
            <div style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, fontSize:28, color:T.yellow }}>{level.name}</div>
            <div style={{ fontFamily:"'DM Mono', monospace", fontSize:40, fontWeight:700, color:T.text, margin:"12px 0" }}>
              {totalScore} <span style={{ fontSize:20, color:T.muted }}>/ {maxPossibleScore} pts</span>
            </div>
            <div style={{ width:"100%", background:"rgba(255,255,255,0.1)", borderRadius:99, height:12, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg, #C44BFF, #4BAAFF)", borderRadius:99, boxShadow:"0 0 12px rgba(196,75,255,0.5)", transition:"width 1s ease 0.5s" }} />
            </div>
            <div style={{ color:T.muted, marginTop:8 }}>{pct}% de tu potencial mágico revelado</div>
          </div>

          {/* Traits */}
          {topTraits.length > 0 && (
            <div style={{ ...card(), padding:24, marginBottom:24, animation:"slideUp 0.6s ease 0.4s forwards", opacity:0 }}>
              <h3 style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, marginBottom:16, fontSize:18 }}>🌟 Tus Superpoderes</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {topTraits.map(([trait, count], i) => {
                  const info = TRAIT_LABELS[trait];
                  if (!info) return null;
                  const isTop = i === 0;
                  return (
                    <div key={trait} style={{
                      display:"flex", alignItems:"center", gap:8,
                      background:`${info.color}${isTop ? "33" : "18"}`,
                      border:`1px solid ${info.color}${isTop ? "88" : "44"}`,
                      borderRadius:99, padding: isTop ? "10px 18px" : "8px 14px",
                      boxShadow: isTop ? `0 0 16px ${info.color}44` : "none",
                    }}>
                      <span style={{ fontSize: isTop ? 20 : 16 }}>{info.emoji}</span>
                      <span style={{ color:info.color, fontWeight: isTop ? 800 : 600, fontSize: isTop ? 14 : 13 }}>{info.label}</span>
                      {isTop && <span style={{ color:T.muted, fontSize:11 }}>★ Principal</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Game breakdown */}
          <div style={{ ...card(), padding:24, marginBottom:32, animation:"slideUp 0.6s ease 0.6s forwards", opacity:0 }}>
            <h3 style={{ fontFamily:"'Nunito', sans-serif", fontWeight:900, marginBottom:16, fontSize:18 }}>📊 Tu Aventura</h3>
            {GAMES.filter(g => completedGames.includes(g.id)).map((game) => {
              const gameAnswers = answers[game.id] || [];
              const gameScore = gameAnswers.reduce((s, a) => s + (a.points || 0), 0);
              const gameMax = game.questions.reduce((s, q) => s + Math.max(...q.options.map(o => o.points)), 0);
              const gamePct = Math.round((gameScore/gameMax)*100);
              return (
                <div key={game.id} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <span style={{ fontSize:24 }}>{game.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:14, fontWeight:600 }}>{game.title}</span>
                      <span style={{ fontSize:13, color:T.muted, fontFamily:"'DM Mono',monospace" }}>{gameScore}/{gameMax}</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:99, height:6 }}>
                      <div style={{ height:"100%", width:`${gamePct}%`, background:game.color, borderRadius:99, boxShadow:`0 0 6px ${game.color}88` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message */}
          <div style={{ ...card({ background:`linear-gradient(135deg, rgba(255,107,157,0.12), rgba(196,75,255,0.12))` }), padding:24, textAlign:"center", marginBottom:32, animation:"popIn 0.6s ease 0.8s forwards", opacity:0 }}>
            <div style={{ fontSize:32, marginBottom:8 }}>💌</div>
            <p style={{ lineHeight:1.8, color:T.muted }}>
              <strong style={{ color:T.text }}>{childName}</strong>, cada respuesta que diste muestra lo especial que eres. 
              Tu{" "}<strong style={{ color:TRAIT_LABELS[primaryTrait]?.color }}>{TRAIT_LABELS[primaryTrait]?.label.toLowerCase()}</strong>{" "}
              es tu mayor tesoro. ¡Sigue brillando con toda tu luz! 🌟
            </p>
          </div>

          {/* Restart */}
          <div style={{ textAlign:"center" }}>
            <button onClick={() => {
              setScreen("name"); setChildName(""); setNameInput("");
              setAnswers({}); setTotalScore(0); setCompletedGames([]);
              setAllTags([]); setSelectedOption(null);
            }} style={{
              background:"linear-gradient(135deg, #4BFF9D, #4BAAFF)",
              color:"#1a0533", border:"none", borderRadius:99,
              padding:"16px 40px", fontSize:17, fontWeight:900,
              fontFamily:"'Nunito', sans-serif", cursor:"pointer",
              boxShadow:"0 8px 32px rgba(75,255,157,0.3)",
              transition:"all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
            >
              🔄 Nueva Aventura
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
