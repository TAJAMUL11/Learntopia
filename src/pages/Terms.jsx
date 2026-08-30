import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Terms = () => {
  const { t, tRaw } = useLanguage();
  const SECTIONS = tRaw("terms.sections") || [];

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="inline-block rounded-md border border-white/10 bg-surface-2 shadow-clay-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-ink-low mb-3">{t("terms.badge")}</span>
          <h1 className="text-3xl font-bold tracking-tight text-ink-hi">{t("terms.title")}</h1>
          <p className="mt-2 text-sm text-ink-low/60">{t("terms.lastUpdated")}</p>
          <p className="mt-4 text-sm text-ink-low leading-relaxed border-l-2 border-violet-500/40 pl-4">
            {t("terms.subtitle")}
          </p>
        </div>


      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
            <h2 className="text-lg font-bold text-ink-hi mb-3 pb-2 border-b border-white/[0.06]">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-low mb-3 last:mb-0">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2">
                {s.list.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-low">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-violet-500/60" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Contact footer */}
      <div className="mt-12 rounded-xl border border-white/10 bg-surface shadow-clay p-6">
        <p className="font-semibold text-ink-hi text-sm">{t("terms.footerTitle")}</p>
        <p className="mt-1.5 text-sm text-ink-low">
          {t("terms.footerPre")}{" "}
          <a href="mailto:tajamul.270@gmail.com" className="text-violet-400 hover:underline underline-offset-2">
            {t("terms.footerEmail")}
          </a>
          {" "}{t("terms.footerMid")}{" "}
          <Link to="/privacy" className="text-violet-400 hover:underline underline-offset-2">{t("terms.footerPrivacy")}</Link>.
        </p>
      </div>

      </div>
    </div>
  );
};

export default Terms;
