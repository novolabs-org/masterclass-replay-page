# 🚀 Guía de Migración a v0.dev - Página Masterclass Novolabs

## 📋 Índice
1. [Resumen del Proyecto](#resumen)
2. [Archivos Necesarios](#archivos)
3. [Estructura de Next.js](#estructura)
4. [Instrucciones de Migración](#instrucciones)
5. [URLs de Imágenes](#imagenes)
6. [Componentes UI](#componentes)

---

## 📝 Resumen del Proyecto

Página post-login para asistentes de masterclass con:
- **Video embebido** de Streamable (https://streamable.com/i828ri)
- **Diseño oscuro** con paleta de marca (#000000, #FF3A20, #D4FF78, #FFFFFF, #F4F4F4)
- **Carrusel infinito** de testimonios de Trustpilot
- **FAQ acordeón**
- **CTAs** a WhatsApp y formularios de aplicación
- **Responsive** con layouts diferenciados mobile/desktop

---

## 📁 Archivos Necesarios

### 1. Componente Principal (page.tsx)
```tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MasterclassPage() {
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
        black: "#000000",
        background: "#000000",
        rojo: "#FF3A20",
        neon: "#D4FF78",
        white: "#FFFFFF",
        lightGrey: "#F4F4F4",
      },
      resources: [
        { name: "Lean Canvas", href: "https://www.figma.com/board/nBhVQICJnvK7azS837hlPA/Lean-Canvas---Template?node-id=0-1&t=D9uZIz1ICQWbFRsg-1" },
        { name: "Prueba de Deseabilidad", href: "https://www.figma.com/board/n7T4kgzXgSNV2zzOzkKUlY/Fuerzas-del-cliente---Template?node-id=0-1&t=lZcS9mQXxSpz2rjC-1" },
        { name: "Valida tu idea con IA en 7 días 🚀", href: "https://oferta.novolabs.xyz/" },
      ],
      whatsappCta: "https://wa.me/5491163544698?text=Buenas!%20Te%20quisiera%20hacer%20una%20consulta%20antes%20de%20inscribirme%20al%20programa.",
      bookCallCta: "https://www.novolabs.xyz/programa-lanzar-tu-startup-en-4-meses-paso-a-paso",
      applyCta: "https://www.novolabs.xyz/entrevista-agendada-masterclass",
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

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Testimonios para el carrusel
  const testimonios = [
    { id: 1, name: "Soledad Martinez", alt: "Testimonio 5 estrellas - Valio cada centavo" },
    { id: 2, name: "Ignacio Ferreira", alt: "Testimonio 5 estrellas - Respuesta de leads" },
    { id: 3, name: "Isabel", alt: "Testimonio 5 estrellas - Excelencia y profesionalismo" },
    { id: 4, name: "Lisandro Belmonte", alt: "Testimonio 5 estrellas - Muy recomendable" },
    { id: 5, name: "Camila Aguado", alt: "Testimonio 5 estrellas - Práctica y clara" },
    { id: 6, name: "Facundo Rosa Breik", alt: "Testimonio 5 estrellas - Gamechanger" },
    { id: 7, name: "Lucas Zoppi", alt: "Testimonio 5 estrellas - Experiencia única" },
    { id: 8, name: "Manuel Fondovila", alt: "Testimonio 5 estrellas - Cambió mi perspectiva" },
    { id: 9, name: "Pol López", alt: "Testimonio 5 estrellas - Emprender acompañado" },
    { id: 10, name: "Luciano Schillagi", alt: "Testimonio 5 estrellas - Gran valor" },
    { id: 11, name: "Adrian Dutra", alt: "Testimonio 5 estrellas - Experiencia transformadora" },
    { id: 12, name: "Hernan Suarez", alt: "Testimonio 5 estrellas - Nos cambió todo" },
    { id: 13, name: "Tatiana Dominguez", alt: "Testimonio 5 estrellas - Superó expectativas" },
    { id: 14, name: "Alexy Narvaez", alt: "Testimonio 5 estrellas - 100% Recomendado" },
  ];

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
            <Image 
              src="/novolabs-logo.png"
              alt="Novolabs"
              width={160}
              height={40}
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
            <iframe
              src="https://streamable.com/e/i828ri"
              title="Masterclass Replay"
              frameBorder="0"
              allowFullScreen
              className="w-full aspect-video bg-black"
            />
          </div>

          {/* Recursos de regalo */}
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

              {/* Desktop: 2 columnas */}
              <div className="hidden sm:grid grid-cols-2 gap-6 text-white/80 text-base">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS STRIP ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 sm:pb-10">
        <div className="text-center py-8 sm:py-12">
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
                      <svg className="absolute inset-0 h-full w-full" style={{ color: "#FFFFFF" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
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
              {/* Duplicamos para animación infinita */}
              {[...testimonios, ...testimonios].map((testimonio, idx) => (
                <div key={idx} className="flex-shrink-0 w-80 sm:w-80">
                  <Image 
                    src={`/testimonios/testimonio-${testimonio.id}.png`}
                    alt={testimonio.alt}
                    width={320}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <p className="text-white/80 text-sm sm:text-base px-4">
              Desde 2019 acompañando a Emprendedores de Latinoamérica.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMA SECTION ===== */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-6 sm:pb-10">
        <div className="flex flex-col items-center">
          <div id="program" className="w-full flex flex-col items-center px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-center">
              Lanza tu proyecto y conseguí los primeros clientes en 4 meses
            </h2>
            
            {/* Community Image - Móvil */}
            <div className="mt-6 mb-6 w-full max-w-4xl px-2 sm:hidden">
              <Image 
                src="/community-image.png"
                alt="Comunidad de emprendedores Novolabs"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl shadow-xl border border-white/10"
              />
            </div>
            
            {/* Subtítulo */}
            <p className="text-white/70 max-w-2xl text-center text-base sm:text-lg md:text-xl leading-relaxed mt-3 mb-6 sm:mb-8 px-4 sm:px-0">
              Aplica el Sistema de Validción Paga™ de la mano de Emprendedores que ya transformaron sus ideas en empresas exitosas.
            </p>
            
            {/* Community Image - Desktop */}
            <div className="mb-8 sm:mb-12 w-full max-w-4xl px-2 hidden sm:block">
              <Image 
                src="/community-image.png"
                alt="Comunidad de emprendedores Novolabs"
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl border border-white/10"
              />
            </div>
            
            {/* Card del programa */}
            <div className="w-full max-w-lg px-2 sm:px-0">
              <div className="rounded-2xl sm:rounded-3xl bg-[#121212] border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
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
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center">
              <Image 
                src="/novolabs-logo.png"
                alt="Novolabs"
                width={120}
                height={30}
                className="h-7 sm:h-8 w-auto"
              />
            </div>
            
            <div className="text-white/60 text-center text-xs sm:text-sm order-3 md:order-2">
              © {new Date().getFullYear()} Novolabs. Todos los derechos reservados.
            </div>
            
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
```

---

## 🖼️ URLs de Imágenes a Subir

Necesitas subir las siguientes imágenes a tu proyecto Next.js en la carpeta `public/`:

### Logo
- `/novolabs-logo.png` - Logo de Novolabs (navbar y footer)

### Imagen de comunidad
- `/community-image.png` - Foto de la comunidad de emprendedores

### Testimonios (14 imágenes)
Coloca estas imágenes en `/public/testimonios/`:
1. `/testimonios/testimonio-1.png` - Soledad Martinez
2. `/testimonios/testimonio-2.png` - Ignacio Ferreira
3. `/testimonios/testimonio-3.png` - Isabel
4. `/testimonios/testimonio-4.png` - Lisandro Belmonte
5. `/testimonios/testimonio-5.png` - Camila Aguado
6. `/testimonios/testimonio-6.png` - Facundo Rosa Breik
7. `/testimonios/testimonio-7.png` - Lucas Zoppi
8. `/testimonios/testimonio-8.png` - Manuel Fondovila
9. `/testimonios/testimonio-9.png` - Pol López
10. `/testimonios/testimonio-10.png` - Luciano Schillagi
11. `/testimonios/testimonio-11.png` - Adrian Dutra
12. `/testimonios/testimonio-12.png` - Hernan Suarez
13. `/testimonios/testimonio-13.png` - Tatiana Dominguez
14. `/testimonios/testimonio-14.png` - Alexy Narvaez

---

## 🏗️ Estructura de Next.js

```
tu-proyecto/
├── app/
│   ├── masterclass/
│   │   └── page.tsx          # Componente principal (código arriba)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/
│       └── tabs.tsx           # Componente de tabs (ver abajo)
├── public/
│   ├── novolabs-logo.png
│   ├── community-image.png
│   └── testimonios/
│       ├── testimonio-1.png
│       ├── testimonio-2.png
│       └── ... (14 imágenes total)
└── package.json
```

---

## 📦 Componentes UI Necesarios

### 1. components/ui/tabs.tsx

```tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

### 2. lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 📋 Instrucciones Paso a Paso

### Opción A: Importar directamente a v0.dev

1. **Ve a v0.dev** (https://v0.dev)
2. **Crea un nuevo proyecto** o abre uno existente
3. **Copia el código del componente principal** (page.tsx de arriba)
4. **Pégalo en v0** en el modo de edición de código
5. **Sube las imágenes** a través de la interfaz de v0
6. **V0 detectará automáticamente** los componentes UI necesarios y los instalará

### Opción B: Proyecto Next.js completo

1. **Crea un nuevo proyecto Next.js:**
```bash
npx create-next-app@latest mi-masterclass --typescript --tailwind --app
cd mi-masterclass
```

2. **Instala dependencias:**
```bash
npm install @radix-ui/react-tabs clsx tailwind-merge class-variance-authority
```

3. **Copia los archivos:**
   - Copia `page.tsx` a `app/masterclass/page.tsx`
   - Copia `tabs.tsx` a `components/ui/tabs.tsx`
   - Copia `utils.ts` a `lib/utils.ts`

4. **Sube las imágenes** a la carpeta `public/` según la estructura indicada

5. **Ejecuta el proyecto:**
```bash
npm run dev
```

6. **Visita:** http://localhost:3000/masterclass

---

## 🎨 Paleta de Colores

```css
--nl-black: #000000      /* Fondo principal */
--nl-rojo: #FF3A20       /* CTAs principales */
--nl-neon: #D4FF78       /* Acentos / precios destacados */
--nl-white: #FFFFFF      /* Texto principal */
--nl-lightGrey: #F4F4F4  /* Texto secundario */
```

---

## ⚙️ Configuración de Tailwind (tailwind.config.ts)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 🚀 Características Clave

✅ **Video embebido** de Streamable con aspect ratio responsive  
✅ **Carrusel infinito** de testimonios con animación CSS  
✅ **Rating de Trustpilot** con estrellas parciales calculadas  
✅ **FAQ acordeón** sin dependencias externas  
✅ **Layout responsive** diferenciado móvil/desktop  
✅ **CTAs** con animaciones suaves (sway + shimmer)  
✅ **Countdown timer** hasta el próximo martes 23:59:59  
✅ **SEO optimizado** con alt tags y estructura semántica  

---

## 📝 Notas Importantes

1. **Fuentes**: La fuente "Satoshi" debe estar cargada. Si no la tienes, v0 puede usar la fuente del sistema como fallback.

2. **Imágenes**: V0 puede ayudarte a optimizar las imágenes automáticamente con Next.js Image.

3. **Componentes Radix**: V0 ya tiene integrados componentes de Radix UI, por lo que detectará automáticamente las dependencias.

4. **TypeScript**: El código está tipado para TypeScript, pero funciona igual en JavaScript.

---

## 🎯 Prompt para V0.dev

Si quieres que v0 genere esto desde cero, usa este prompt:

```
Crea una landing page post-login para masterclass con Next.js App Router que incluya:

DISEÑO:
- Fondo negro puro (#000000)
- Paleta: #FF3A20 (rojo CTA), #D4FF78 (verde neón), #FFFFFF (blanco)
- Tipografía sans-serif bold

SECCIONES:
1. Navbar sticky con logo Novolabs
2. Hero con:
   - Título "Grabación de la Masterclass"
   - Video embebido de Streamable (https://streamable.com/e/i828ri)
   - Lista de 3 recursos descargables en 2 columnas en desktop
3. Testimonios:
   - Título "300+ Emprendedores de 18 países ya lanzaron con el Método Novo™"
   - Badge de Trustpilot con 4.8 estrellas (relleno parcial)
   - Carrusel infinito horizontal con 14 imágenes de testimonios
4. Programa:
   - Título "Lanza tu proyecto y conseguí los primeros clientes en 4 meses"
   - Imagen de comunidad
   - Card con 9 beneficios listados con checkmarks verdes
   - 3 CTAs: "Quiero emprender con Novolabs" (rojo, animado), "Ver detalles" (outline), "Consultar por WhatsApp" (texto verde)
5. FAQ acordeón con 4 preguntas
6. Footer con logo, copyright y links

FUNCIONALIDADES:
- Responsive mobile/desktop
- Animación de carrusel infinito
- FAQ expandible con estado local
- CTAs con target="_blank" y rel="noopener noreferrer"
- Next.js Image optimization

URLs:
- WhatsApp: https://wa.me/5491163544698
- Formulario: https://info.novolabs.xyz/widget/form/6ZZqIXf57PufpGPjoMaa
- Detalles: https://www.novolabs.xyz/programa-lanzar-tu-startup-en-4-meses-paso-a-paso
```

---

## ✅ Checklist Final

Antes de exportar a v0, asegúrate de tener:

- [ ] Código del componente principal (page.tsx)
- [ ] Componente de tabs si lo usas
- [ ] Logo de Novolabs (PNG transparente)
- [ ] Imagen de comunidad
- [ ] 14 imágenes de testimonios numeradas
- [ ] URLs de CTAs actualizadas
- [ ] Paleta de colores configurada

---

**¡Listo para v0! 🚀**

Esta guía incluye todo lo necesario para migrar tu página a v0.dev o crear un proyecto Next.js standalone.
