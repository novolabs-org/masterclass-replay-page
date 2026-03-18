"use client";
import React, { useMemo, useState, useEffect } from "react";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import communityImage from "figma:asset/0ec5debbf555b71db07914d203718ce12290011f.png";
import novolabsLogo from "figma:asset/52020c0a501af2e202886d2601d951fdf3071574.png";
import testimonioSoledad from "figma:asset/6e5fb2aaa9d7772bcbbe4a6bf69e2de0414ad263.png";
import testimonioIgnacio from "figma:asset/ddd8c550c75ead91d09eb5087516b669919b9e42.png";
import testimonioIsabel from "figma:asset/cb868f6104b1716a397ff3d4257da6aae88bd4b0.png";
import testimonioLisandro from "figma:asset/e1be36f1e1891a906ff8f6dab4328ad5c01e578e.png";
import testimonioCamila from "figma:asset/fb2e55149f94c0739cd8a464bf30d46c3eb61d63.png";
import testimonioFacundo from "figma:asset/555e9d9f5701c2b85723bdec58ac77c882e1f53b.png";
import testimonioLucas from "figma:asset/593a1eca64777b637d94e236a9382544440709e0.png";
import testimonioManuel from "figma:asset/51bf313ef1ba22faeea028820e2ff9ad256c2d5f.png";
import testimonioPol from "figma:asset/8072912981547952e29a24a79ef04a46f9d5623d.png";
import testimonioLuciano from "figma:asset/86623586593dd10bf2aec4ff37d0a436570435a8.png";
import testimonioAdrian from "figma:asset/e5b1a2dc2bea96e4a99cd72ddb11fb02b15696a3.png";
import testimonioHernan from "figma:asset/f9a9ea9de56e25d3dc44ab8b8fa6b3b32011de92.png";
import testimonioTatiana from "figma:asset/533a96a8ecdfbcd2fff5bba5b20ad2ebb95325b3.png";
import testimonioAlexy from "figma:asset/10ad59d30fe2c880fa50544745eabb6f369db066.png";

/**
 * Masterclass Replay Landing – Next.js (app router)
 * Vista estética post-login (los usuarios que llegan aquí ya están autenticados)
 *
 * • Stack: React + Tailwind
 * • Objetivo: embeber la grabación y empujar a CTA de aplicación.
 * • Cómo usar: pega este componente como `app/replay/page.tsx` en un proyecto Next.js con Tailwind.
 *   - Reemplaza `videoSrc` o usa `embedUrl` (Vimeo/YouTube) para el iframe responsive.
 */

export default function App() {
  // ====== COUNTDOWN TIMER STATE ======
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Find next Tuesday at 23:59:59
      let nextTuesday = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
      
      if (currentDay === 2) {
        // It's Tuesday - check if it's before 23:59:59
        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);
        
        if (now < todayEnd) {
          nextTuesday = todayEnd;
        } else {
          // After Tuesday 23:59:59, go to next Tuesday
          nextTuesday.setDate(now.getDate() + 7);
          nextTuesday.setHours(23, 59, 59, 999);
        }
      } else {
        // Calculate days until next Tuesday
        let daysUntilTuesday = (2 - currentDay + 7) % 7;
        if (daysUntilTuesday === 0) daysUntilTuesday = 7; // If today is Tuesday but past 23:59:59
        
        nextTuesday.setDate(now.getDate() + daysUntilTuesday);
        nextTuesday.setHours(23, 59, 59, 999);
      }
      
      const difference = nextTuesday.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ====== CONFIG (customize for your needs) ======
  const CONFIG = useMemo(
    () => ({
      brand: {
        // Brand colors from the style guide
        black: "#000000",
        background: "#000000",
        rojo: "#FF3A20",
        neon: "#D4FF78",
        white: "#FFFFFF",
        lightGrey: "#F4F4F4",
      },
      videoSrc:
        "https://cdn.coverr.co/videos/coverr-working-at-the-office-6831/1080p.mp4", // ⬅️ reemplaza con tu URL MP4/HLS si usas archivo propio
      // embedUrl: "https://player.vimeo.com/video/123456789?h=abc", // ⬅️ descomenta y usa esto si prefieres Vimeo/YouTube
      poster:
        "https://images.unsplash.com/photo-1529336953121-4f3a5b8ecb27?q=80&w=1600&auto=format&fit=crop",
      resources: [
        { name: "Lean Canvas", href: "https://www.figma.com/board/nBhVQICJnvK7azS837hlPA/Lean-Canvas---Template?node-id=0-1&t=D9uZIz1ICQWbFRsg-1" },
        { name: "Prueba de Deseabilidad", href: "https://www.figma.com/board/n7T4kgzXgSNV2zzOzkKUlY/Fuerzas-del-cliente---Template?node-id=0-1&t=lZcS9mQXxSpz2rjC-1" },
        { name: "Valida tu idea con IA en 7 días 🚀", href: "https://oferta.novolabs.xyz/" },
        { name: "Descubrí los casos de uso 🤩", href: "https://testimonios.novolabs.xyz/" },
        
      ],
      whatsappCta: "https://wa.me/5491163544698?text=Buenas!%20Te%20quisiera%20hacer%20una%20consulta%20antes%20de%20inscribirme%20al%20programa.",
      bookCallCta: "https://www.novolabs.xyz/programa-lanzar-tu-startup-en-4-meses-paso-a-paso",
      applyCta: "https://www.novolabs.xyz/entrevista-agendada-masterclass",
      testimonials: [
        {
          quote:
            "Pasé de teoría pura a ventas reales en pocas semanas aplicando el sistema.",
          author: "Ignacio P.",
        },
        {
          quote:
            "A los 10 días cerré mis primeros $3k implementando los prompts y el embudo.",
          author: "María L.",
        },
        {
          quote:
            "La personalización con IA fue el diferencial para destrabar mi oferta.",
          author: "Sofía D.",
        },
      ],
      faqs: [
        {
          q: "¿Cuánto tiempo tengo acceso a la grabación?",
          a: "Tienes acceso por 7 días para incentivar la implementación inmediata.",
        },
        {
          q: "¿Qué necesito para aplicar al programa?",
          a: "Tener una idea que te gustaría lanzar o un sector de mercado en el que te gustaría emprender.\n\n1. Rellena el formulario de inscripción.\n2. Agenda la entrevista de 45 minutos.\n3. Evaluamos tu perfil.\n4. Recibís un SÍ o un NO en máximo 96hs.",
        },
        {
          q: "¿El Programa de 4 meses incluye soporte?",
          a: "Si. Durante las 16 semanas del Programa nos veremos en vivo entre 1 y 3 veces por semana. Tanto en sesiones individuales como en sesiones grupales.",
        },
        {
          q: "¿Cuál es el valor del Programa?",
          a: "El valor del programa depende de la modalidad que selecciones y de cómo pagues.\n\nModalidad individual:\n1 pago $2000 (precio regular $2500)\n6 pagos $2625 (precio regular $3125)\n\nModalidad Equipos:\n1 pago $2500 (precio regular $3000)\n6 pagos $3250 (precio regular $3750)",
        },
      ],
    }),
    []
  );

  // ====== UI HELPERS ======
  const TestimonialCard = ({ quote, author }) => (
    <div className="rounded-2xl bg-[#1a1a1a] p-6 border border-white/5 shadow-xl">
      <p className="text-white/90 leading-7 italic">"{quote}"</p>
      <div className="mt-4 text-sm text-white/60">{author}</div>
    </div>
  );

  const [activeFaq, setActiveFaq] = useState(null);

  // ====== RENDER ======
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: CONFIG.brand.background,
        fontFamily: 'Satoshi, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      {/* CSS Variables for brand */}
      <style>{`
        :root{
          --nl-black: ${CONFIG.brand.black};
          --nl-bg: ${CONFIG.brand.background};
          --nl-rojo: ${CONFIG.brand.rojo};
          --nl-neon: ${CONFIG.brand.neon};
          --nl-white: ${CONFIG.brand.white};
          --nl-lightGrey: ${CONFIG.brand.lightGrey};
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes gentleSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-40 bg-black border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <ImageWithFallback 
              src={novolabsLogo}
              alt="Novolabs"
              className="h-8 sm:h-10 w-auto"
            />
          </div>
        </div>
      </header>

      {/* ===== HERO / VIDEO ===== */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col items-center">
          {/* Título centrado */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-center">
            Grabación de la Masterclass
          </h1>

          {/* Video container centrado */}
          <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-3xl mx-2 sm:mx-0">
            {/* Si defines CONFIG.embedUrl usamos iframe; si no, usamos <video> */}
            {CONFIG.embedUrl ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={CONFIG.embedUrl}
                  title="Masterclass Replay"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <iframe
                src="https://streamable.com/e/oflk1r"
                title="Masterclass Replay"
                frameBorder="0"
                allowFullScreen
                className="w-full aspect-video bg-black"
              />
            )}
          </div>

          {/* Recursos de regalo - Después del video */}
          <div className="mt-6 sm:mt-8 w-full max-w-2xl px-4 sm:px-0">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-lg sm:text-xl mb-4 sm:mb-6 text-left">Recursos:</h3>
              
              {/* Mobile: Lista vertical */}
              <ul className="space-y-3 text-white/80 text-sm sm:hidden">
                {CONFIG.resources.map((r) => (
                  <li key={r.name} className="flex items-start gap-3 justify-start">
                    <span className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--nl-rojo)" }}></span>
                    <a 
                      href={r.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/20 hover:text-white break-words transition-colors"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Desktop: 2 columnas de 3 items cada una */}
              <div className="hidden sm:grid grid-cols-2 gap-6 text-white/80 text-base">
                {/* Primera columna */}
                <ul className="space-y-4">
                  {CONFIG.resources.slice(0, 3).map((r) => (
                    <li key={r.name} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--nl-rojo)" }}></span>
                      <a 
                        href={r.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/20 hover:text-white break-words transition-colors"
                      >
                        {r.name}
                      </a>
                    </li>
                  ))}
                </ul>
                
                {/* Segunda columna */}
                <ul className="space-y-4">
                  {CONFIG.resources.slice(3, 6).map((r) => (
                    <li key={r.name} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--nl-rojo)" }}></span>
                      <a 
                        href={r.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/20 hover:text-white break-words transition-colors"
                      >
                        {r.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== COMMUNITY SECTION ===== */}
      <section
        className="w-full py-16 sm:py-24"
        style={{ backgroundColor: CONFIG.brand.white }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col items-center text-center">

          {/* Title — same size as hero h1 */}
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-8 max-w-2xl"
            style={{ color: CONFIG.brand.black }}
          >
            Seguí aprendiendo en la Comunidad de Emprendedores de Novolabs
          </h2>

          {/* Checkmark bullets */}
          <ul className="flex flex-col items-start gap-4 mb-10">
            {[
              "Accede a más contenido gratuito",
              "Sesiones en vivo semanales",
              "Conecta con emprendedores de 18 países",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg sm:text-xl font-medium" style={{ color: CONFIG.brand.black }}>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#22C55E" }}
                >
                  <svg className="w-5 h-5" style={{ color: CONFIG.brand.white }} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Community image */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg mb-10">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-62mD424J67mVh5ZtkinA93nAKaTsG3.png"
              alt="Plataforma de la Comunidad de Emprendedores de Novolabs con los fundadores"
              className="w-full h-auto"
            />
          </div>

          {/* CTA Button — same pattern as rest of site */}
          <a
            href="https://www.skool.com/novolabs-startup-school/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-white font-extrabold text-base sm:text-lg rounded-full transition-colors shadow-lg"
            style={{ backgroundColor: CONFIG.brand.rojo }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E63218")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = CONFIG.brand.rojo)}
          >
            ACCEDER A LA COMUNIDAD
          </a>

        </div>
      </section>

      {/* ===== TESTIMONIALS STRIP ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 sm:pb-10">
        <div className="text-center py-8 sm:py-12">
          {/* Main heading */}
          <h2 className="text-white font-extrabold mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight px-2">
            300+ Emprendedores de 18 países ya lanzaron con el Método Novo™
          </h2>
          
          {/* Trustpilot rating */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#2D2D2D] rounded-lg px-3 sm:px-4 py-2">
              <span className="text-white font-semibold text-sm sm:text-base">4.8</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                  const rating = 4.8;
                  const isFilled = i < Math.floor(rating);
                  const isPartial = i === Math.floor(rating) && rating % 1 !== 0;
                  const fillPercentage = isPartial ? (rating % 1) * 100 : 0;
                  
                  return (
                    <div key={i} className="relative h-3 w-3 sm:h-4 sm:w-4">
                      {/* Background star (empty) */}
                      <svg className="absolute inset-0 h-full w-full" style={{ color: "#FFFFFF" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {/* Foreground star (filled) */}
                      <div 
                        className="absolute inset-0 overflow-hidden"
                        style={{ 
                          width: isFilled ? '100%' : isPartial ? `${fillPercentage}%` : '0%'
                        }}
                      >
                        <svg className="h-full w-full" style={{ color: "#30AA72" }} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-white/80 font-medium text-xs sm:text-sm">Trustpilot</span>
            </div>
          </div>
          
          {/* Testimonials carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-4 sm:gap-6 w-fit">
              {/* Testimonio 1 - Soledad Martinez */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioSoledad}
                  alt="Testimonio de Soledad Martinez - 5 estrellas - Valio cada centavo"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 2 - Ignacio Ferreira */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioIgnacio}
                  alt="Testimonio de Ignacio Ferreira - 5 estrellas - Respuesta de leads, validación de problema"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 3 - Isabel */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioIsabel}
                  alt="Testimonio de Isabel - 5 estrellas - Excelencia y profesionalismo"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 4 - Lisandro Belmonte */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLisandro}
                  alt="Testimonio de Lisandro Belmonte - 5 estrellas - Mi experiencia en Novo - Muy recomendable"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 5 - Camila Aguado */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioCamila}
                  alt="Testimonio de Camila Aguado - 5 estrellas - Me ayudó de forma práctica y clara"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 6 - Facundo Rosa Breik */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioFacundo}
                  alt="Testimonio de Facundo Rosa Breik - 5 estrellas - Gamechanger - Antes y después"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 7 - Lucas Zoppi */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLucas}
                  alt="Testimonio de Lucas Zoppi - 5 estrellas - Una experiencia única"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 8 - Manuel Fondovila */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioManuel}
                  alt="Testimonio de Manuel Fondovila - 5 estrellas - Novolabs cambió mi perspectiva sobre emprender"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 9 - Pol López */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioPol}
                  alt="Testimonio de Pol López - 5 estrellas - Emprender acompañado hace toda la diferencia"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 10 - Luciano Schillagi */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLuciano}
                  alt="Testimonio de Luciano Schillagi - 5 estrellas - El contenido es de gran valor y te sentís acompañado"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 11 - Adrian Dutra */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioAdrian}
                  alt="Testimonio de Adrian Dutra - 5 estrellas - Una experiencia práctica y transformadora para nuestro proyecto"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 12 - Hernan Suarez */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioHernan}
                  alt="Testimonio de Hernan Suarez - 5 estrellas - Gracias Novo - Nos cambió toda la manera de pensar"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 13 - Tatiana Dominguez */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioTatiana}
                  alt="Testimonio de Tatiana Dominguez - 5 estrellas - Superó mis expectativas con mentores preparados"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Testimonio 14 - Alexy Narvaez */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioAlexy}
                  alt="Testimonio de Alexy Narvaez - 5 estrellas - Aprende lo que no sabías - 100% Recomendado"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Duplicados para animación infinita */}
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioSoledad}
                  alt="Testimonio de Soledad Martinez - 5 estrellas - Valio cada centavo"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioIgnacio}
                  alt="Testimonio de Ignacio Ferreira - 5 estrellas - Respuesta de leads, validación de problema"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioIsabel}
                  alt="Testimonio de Isabel - 5 estrellas - Excelencia y profesionalismo"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLisandro}
                  alt="Testimonio de Lisandro Belmonte - 5 estrellas - Mi experiencia en Novo - Muy recomendable"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioCamila}
                  alt="Testimonio de Camila Aguado - 5 estrellas - Me ayudó de forma práctica y clara"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioFacundo}
                  alt="Testimonio de Facundo Rosa Breik - 5 estrellas - Gamechanger - Antes y después"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLucas}
                  alt="Testimonio de Lucas Zoppi - 5 estrellas - Una experiencia única"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioManuel}
                  alt="Testimonio de Manuel Fondovila - 5 estrellas - Novolabs cambió mi perspectiva sobre emprender"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioPol}
                  alt="Testimonio de Pol López - 5 estrellas - Emprender acompañado hace toda la diferencia"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioLuciano}
                  alt="Testimonio de Luciano Schillagi - 5 estrellas - El contenido es de gran valor y te sentís acompañado"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioAdrian}
                  alt="Testimonio de Adrian Dutra - 5 estrellas - Una experiencia práctica y transformadora para nuestro proyecto"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioHernan}
                  alt="Testimonio de Hernan Suarez - 5 estrellas - Gracias Novo - Nos cambió toda la manera de pensar"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioTatiana}
                  alt="Testimonio de Tatiana Dominguez - 5 estrellas - Superó mis expectativas con mentores preparados"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="flex-shrink-0 w-80 sm:w-80">
                <ImageWithFallback 
                  src={testimonioAlexy}
                  alt="Testimonio de Alexy Narvaez - 5 estrellas - Aprende lo que no sabías - 100% Recomendado"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom message */}
          <div className="mt-6 sm:mt-8">
            <p className="text-white/80 text-sm sm:text-base px-4">
              Desde 2019 acompañando a Emprendedores de Latinoamérica.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMA SECTION CENTRADA ===== */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-6 sm:pb-10">
        <div className="flex flex-col items-center">
          <div id="program" className="w-full flex flex-col items-center px-2 sm:px-0">
            {/* Headline del programa */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-center">
              Lanza tu proyecto y conseguí los primeros clientes en 4 meses
            </h2>
            
            {/* Community Image - Móvil arriba del subtítulo */}
            <div className="mt-6 mb-6 w-full max-w-4xl px-2 sm:hidden">
              <img 
                src={communityImage}
                alt="Comunidad de emprendedores Novolabs"
                className="w-full h-auto rounded-xl shadow-xl border border-white/10"
              />
            </div>
            
            {/* Subtítulo - Móvil debajo de imagen, desktop debajo de título */}
            <p className="text-white/70 max-w-2xl text-center text-base sm:text-lg md:text-xl leading-relaxed mt-3 mb-6 sm:mb-8 px-4 sm:px-0">
              Aplica el Sistema de Validción Paga™ de la mano de Emprendedores que ya transformaron sus ideas en empresas exitosas.
            </p>
            
            {/* Community Image - Desktop después del subtítulo */}
            <div className="mb-8 sm:mb-12 w-full max-w-4xl px-2 hidden sm:block">
              <img 
                src={communityImage}
                alt="Comunidad de emprendedores Novolabs"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl border border-white/10"
              />
            </div>
            
            {/* Card del programa con Tabs */}
            <div className="w-full max-w-lg px-2 sm:px-0">
              <div className="rounded-2xl sm:rounded-3xl bg-[#121212] border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
                {/* Exclusive discount banner */}
                <div className="mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-white/10">
                  <div className="text-center mb-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight" style={{ color: "var(--nl-neon)" }}>
                      El Programa de 4 meses incluye:
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 text-white/80 mb-6 sm:mb-8">
                  {[
                    "Acceso por tiempo ilimitado al contenido del programa.",
                    "Acceso a 16 sesiones grupales en vivo para compartir avances, recibir y dar feedback.",
                    "Acceso a 6 sesiones 1:1 con mentores de Novolabs para avanzar más rápido y evitar errores comunes.",
                    "Acceso a 6 masterclass con emprendedores top.",
                    "Acceso a +120 lecciones en video de 5-10 minutos para que aprendas a tu ritmo.",
                    "Acceso a +20 plantillas para que apliques el conocimiento en tu proyecto.",
                    "Acceso al 'Novo Day' con inversores destacados para que puedas pitchear tu idea.",
                    "Acceso al Club de Fundadores de Novolabs por 1 año.",
                    "Certificación de 'Emprendedor Novo' al finalizar el programa con éxito.",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                      <svg className="mt-0.5 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--nl-neon)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <a
                    href="https://info.novolabs.xyz/widget/form/6ZZqIXf57PufpGPjoMaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden text-sm sm:text-base"
                    style={{ 
                      backgroundColor: "var(--nl-rojo)", 
                      color: "var(--nl-white)",
                      animation: "gentleSway 4s ease-in-out infinite"
                    }}
                  >
                    <span className="relative z-10">Quiero emprender con Novolabs</span>
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                        animation: "shimmer 3s ease-in-out infinite"
                      }}
                    ></div>
                  </a>
                  <a
                    href={CONFIG.bookCallCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 font-semibold border border-white/10 text-white/90 hover:bg-white/5 transition-all text-sm sm:text-base"
                  >
                    Ver detalles
                  </a>
                  <a
                    href={CONFIG.whatsappCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center px-4 sm:px-6 py-3 sm:py-4 font-semibold text-white/90 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    <span className="break-words text-[rgba(96,162,96,0.9)]">Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ===== FAQ ===== */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="text-center">
          <h2 className="text-white font-extrabold mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl px-2">Preguntas frecuentes</h2>
          <div className="space-y-2 sm:space-y-3">
            {CONFIG.faqs.map((f, idx) => (
              <div key={idx} className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#141414]">
                <button
                  className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 text-white/90 font-medium flex items-center justify-between text-sm sm:text-base"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="break-words pr-2">{f.q}</span>
                  <span className="ml-2 sm:ml-4 text-white/60 flex-shrink-0">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 sm:px-5 pb-3 sm:pb-4 text-white/70 text-left text-sm sm:text-base whitespace-pre-line">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Schema (JSON-LD) for SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": CONFIG.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a.replace(/\n\n/g, ' ').replace(/\n/g, ' ')
                }
              }))
            })
          }}
        />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <ImageWithFallback 
                src={novolabsLogo}
                alt="Novolabs"
                className="h-7 sm:h-8 w-auto"
              />
            </div>
            
            {/* Copyright */}
            <div className="text-white/60 text-center text-xs sm:text-sm order-3 md:order-2">
              © {new Date().getFullYear()} Novolabs. Todos los derechos reservados.
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-4 sm:gap-6 order-2 md:order-3">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">Términos</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">Privacidad</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">Soporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
