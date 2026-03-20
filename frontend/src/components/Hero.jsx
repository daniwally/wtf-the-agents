import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const HERO_MEDIA = [
  { type: 'video', src: 'https://customer-assets.emergentagent.com/job_9f3a9b77-23e8-4a65-b4a7-2e2c2ccb6b8d/artifacts/lpskj4pc_freepik_un-video-en-camara-lenta-el-viento-es-suave-y-muev_seedance_720p_16-9_24fps_4548.mp4' },
  { type: 'video', src: 'https://customer-assets.emergentagent.com/job_9f3a9b77-23e8-4a65-b4a7-2e2c2ccb6b8d/artifacts/xcs7yv5r_freepik_un-video-en-camara-lenta-el-viento-es-suave-y-muev_seedance_720p_16-9_24fps_4549.mp4' },
  { type: 'image', src: 'https://customer-assets.emergentagent.com/job_9f3a9b77-23e8-4a65-b4a7-2e2c2ccb6b8d/artifacts/3fvkgzai_u2462154512_THE_AGENTS_by_WTF_hero_campaign_visual._Next-gene_05ee410d-a83f-413d-9a24-4f3ece517a0d_3.png' },
];

export const Hero = ({ onCTAClick }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % HERO_MEDIA.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAgents = () => {
    const element = document.getElementById('agents');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-20 pb-12 overflow-hidden" data-testid="hero-section">
      {/* Background videos carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_MEDIA.map((item, index) => (
          item.type === 'video' ? (
            <video
              key={index}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute top-0 right-0 w-full lg:w-3/5 h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <div
              key={index}
              className={`absolute top-0 right-0 w-full lg:w-3/5 h-full transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${item.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          )
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="mb-8 animate-fade-in-up">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700]">
                {t.hero.poweredBy[lang]}
              </span>
            </div>
            <h1 className="font-thin text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.85] mb-8 animate-fade-in-up delay-100" data-testid="hero-headline">
              {t.hero.headline1[lang]}<br />
              {t.hero.headline2[lang]}<br />
              <span className="font-black text-[#FFD700]">{t.hero.headline3[lang]}</span>
            </h1>
            <div className="max-w-xl mb-12 animate-fade-in-up delay-200" data-testid="hero-subtitle">
              <span className="text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                {t.hero.subtitle[lang]}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button onClick={scrollToAgents} className="btn-primary" data-testid="hero-cta-primary">
                {t.hero.ctaPrimary[lang]}
              </button>
              <button onClick={onCTAClick} className="btn-secondary" data-testid="hero-cta-secondary">
                {t.hero.ctaSecondary[lang]}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToAgents}>
          <ArrowDown className="text-neutral-600 hover:text-[#FFD700] transition-colors" size={24} />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden lg:flex gap-2 z-20">
        {HERO_MEDIA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-2 h-2 transition-all duration-300 ${index === currentVideo ? 'bg-[#FFD700] w-6' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};
