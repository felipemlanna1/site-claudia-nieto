import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Scissors, Star, MapPin, Clock, Phone, WhatsappLogo,
  List, X, Sparkle, Heart, Eye, HandSoap,
  Palette, ArrowRight, CaretDown, Quotes,
  FlowerLotus, User, CalendarBlank
} from '@phosphor-icons/react'

/* ───────── THEME ───────── */
const T = {
  bg: '#fdf5ef',
  card: '#fff',
  surface: '#faf3ec',
  gold: '#d4a574',
  brown: '#8b5e3c',
  dark: '#3d2b1f',
  text: '#5a4234',
  muted: '#9b8577',
  border: '#e8d5c4',
  accent: '#c49666',
}

/* ───────── DATA ───────── */
const PHONE = '(48) 99184-8790'
const WA = 'https://wa.me/5548991848790'
const ADDRESS = 'Condomínio Summer Shop - Rua Madre Maria Vilac, 1224 - Canasvieiras'

const SERVICES = [
  { name: 'Corte de Cabelo', desc: 'Cortes femininos e masculinos personalizados para cada tipo de rosto e estilo', icon: Scissors },
  { name: 'Coloração', desc: 'Técnicas avançadas de coloração para resultados vibrantes e naturais', icon: Palette },
  { name: 'Mechas & Highlights', desc: 'Iluminação, balayage e mechas que realçam sua beleza natural', icon: Sparkle },
  { name: 'Escova & Penteados', desc: 'Escova modeladora, penteados para festas e eventos especiais', icon: FlowerLotus },
  { name: 'Manicure & Pedicure', desc: 'Cuidados completos para mãos e pés com esmaltação impecável', icon: HandSoap },
  { name: 'Design de Sobrancelha', desc: 'Modelagem profissional que valoriza seu olhar e expressão', icon: Eye },
  { name: 'Tranças & Extensões', desc: 'Tranças criativas e extensões capilares para volume e comprimento', icon: Heart },
  { name: 'Depilação', desc: 'Depilação profissional com cera para todas as regiões', icon: Sparkle },
  { name: 'Alisamento', desc: 'Progressiva e alisamentos com produtos de alta qualidade', icon: FlowerLotus },
]

const REVIEWS = [
  { text: 'Sou muito bem atendido pela proprietária Claudia. Excelente profissional. Já corto cabelo com ela há muito tempo', author: 'L.G.P.', stars: 5 },
  { text: 'O salão é agradável, atendimento muito bom e a manicure que me atendeu foi perfeita. Adorei', author: 'G.R.', stars: 5 },
  { text: 'Super Profissional. Amo o seu trabalho. Indico de olhos fechados. Cuida do meus cabelos há 6 anos', author: 'P.R.', stars: 5 },
  { text: 'Excelente atendimento! A Cláudia a melhor cabeleireira de Canasvieiras, ótima profissional!', author: 'C.V.', stars: 5 },
  { text: 'Profissional competentíssima!', author: 'V.F.', stars: 5 },
  { text: 'A minha esposa se identificou com as profissionais, local agradável.', author: 'A.C.C.F.', stars: 5 },
  { text: 'Lugar muito quente! Excelente Profissional! sem dúvidas super aconselhável', author: 'L.M.', stars: 5 },
  { text: 'Ótimo atendimento e preço justo.', author: 'D.B.', stars: 5 },
]

const HOURS = [
  { day: 'Segunda', time: '15h — 20h', closed: false },
  { day: 'Terça a Sábado', time: '10h — 20h', closed: false },
  { day: 'Domingo', time: 'Fechado', closed: true },
]

const NAV_ITEMS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contato', href: '#contato' },
]

/* ───────── REVEAL ───────── */
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ───────── NAVBAR ───────── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled ? 'rgba(253,245,239,0.95)' : 'rgba(253,245,239,0.7)'
  const border = scrolled ? T.border : 'transparent'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: navBg, borderBottom: `1px solid ${border}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="./images/logo.svg" alt="Claudia Nieto" style={{ height: 44 }} />
        </a>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-desk">
          {NAV_ITEMS.map(n => (
            <a key={n.href} href={n.href} style={{ color: T.muted, textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: 0.5, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = T.brown}
              onMouseLeave={e => e.target.style.color = T.muted}
            >{n.label}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            background: T.gold, color: '#fff', padding: '8px 20px', borderRadius: 24, fontSize: 13, fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 4px 16px ${T.gold}44` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <WhatsappLogo size={16} weight="fill" /> Agendar
          </a>
        </div>

        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: T.brown, cursor: 'pointer' }} className="nav-mob-btn">
          {open ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', background: 'rgba(253,245,239,0.98)', borderTop: `1px solid ${T.border}` }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NAV_ITEMS.map(n => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ color: T.dark, textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>{n.label}</a>
              ))}
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ background: T.gold, color: '#fff', padding: '12px 20px', borderRadius: 24, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                Agendar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desk { display: none !important; }
          .nav-mob-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

/* ───────── HERO ───────── */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: T.bg }}>
      {/* Subtle decorative elements */}
      <div style={{ position: 'absolute', top: '8%', right: '5%', opacity: 0.06 }}>
        <img src="./images/scissors-icon.svg" alt="" style={{ width: 200 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '12%', left: '3%', opacity: 0.05 }}>
        <img src="./images/mirror-icon.svg" alt="" style={{ width: 160 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(./images/pattern-dots.svg)', backgroundSize: 40, opacity: 0.4 }} />

      {/* Warm radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${T.gold}12 0%, transparent 60%)` }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src="./images/leaf-ornament.svg" alt="" style={{ width: 100, margin: '0 auto 24px', opacity: 0.5 }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${T.gold}15`, border: `1px solid ${T.gold}30`, borderRadius: 30, padding: '6px 18px', marginBottom: 28 }}
        >
          <MapPin size={14} weight="fill" style={{ color: T.gold }} />
          <span style={{ color: T.brown, fontSize: 12, fontWeight: 500, letterSpacing: 1.5 }}>CANASVIEIRAS · FLORIANÓPOLIS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1.1, color: T.dark, margin: '0 0 20px', fontWeight: 600 }}
        >
          Claudia Nieto<br />
          <span style={{ color: T.gold, fontStyle: 'italic', fontWeight: 500, fontSize: '0.55em' }}>Salão de Beleza</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ color: T.muted, fontSize: 17, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.8 }}
        >
          Atendimento personalizado pela proprietária Claudia. Mais de 6 anos cuidando da beleza e autoestima das clientes de Canasvieiras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            background: T.gold, color: '#fff', padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: `0 4px 24px ${T.gold}33`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${T.gold}55` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 24px ${T.gold}33` }}
          >
            <WhatsappLogo size={18} weight="fill" /> Agendar Agora
          </a>
          <a href="#tratamentos" style={{
            border: `2px solid ${T.border}`, color: T.brown, padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 500, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.background = `${T.gold}08` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent' }}
          >
            Ver Tratamentos <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ marginTop: 56 }}>
          <CaretDown size={24} style={{ color: T.muted }} />
        </motion.div>
      </div>
    </section>
  )
}

/* ───────── SOBRE ───────── */
function AboutSection() {
  return (
    <section id="sobre" style={{ padding: '100px 24px', background: T.card }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
          <Reveal>
            <div>
              <img src="./images/leaf-ornament.svg" alt="" style={{ width: 80, marginBottom: 20, opacity: 0.4 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(30px, 4vw, 44px)', color: T.dark, margin: '0 0 20px', fontWeight: 600, lineHeight: 1.2 }}>
                Beleza com <span style={{ color: T.gold, fontStyle: 'italic' }}>carinho</span> e dedicação
              </h2>
              <p style={{ color: T.text, fontSize: 15, lineHeight: 1.9, margin: '0 0 20px' }}>
                O Salão Claudia Nieto é referência em Canasvieiras quando o assunto é cuidado pessoal. Com atendimento caloroso e personalizado, Claudia conquista clientes que retornam há mais de 6 anos.
              </p>
              <p style={{ color: T.text, fontSize: 15, lineHeight: 1.9, margin: '0 0 28px' }}>
                Cada cliente é único — e é tratado assim. Do corte à coloração, da manicure ao design de sobrancelha, tudo é feito com atenção aos detalhes e paixão pela profissão.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { val: '4.7', label: 'Google' },
                  { val: '50+', label: 'Avaliações' },
                  { val: '6+', label: 'Anos' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: T.gold, fontWeight: 700 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ position: 'relative' }}>
              <div style={{
                background: `linear-gradient(135deg, ${T.gold}15, ${T.surface})`,
                borderRadius: 24, padding: 40, border: `1px solid ${T.border}`,
                textAlign: 'center',
              }}>
                <img src="./images/scissors-icon.svg" alt="" style={{ width: 64, margin: '0 auto 20px', opacity: 0.5 }} />
                <User size={80} weight="duotone" style={{ color: T.gold, marginBottom: 16 }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: T.dark, fontWeight: 600, margin: '0 0 8px' }}>Claudia Nieto</h3>
                <p style={{ color: T.muted, fontSize: 13, margin: '0 0 16px' }}>Proprietária & Cabeleireira</p>
                <p style={{ color: T.text, fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>
                  &ldquo;Cada cliente que senta na minha cadeira merece sair se sentindo a melhor versão de si mesma.&rdquo;
                </p>
              </div>
              {/* Decorative corner */}
              <div style={{ position: 'absolute', top: -8, right: -8, width: 60, height: 60, border: `2px solid ${T.gold}30`, borderRadius: '0 24px 0 0', borderLeft: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', bottom: -8, left: -8, width: 60, height: 60, border: `2px solid ${T.gold}30`, borderRadius: '0 0 0 24px', borderRight: 'none', borderTop: 'none' }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────── TRATAMENTOS ───────── */
function ServicesSection() {
  return (
    <section id="tratamentos" style={{ padding: '100px 24px', background: T.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: T.gold, fontSize: 12, fontWeight: 600, letterSpacing: 3 }}>NOSSOS CUIDADOS</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: T.dark, margin: '12px 0 0', fontWeight: 600 }}>
              Tratamentos <span style={{ color: T.gold, fontStyle: 'italic' }}>Especiais</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 8px 30px ${T.gold}15` }}
                style={{
                  background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: '26px 24px',
                  transition: 'box-shadow 0.3s', display: 'flex', alignItems: 'flex-start', gap: 16, height: '100%',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${T.gold}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.icon size={20} weight="duotone" style={{ color: T.gold }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: T.dark, fontWeight: 600, margin: '0 0 6px' }}>{s.name}</h3>
                  <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, background: T.gold, color: '#fff', padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600, textDecoration: 'none',
              boxShadow: `0 4px 24px ${T.gold}33`, transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <CalendarBlank size={18} weight="duotone" /> Agendar Tratamento
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── DIFERENCIAIS ───────── */
function DifferentialsSection() {
  const items = [
    { icon: Heart, title: 'Atendimento Pessoal', desc: 'A proprietária Claudia atende pessoalmente — construindo relações de confiança há mais de 6 anos' },
    { icon: Star, title: 'Nota 4.7 no Google', desc: '50 avaliações reais de clientes satisfeitas que voltam sempre' },
    { icon: Sparkle, title: 'Preço Justo', desc: 'Qualidade premium com valores acessíveis — mencionado em diversas avaliações' },
    { icon: FlowerLotus, title: 'Ambiente Acolhedor', desc: 'Espaço agradável e confortável no Condomínio Summer Shop' },
  ]

  return (
    <section style={{ padding: '100px 24px', background: T.card }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: T.gold, fontSize: 12, fontWeight: 600, letterSpacing: 3 }}>POR QUE NOS ESCOLHER</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: T.dark, margin: '12px 0 0', fontWeight: 600 }}>
              O que nos torna <span style={{ color: T.gold, fontStyle: 'italic' }}>diferentes</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, borderColor: T.gold }}
                style={{
                  textAlign: 'center', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '36px 24px',
                  transition: 'border-color 0.3s',
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${T.gold}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <item.icon size={26} weight="duotone" style={{ color: T.gold }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: T.dark, fontWeight: 600, margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── DEPOIMENTOS ───────── */
function ReviewsSection() {
  const [active, setActive] = useState(0)
  const visibleReviews = REVIEWS.slice(0, 6)

  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % visibleReviews.length), 5000)
    return () => clearInterval(iv)
  }, [visibleReviews.length])

  return (
    <section id="depoimentos" style={{ padding: '100px 24px', background: T.surface }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: T.gold, fontSize: 12, fontWeight: 600, letterSpacing: 3 }}>O QUE DIZEM SOBRE NÓS</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: T.dark, margin: '12px 0 0', fontWeight: 600 }}>
              Clientes <span style={{ color: T.gold, fontStyle: 'italic' }}>Satisfeitas</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ position: 'relative', minHeight: 240 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center', background: T.card, border: `1px solid ${T.border}`, borderRadius: 24, padding: '40px 36px',
                }}
              >
                <Quotes size={36} weight="fill" style={{ color: `${T.gold}33`, marginBottom: 20 }} />
                <p style={{ color: T.dark, fontSize: 18, lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", margin: '0 0 24px' }}>
                  &ldquo;{visibleReviews[active].text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: visibleReviews[active].stars }).map((_, j) => (
                      <Star key={j} size={14} weight="fill" style={{ color: T.gold }} />
                    ))}
                  </div>
                  <span style={{ color: T.muted, fontSize: 13 }}>— {visibleReviews[active].author}, Google</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              {visibleReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === active ? T.gold : T.border,
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── PROCESSO ───────── */
function ProcessSection() {
  const steps = [
    { num: '01', title: 'Agende', desc: 'Escolha o melhor dia e envie uma mensagem pelo WhatsApp', icon: CalendarBlank },
    { num: '02', title: 'Consulte', desc: 'Conversamos sobre o que deseja e indicamos o melhor tratamento', icon: Heart },
    { num: '03', title: 'Transforme-se', desc: 'Relaxe enquanto cuidamos de cada detalhe da sua beleza', icon: Sparkle },
  ]

  return (
    <section style={{ padding: '100px 24px', background: T.card }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: T.gold, fontSize: 12, fontWeight: 600, letterSpacing: 3 }}>COMO FUNCIONA</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: T.dark, margin: '12px 0 0', fontWeight: 600 }}>
              Simples & <span style={{ color: T.gold, fontStyle: 'italic' }}>Prático</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: `${T.gold}15`, fontWeight: 700, lineHeight: 1 }}>{step.num}</div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${T.gold}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-20px auto 16px' }}>
                  <step.icon size={24} weight="duotone" style={{ color: T.gold }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: T.dark, fontWeight: 600, margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── AGENDA / HORÁRIO ───────── */
function ScheduleSection() {
  return (
    <section id="agenda" style={{ padding: '100px 24px', background: T.surface }}>
      <div style={{ maxWidth: 550, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <Clock size={28} weight="duotone" style={{ color: T.gold, marginBottom: 12 }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 44px)', color: T.dark, margin: '0 0 8px', fontWeight: 600 }}>
              Horários de <span style={{ color: T.gold, fontStyle: 'italic' }}>Atendimento</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, overflow: 'hidden' }}>
            {HOURS.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 28px',
                  borderBottom: i < HOURS.length - 1 ? `1px solid ${T.border}` : 'none',
                  opacity: h.closed ? 0.4 : 1,
                }}
              >
                <span style={{ color: T.dark, fontSize: 15, fontWeight: 500 }}>{h.day}</span>
                <span style={{ color: h.closed ? T.muted : T.gold, fontSize: 15, fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1 }}>{h.time}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, background: T.gold, color: '#fff', padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600, textDecoration: 'none',
              boxShadow: `0 4px 24px ${T.gold}33`, transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <WhatsappLogo size={18} weight="fill" /> Agendar pelo WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── CONTATO / MAPA ───────── */
function ContactSection() {
  const MAPS = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.8!2d-48.4622!3d-27.4297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sClaudia+Nieto!5e0!3m2!1sen!2sbr'

  return (
    <section id="contato" style={{ padding: '100px 24px', background: T.card }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <MapPin size={28} weight="duotone" style={{ color: T.gold, marginBottom: 12 }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 44px)', color: T.dark, margin: '0 0 8px', fontWeight: 600 }}>
              Venha nos <span style={{ color: T.gold, fontStyle: 'italic' }}>Visitar</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          <Reveal>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${T.border}`, height: 300 }}>
              <iframe
                src={MAPS}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salão Claudia Nieto no mapa"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <MapPin size={18} weight="duotone" style={{ color: T.gold, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: T.dark, fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Endereço</h4>
                    <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{ADDRESS}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <Phone size={18} weight="duotone" style={{ color: T.gold, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: T.dark, fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Telefone / WhatsApp</h4>
                    <a href={`tel:${PHONE.replace(/\D/g, '')}`} style={{ color: T.gold, fontSize: 15, textDecoration: 'none', fontWeight: 600 }}>{PHONE}</a>
                  </div>
                </div>
              </div>

              <a href={WA} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: '#25d366', color: '#fff', padding: '16px 20px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <WhatsappLogo size={20} weight="fill" /> Falar com a Claudia
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────── CTA FINAL ───────── */
function CTASection() {
  return (
    <section style={{ padding: '100px 24px', background: T.surface, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${T.gold}10 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(./images/pattern-dots.svg)', backgroundSize: 40, opacity: 0.3 }} />

      <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <Reveal>
          <img src="./images/leaf-ornament.svg" alt="" style={{ width: 80, margin: '0 auto 24px', opacity: 0.4 }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 52px)', color: T.dark, margin: '0 0 16px', fontWeight: 600, lineHeight: 1.2 }}>
            Pronta para se sentir <span style={{ color: T.gold, fontStyle: 'italic' }}>incrível</span>?
          </h2>
          <p style={{ color: T.text, fontSize: 16, lineHeight: 1.7, marginBottom: 36, maxWidth: 450, marginLeft: 'auto', marginRight: 'auto' }}>
            Agende agora pelo WhatsApp e venha descobrir por que nossas clientes voltam há mais de 6 anos.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, background: T.gold, color: '#fff', padding: '16px 36px', borderRadius: 30, fontSize: 16, fontWeight: 600, textDecoration: 'none',
              boxShadow: `0 4px 30px ${T.gold}44`, transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 40px ${T.gold}66` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 30px ${T.gold}44` }}
            >
              <WhatsappLogo size={20} weight="fill" /> Agendar Agora
            </a>
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, border: `2px solid ${T.border}`, color: T.brown, padding: '16px 32px', borderRadius: 30, fontSize: 16, fontWeight: 500, textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.background = `${T.gold}08` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = 'transparent' }}
            >
              <Phone size={18} weight="duotone" /> Ligar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer style={{ background: T.card, borderTop: `1px solid ${T.border}`, padding: '44px 24px 28px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src="./images/logo.svg" alt="Claudia Nieto" style={{ height: 36 }} />
            </div>
            <p style={{ color: T.muted, fontSize: 13, maxWidth: 280, lineHeight: 1.6 }}>
              Salão de beleza completo em Canasvieiras, Florianópolis. Atendimento personalizado com carinho e dedicação.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: T.dark, fontSize: 13, fontWeight: 600, margin: '0 0 12px', letterSpacing: 1 }}>NAVEGAÇÃO</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {NAV_ITEMS.map(n => (
                  <a key={n.href} href={n.href} style={{ color: T.muted, fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = T.gold}
                    onMouseLeave={e => e.target.style.color = T.muted}
                  >{n.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: T.dark, fontSize: 13, fontWeight: 600, margin: '0 0 12px', letterSpacing: 1 }}>CONTATO</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: T.muted, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25d366'}
                  onMouseLeave={e => e.currentTarget.style.color = T.muted}
                >
                  <WhatsappLogo size={14} weight="fill" /> WhatsApp
                </a>
                <a href={`tel:${PHONE.replace(/\D/g, '')}`} style={{ color: T.muted, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = T.gold}
                  onMouseLeave={e => e.currentTarget.style.color = T.muted}
                >
                  <Phone size={14} weight="duotone" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ color: T.muted, fontSize: 12, margin: 0 }}>
            &copy; {new Date().getFullYear()} Claudia Nieto — Salão de Beleza. Todos os direitos reservados.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: T.gold, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <WhatsappLogo size={14} weight="fill" /> Fale conosco
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ───────── FLOATING WA ───────── */
function FloatingWA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WA} target="_blank" rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 90,
            width: 56, height: 56, borderRadius: '50%', background: '#25d366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)', textDecoration: 'none',
          }}
          aria-label="Abrir WhatsApp"
        >
          <WhatsappLogo size={28} weight="fill" style={{ color: '#fff' }} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/* ───────── GLOBAL STYLES ───────── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: ${T.bg};
        color: ${T.text};
        overflow-x: hidden;
      }

      ::selection {
        background: ${T.gold};
        color: #fff;
      }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${T.bg}; }
      ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

      img { max-width: 100%; height: auto; }
      a { color: inherit; }
    `}</style>
  )
}

/* ───────── APP ───────── */
function App() {
  return (
    <>
      <Helmet>
        <title>Claudia Nieto — Salão de Beleza em Canasvieiras | Florianópolis</title>
        <meta name="description" content="Salão de beleza completo em Canasvieiras, Florianópolis. Corte, coloração, mechas, manicure, pedicure e design de sobrancelha. Atendimento personalizado pela proprietária Claudia." />
        <meta name="theme-color" content={T.bg} />
        <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
      </Helmet>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <DifferentialsSection />
        <ReviewsSection />
        <ProcessSection />
        <ScheduleSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}

export default App
