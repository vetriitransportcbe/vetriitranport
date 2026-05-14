import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Materials", href: "#materials" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "30+", label: "Years Experience" },
  { value: "500+", label: "Loads Delivered" },
  { value: "14+", label: "Material Types" },
  { value: "8", label: "Districts Served" },
];

const MATERIAL_CATEGORIES = [
  {
    number: "01",
    category: "Steel & Metal Transport",
    items: ["Steel Coils", "TMT Bars & Coils", "Sheet Metals (Polished / Unpolished)", "Metal Pipes", "Plates"],
  },
  {
    number: "02",
    category: "Scrap Materials",
    items: ["Steel Scrap", "Metal Scrap", "Industrial Scrap Loads"],
  },
  {
    number: "03",
    category: "Sheet Metals",
    items: ["CR", "HR", "HRPO", "GI", "GP", "GL"],
  },
  {
    number: "04",
    category: "Special Loads",
    items: ["Coil Handling (Pallet + Belts)", "Pipe Loads (Count + Fastening)", "Direct Delivery (No Unnecessary Stops)"],
  },
];

const SERVICES = [
  {
    title: "Coil Transport",
    description:
      "Every driver is specially trained for coil handling. Each truck is equipped with wooden pallets, belt tighteners, ropes, and chains to ensure safe and secure transportation.",
  },
  {
    title: "TMT Bar Transport",
    description:
      "We strictly follow your loading instructions and supervise the process to ensure hassle-free unloading. Whether it’s specific stacking (like 8mm, 10mm, 12mm), we ensure it’s done exactly as required.",
  },
  {
    title: "Steel Pipes Transport",
    description:
      "We maintain accurate count, secure pipes using belt tighteners, and protect them with tarpaulin to prevent damage during transit, especially in rainy conditions.",
  },
  {
    title: "Scrap Material Transport",
    description:
      "We handle all types of scrap including wood, metal, leather, CNC, bronze, and more. Our metal-body trucks prevent spillage, and tippers reduce unloading effort. We ensure direct, responsible delivery without unnecessary stops.",
  },
  {
    title: "Sheet Metal Transport",
    description:
      "We transport CR, HR, HRPO, GI, GP, GL, and other sheet metals regularly, backed by over 10 years of experience in safe and efficient handling.",
  },
];

const WHY_CHOOSE = [
  "Fully equipped & secure fleet (chains, belt tighteners, tarpaulin, ropes, wooden pallets)",
  "Skilled & specialized drivers for coils, HR sheets, TMT bars and heavy materials",
  "Complete documentation support with certified vehicles and drivers",
  "Advanced GPS tracking for real-time shipment monitoring",
  "On-time delivery you can rely on",
  "24/7 dedicated customer support",
];

const STATES = ["Tamil Nadu", "Kerala"];
const DISTRICTS = ["Coimbatore", "Erode", "Pollachi", "Tirupur", "Salem", "Valparai", "Ooty"];

const GALLERY_IMAGES = [
  { src: "/collage.png", alt: "Vetrii Transport operations collage" },
  {
    src: "/coil.png",
    alt: "Steel pipe and coil transport load",
  },
  {
    src: "/truck.png",
    alt: "Coil transport vehicle load",
  },
  {
    src: "/truck2.png",
    alt: "Industrial material truck load in yard",
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function RevealList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
    >
      {children}
    </motion.div>
  );
}

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: REVEAL_EASE } },
};

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<(typeof GALLERY_IMAGES)[number] | null>(null);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [serviceHovered, setServiceHovered] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (serviceHovered) return;
    if (SERVICES.length <= 1) return;
    const t = window.setInterval(() => setServiceIndex((i) => (i + 1) % SERVICES.length), 5200);
    return () => window.clearInterval(t);
  }, [serviceHovered]);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ── */}
      <header
        data-testid="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
          <button onClick={() => go("#home")} className="flex items-center gap-3 group" aria-label="Home">
            <img src="/logo-symbol.png" alt="Vetrii Traders" className="h-9 w-auto object-contain" />
            <div className="hidden sm:block text-left">
              <p className={`display-font font-bold text-sm leading-none transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
                VETRII TRANSPORT AND TRADERS
              </p>
              <p className={`display-font font-semibold text-xs leading-none mt-0.5 transition-colors ${scrolled ? "text-primary" : "text-blue-300"}`}>HEAVY MATERIALS</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                data-testid={`nav-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className={`px-4 py-2 text-base font-medium rounded transition-colors ${
                  scrolled ? "text-foreground hover:text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href="tel:+919944966110"
              data-testid="nav-call-btn"
              className="ml-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              Call Now
            </a>
          </nav>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded ${scrolled ? "text-foreground" : "text-white"}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => go(l.href)}
                    className="text-left px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary rounded hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
                <a
                  href="tel:+919944966110"
                  className="mt-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded text-center"
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0B1E3D 0%, #0D2747 45%, #0A2310 100%)" }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(21,101,192,0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center py-32">

          {/* Logo — large */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src="/logo-symbol.png"
              alt="Vetrii Traders logo"
              className="h-40 sm:h-52 lg:h-60 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="label-caps text-blue-300/70 mb-4 tracking-widest"
          >
            Inter-District Heavy Material Transport — Tamil Nadu
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="display-font font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-3"
          >
            VETRII TRANSPORT AND TRADERS
            <br />
            <span className="text-[#5BB8FF]">TAMIL NADU</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            Tamil Nadu’s trusted heavy material transporter — from load to delivery, we carry your trust.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <a
              href="tel:+919944966110"
              data-testid="hero-call-btn"
              className="px-7 py-3.5 bg-primary text-white font-semibold text-sm rounded hover:bg-primary/90 transition-colors shadow-lg"
            >
              +91 99449 66110
            </a>
            <button
              data-testid="hero-materials-btn"
              onClick={() => go("#materials")}
              className="px-7 py-3.5 border border-white/25 text-white font-semibold text-sm rounded hover:bg-white/8 transition-colors"
            >
              View Materials
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-lg overflow-hidden"
          >
            {STATS.map((s) => (
              <div key={s.label} className="py-5 px-4 text-center bg-white/5">
                <p className="display-font text-3xl sm:text-4xl font-black text-white">{s.value}</p>
                <p className="text-white/50 text-sm mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" data-testid="about-section" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="label-caps text-primary mb-4">About Us</p>
              <h2 className="display-font font-black text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
                Tamil Nadu's Trusted<br />Heavy Material Transporter
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                With over <strong className="text-foreground font-semibold">30 years of experience</strong>, we specialize in the safe and efficient transportation of heavy industrial materials, including steel coils, TMT bars and coils, sheet metals (polished and unpolished), steel scrap, metal pipes, and plates.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Led by a <strong className="text-foreground font-semibold">Master’s degree Engineer</strong>, we combine technical expertise with proven industry knowledge to ensure reliable logistics solutions. From loading to unloading, we take complete responsibility for the safety and timely delivery of your goods.
              </p>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {WHY_CHOOSE.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-base text-foreground">{point}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl border border-border">
                <img
                  src="/collage.png"
                  alt="Vetrii transport and traders operations"
                  data-testid="about-image"
                  className="w-full h-auto object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-5 -left-5 bg-primary text-white rounded-lg px-5 py-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
              >
                <p className="display-font text-2xl font-black">40+</p>
                <p className="text-blue-100 text-xs mt-0.5">Years of Trust</p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0B1E3D 0%, #0D2747 60%, #0A2310 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="label-caps text-white/40 mb-3">Coverage Area</p>
            <h2 className="display-font font-black text-3xl sm:text-4xl text-white mb-6">Where We Operate</h2>
          </Reveal>

          <Reveal delay={0.05} className="mb-8">
            <p className="label-caps text-white/40 mb-3">States Served</p>
            <div className="flex flex-wrap justify-center gap-3">
              {STATES.map((s) => (
                <span key={s} className="px-5 py-2 rounded-full border border-white/15 bg-white/5 text-white/90 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mb-4">
            <p className="label-caps text-white/40 mb-3">Districts We Serve</p>
          </Reveal>
          <RevealList className="flex flex-wrap justify-center gap-4">
            {DISTRICTS.map((d) => (
              <motion.div
                key={d}
                variants={revealItem}
                className="px-7 py-4 rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm"
              >
                <span className="display-font font-bold text-white text-xl tracking-wide">{d}</span>
              </motion.div>
            ))}
          </RevealList>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section id="materials" data-testid="materials-section" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="label-caps text-primary mb-3">What We Move</p>
            <h2 className="display-font font-black text-4xl sm:text-5xl text-foreground">Materials We Transport</h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
              A wide range of heavy industrial and construction materials — handled with expertise on every run.
            </p>
          </Reveal>

          <RevealList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MATERIAL_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.category}
                variants={revealItem}
                data-testid={`material-card-${cat.number}`}
                className="bg-card border border-card-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300 group"
              >
                <p className="display-font text-4xl font-black text-primary/40 group-hover:text-primary/70 transition-colors mb-3 leading-none">
                  {cat.number}
                </p>
                <h3 className="display-font font-bold text-foreground text-base mb-4 leading-snug">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base text-muted-foreground">
                      <span className="mt-2 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </RevealList>

          {/* CTA strip */}
          <Reveal delay={0.1} className="mt-10">
            <div className="bg-foreground text-background rounded-lg px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="display-font font-bold text-xl">Inter-District Transport Specialists</p>
                <p className="text-background/55 text-base mt-1">
                  Steel coils · TMT rods · Sheet metal · Cement · Sand · Gravel — one call handles it all.
                </p>
              </div>
              <a
                href="tel:+919944966110"
                data-testid="materials-call-btn"
                className="flex-shrink-0 px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Book a Truck
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" data-testid="services-section" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="label-caps text-primary mb-3">What We Offer</p>
            <h2 className="display-font font-black text-4xl sm:text-5xl text-foreground">Our Specialized Transport Services</h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
              Trusted. Experienced. Reliable.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div
                onMouseEnter={() => setServiceHovered(true)}
                onMouseLeave={() => setServiceHovered(false)}
                className="relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="label-caps text-muted-foreground">Swipe cards to view our services</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous service"
                      onClick={() => setServiceIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length)}
                      className="px-3 py-2 rounded border border-border bg-card hover:bg-muted/40 transition-colors text-sm font-semibold"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      aria-label="Next service"
                      onClick={() => setServiceIndex((i) => (i + 1) % SERVICES.length)}
                      className="px-3 py-2 rounded border border-border bg-card hover:bg-muted/40 transition-colors text-sm font-semibold"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="relative h-[360px] sm:h-[340px]">
                  <AnimatePresence initial={false}>
                    {[0, 1, 2].map((offset) => {
                      const idx = (serviceIndex + offset) % SERVICES.length;
                      const s = SERVICES[idx];
                      const z = 30 - offset;
                      const scale = 1 - offset * 0.06;
                      const y = offset * 18;
                      const rotate = offset === 0 ? 0 : offset === 1 ? -1.2 : 1.5;
                      const opacity = offset === 2 ? 0.75 : 1;

                      return (
                        <motion.div
                          key={`${idx}-${s.title}-${offset}`}
                          className="absolute inset-0"
                          style={{ zIndex: z }}
                          initial={{ opacity: 0, y: y + 10, scale: scale - 0.02 }}
                          animate={{ opacity, y, scale, rotate }}
                          exit={{ opacity: 0, y: y - 10, scale: scale - 0.02 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          <motion.div
                            drag={offset === 0 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.12}
                            onDragEnd={(_, info) => {
                              if (offset !== 0) return;
                              if (info.offset.x < -80) setServiceIndex((i) => (i + 1) % SERVICES.length);
                              if (info.offset.x > 80) setServiceIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
                            }}
                            whileHover={offset === 0 ? { rotate: 0.2, y: y - 2 } : {}}
                            className="h-full rounded-xl border border-white/10 bg-gradient-to-br from-[#0B1E3D] via-[#0D2747] to-[#0B1E3D] shadow-lg overflow-hidden text-white"
                          >
                            <div className="p-7 sm:p-8">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="label-caps text-blue-200/80 mb-2">Service</p>
                                  <h3 className="display-font font-black text-2xl sm:text-3xl text-white leading-tight">
                                    {s.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                                  <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10">
                                    {String(idx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                                  </span>
                                </div>
                              </div>

                              <p className="text-white/75 text-base leading-relaxed mt-4">{s.description}</p>

                              <div className="mt-6 flex items-center gap-3">
                                <a
                                  href="tel:+919944966110"
                                  className="px-5 py-2.5 bg-[#5BB8FF] text-[#0B1E3D] text-sm font-semibold rounded hover:bg-[#7CC8FF] transition-colors"
                                >
                                  Call Now
                                </a>
                                <button
                                  type="button"
                                  onClick={() => go("#contact")}
                                  className="px-5 py-2.5 border border-white/15 text-white text-sm font-semibold rounded hover:bg-white/10 transition-colors"
                                >
                                  Enquire
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {SERVICES.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setServiceIndex(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        i === serviceIndex ? "bg-primary text-white border-primary" : "bg-card text-foreground border-border hover:bg-muted/40"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-xl border border-border bg-muted/30 p-7 sm:p-8">
                <p className="label-caps text-primary mb-3">What’s special about us</p>
                <h3 className="display-font font-black text-3xl text-foreground mb-3">Our Strengths</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Seamless coordination, safe cargo handling, and on-time delivery — backed by experienced drivers and GPS-enabled tracking.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "On-time delivery you can rely on",
                    "Seamless and trouble-free communication",
                    "24/7 dedicated customer support",
                    "GPS-enabled trucks for real-time tracking",
                    "Professional, trained drivers for all load types",
                    "Assured hassle-free and secure delivery",
                  ].map((t) => (
                    <motion.div
                      key={t}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <p className="text-sm font-semibold text-foreground leading-snug">{t}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" data-testid="gallery-section" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="label-caps text-primary mb-3">Our Operations</p>
            <h2 className="display-font font-black text-4xl sm:text-5xl text-foreground">Fleet & Operations</h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
              A quick look at our fleet and heavy material handling — neat, secure and professional operations.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={`${img.src}-${idx}`}
                  type="button"
                  data-testid={`gallery-image-${idx}`}
                  onClick={() => setActiveImage(img)}
                  className="group relative rounded-lg overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <p className="text-white/90 text-sm font-semibold line-clamp-2">{img.alt}</p>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          <RevealList className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              "Heavy Load Vehicles",
              "JCB & Loaders",
              "Inter-District Routes",
              "24/7 Operations",
            ].map((label) => (
              <motion.div
                key={label}
                variants={revealItem}
                className="border border-border rounded-lg py-4 px-3 text-center text-sm font-semibold text-foreground bg-card hover:border-primary/30 hover:shadow-sm transition-all"
              >
                {label}
              </motion.div>
            ))}
          </RevealList>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background rounded-lg overflow-hidden border border-border shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">{activeImage.alt}</p>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm font-semibold rounded bg-muted hover:bg-muted/70 transition-colors"
                    onClick={() => setActiveImage(null)}
                  >
                    Close
                  </button>
                </div>
                <div className="bg-black">
                  <img src={activeImage.src} alt={activeImage.alt} className="w-full h-auto max-h-[75vh] object-contain" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONTACT ── */}
      <section id="contact" data-testid="contact-section" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="label-caps text-primary mb-3">Reach Us</p>
            <h2 className="display-font font-black text-4xl sm:text-5xl text-foreground">Contact Us</h2>
            <p className="text-muted-foreground mt-4 max-w-md text-lg leading-relaxed">
              Book a truck or get a freight quote. We respond quickly and are available 24/7.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl">
            <Reveal>
              <div className="space-y-8">
                {[
                  { label: "Phone / WhatsApp", value: "+91 99449 66110", href: "tel:+919944966110", sub: "Available 24/7" },
                  { label: "Email", value: "vetriitransportcbe@gmail.com", href: "mailto:vetriitransportcbe@gmail.com", sub: null },
                  { label: "Website", value: "www.vetriitransport.in", href: "https://www.vetriitransport.in", sub: null },
                  { label: "Address", value: "VETRII TRANSPORT AND TRADERS", href: null, sub: "10A Vinayagar Kovil Street, Sivandhapuram\nSaravanampatti, Coimbatore, Tamil Nadu" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="label-caps text-muted-foreground mb-1.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} data-testid={`contact-${item.label.split(" ")[0].toLowerCase()}`}
                        className="font-semibold text-primary hover:underline text-lg">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground text-lg">{item.value}</p>
                    )}
                    {item.sub && <p className="text-base text-muted-foreground mt-1 whitespace-pre-line">{item.sub}</p>}
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <p className="label-caps text-muted-foreground mb-3">States Served</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {STATES.map((s) => (
                      <span key={s} className="px-3 py-1 bg-foreground/5 text-foreground text-xs font-semibold rounded border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                 
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-lg p-8 border border-white/10 bg-gradient-to-br from-[#0B1E3D] via-[#0D2747] to-[#0B1E3D] text-white shadow-lg overflow-hidden">
                <h3 className="display-font font-bold text-white text-xl mb-6">Book a Transport</h3>
                <form
                  data-testid="contact-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = e.target as HTMLFormElement;
                    const name = (f.elements.namedItem("name") as HTMLInputElement).value;
                    const phone = (f.elements.namedItem("phone") as HTMLInputElement).value;
                    const msg = (f.elements.namedItem("message") as HTMLTextAreaElement).value;
                    window.open(`https://wa.me/919944966110?text=Hi%20Vetrii%20Transport,%0AName:%20${encodeURIComponent(name)}%0APhone:%20${encodeURIComponent(phone)}%0AMessage:%20${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="space-y-4"
                >
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block label-caps text-white/70 mb-1.5">{field.label}</label>
                      <input
                        name={field.name}
                        required
                        type={field.type}
                        data-testid={`input-${field.name}`}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded border border-white/15 bg-white/10 text-white placeholder:text-white/50 text-base focus:outline-none focus:ring-2 focus:ring-[#5BB8FF]/30 focus:border-[#5BB8FF]/60 transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block label-caps text-white/70 mb-1.5">Transport Requirement</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      data-testid="input-message"
                      placeholder="Describe what you need to transport, origin and destination..."
                      className="w-full px-4 py-3 rounded border border-white/15 bg-white/10 text-white placeholder:text-white/50 text-base focus:outline-none focus:ring-2 focus:ring-[#5BB8FF]/30 focus:border-[#5BB8FF]/60 transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    data-testid="btn-submit-enquiry"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-[#5BB8FF] text-[#0B1E3D] font-semibold text-sm rounded hover:bg-[#7CC8FF] transition-colors"
                  >
                    Send via WhatsApp
                  </motion.button>
                  <p className="text-xs text-center text-white/70">
                    Or call us directly:{" "}
                    <a href="tel:+919944966110" className="text-[#5BB8FF] font-semibold hover:underline">+91 99449 66110</a>
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        data-testid="footer"
        style={{ background: "linear-gradient(160deg, #0B1E3D 0%, #0D2747 60%, #0A2310 100%)" }}
        className="text-white pt-14 pb-8"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

            <div className="lg:col-span-1">
              <img src="/logo-symbol.png" alt="Vetrii Traders" className="h-14 w-auto object-contain mb-4" />
              <p className="display-font font-bold text-sm text-white">VETRII TRANSPORT AND TRADERS</p>
              <p className="text-white/45 text-xs mt-2 leading-relaxed">
                Tamil Nadu’s trusted heavy material transporter — from load to delivery, we carry your trust.
              </p>
            </div>

            <div>
              <p className="label-caps text-white/40 mb-4">Materials</p>
              <ul className="space-y-2 text-sm text-white/55">
                {["Coil & TMT Transport", "Sheet Metal & CR Sheets", "Bundle & Coil Bundle", "Wood & Metal Scraps", "M-Sand, P-Sand, Gravel", "Earthworks & Trench Material"].map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-caps text-white/40 mb-4">States</p>
              <ul className="space-y-2 text-sm text-white/55 mb-6">
                {STATES.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <p className="label-caps text-white/40 mb-4">Districts</p>
              <ul className="space-y-2 text-sm text-white/55">
                {DISTRICTS.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>

            <div>
              <p className="label-caps text-white/40 mb-4">Contact</p>
              <div className="space-y-2 text-sm text-white/55">
                <p className="font-semibold text-white">+91 99449 66110</p>
                <p>vetriitransportcbe@gmail.com</p>
                <a href="https://www.vetriitransport.in" className="hover:text-white transition-colors">www.vetriitransport.in</a>

                <p className="pt-1">10A Vinayagar Kovil Street<br />Sivandhapuram, Saravanampatti<br />Coimbatore, Tamil Nadu</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} Vetrii Transport and Traders. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a href="https://www.privacyweave.in/" target="_blank" rel="noopener noreferrer"
                className="text-white/55 hover:text-white transition-colors font-semibold">
                Privacy Weavee
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating call */}
      <motion.a
        href="tel:+919944966110"
        data-testid="floating-call-btn"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-primary text-white text-sm font-semibold rounded shadow-xl"
      >
        Call Now
      </motion.a>
    </div>
  );
}
