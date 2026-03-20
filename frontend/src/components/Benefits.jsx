import { useLang } from '../context/LanguageContext';
import t from '../translations';

export const Benefits = () => {
  const { lang } = useLang();
  const stats = t.benefits.stats;

  return (
    <section className="py-24 md:py-32 bg-[#050505] border-t border-b border-white/5" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">{t.benefits.label[lang]}</span>
          <h2 className="font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase mb-4">
            {t.benefits.title1[lang]}<br />
            <span className="font-thin text-neutral-400">{t.benefits.title2[lang]}</span>
          </h2>
          <p className="font-light text-lg text-neutral-500 max-w-2xl mx-auto">{t.benefits.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-8 border-l border-white/10 hover:border-[#FFD700]/50 transition-all duration-500"
              data-testid={`benefit-stat-${index}`}
            >
              <p className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4">{stat.label[lang]}</p>
              <p className="font-black text-5xl md:text-6xl tracking-tight text-white mb-6 group-hover:text-[#FFD700] transition-colors">{stat.value}</p>
              <p className="font-light text-sm text-neutral-500 leading-relaxed">{stat.description[lang]}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-neutral-600">{t.benefits.source[lang]}</p>
        </div>

        {/* Focus areas */}
        <div className="mt-20 md:mt-28 pt-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h3 className="font-black text-3xl md:text-4xl tracking-tight uppercase mb-3">
              {t.benefits.focusTitle[lang]}
            </h3>
            <p className="font-light text-neutral-500 max-w-xl mx-auto">{t.benefits.focusSubtitle[lang]}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.benefits.focus.map((item, index) => (
              <div key={index} className="group bg-[#0a0a0a] border border-white/5 hover:border-[#FFD700]/30 p-8 transition-all duration-500" data-testid={`benefit-focus-${index}`}>
                <span className="font-mono text-[#FFD700] text-4xl font-black opacity-30 block mb-4">{index + 1}</span>
                <h4 className="font-black text-xl tracking-tight uppercase mb-3 group-hover:text-[#FFD700] transition-colors">{item.title[lang]}</h4>
                <p className="font-light text-sm text-neutral-400 leading-relaxed">{item.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
