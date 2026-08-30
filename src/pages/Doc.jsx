import { Link } from "react-router-dom";
import Icon from "../Components/ui/Icon";
import { useLanguage } from "../context/LanguageContext";

const Doc = () => {
  const { t, tRaw } = useLanguage();

  const NAV = [
    { id: "overview", label: t("doc.secOverview") },
    { id: "features", label: t("doc.secFeatures") },
    { id: "getting-started", label: t("doc.secGettingStarted") },
    { id: "courses", label: t("doc.cardCourses") },
    { id: "quizzes", label: t("doc.cardQuizzes") },
    { id: "dashboard", label: t("nav.dashboard") },
    { id: "account", label: t("dashboard.accountSettings") },
    { id: "faq", label: t("doc.secFaq") },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = 72; // height of sticky navbar in px
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="inline-block rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">{t("doc.badge")}</span>
          <h1 className="text-4xl font-bold tracking-tight text-ink-hi">{t("doc.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-low leading-relaxed">
            {t("doc.subtitle")}
          </p>
          <p className="mt-2 text-xs text-ink-low/60">{t("doc.lastUpdated")}</p>
        </div>

        <div className="xl:flex xl:gap-12">

          {/* Left sidebar nav for desktop */}
          <aside className="hidden w-56 flex-none xl:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ink-low/50">{t("doc.onThisPage")}</p>
              <nav className="space-y-0.5">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-ink-low transition-colors hover:bg-white/[0.04] hover:text-ink-hi"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile / Tablet wrapped nav pills (2-3 rows, zero scrolling) */}
          <div className="xl:hidden mb-8 rounded-2xl border border-white/10 bg-surface shadow-clay p-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ink-low/50">{t("doc.quickJump")}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-full border border-white/10 bg-surface-2 shadow-clay-sm px-3.5 py-1.5 text-xs font-semibold text-ink-low hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-ink-hi active:scale-95 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <main className="min-w-0 flex-1 space-y-14">

            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.secOverview")}</h2>
              <p className="text-ink-low leading-relaxed">
                {t("doc.secOverviewBody1")}
              </p>
              <p className="mt-4 text-ink-low leading-relaxed">
                {t("doc.secOverviewBody2")}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "book", title: t("doc.cardCourses"), text: t("doc.cardCoursesDesc") },
                  { icon: "clock", title: t("doc.cardQuizzes"), text: t("doc.cardQuizzesDesc") },
                  { icon: "bar-chart", title: t("doc.cardTracking"), text: t("doc.cardTrackingDesc") },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-surface shadow-clay p-5">
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/15 text-violet-400 shadow-clay-sm">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <p className="font-semibold text-ink-hi text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-ink-low leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section id="features">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.featuresHeading")}</h2>
              <div className="space-y-4">
                {(tRaw("doc.features") || []).map((f) => (
                  <div key={f.title} className="flex gap-4 py-4 border-b border-white/[0.05] last:border-0">
                    <div className="mt-0.5 flex-none">
                      <div className="h-2 w-2 rounded-full bg-violet-500 mt-1.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink-hi">{f.title}</p>
                      <p className="mt-1 text-sm text-ink-low leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting started */}
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.gettingStartedHeading")}</h2>
              <ol className="space-y-5">
                {(tRaw("doc.steps") || []).map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="flex-none font-mono text-sm font-bold text-violet-400/70 pt-0.5">{item.step}</span>
                    <div className="border-l border-white/[0.06] pl-5">
                      <p className="font-semibold text-ink-hi">{item.title}</p>
                      <p className="mt-1.5 text-sm text-ink-low leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Courses & Modules */}
            <section id="courses">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.coursesHeading")}</h2>
              <p className="text-ink-low leading-relaxed">{t("doc.coursesIntro")}</p>

              <div className="mt-6 rounded-xl border border-white/10 overflow-hidden bg-surface shadow-clay">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-white/[0.07] bg-surface-2">
                        <th className="px-5 py-3.5 text-left font-semibold text-ink-hi w-2/5 sm:w-1/3">{t("doc.tableColFeature")}</th>
                        <th className="px-5 py-3.5 text-left font-semibold text-ink-hi w-3/5 sm:w-2/3">{t("doc.tableColDesc")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {(tRaw("doc.coursesTable") || []).map((row) => (
                        <tr key={row.concept}>
                          <td className="px-5 py-3.5 font-medium text-ink-hi align-top">{row.concept}</td>
                          <td className="px-5 py-3.5 text-ink-low align-top leading-relaxed">{row.behaviour}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Quizzes */}
            <section id="quizzes">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.quizzesHeading")}</h2>
              <p className="text-ink-low leading-relaxed">
                {t("doc.quizzesIntro")}
              </p>

              <div className="mt-6 space-y-3">
                {(tRaw("doc.quizMeta") || []).map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row gap-1.5 sm:gap-4 rounded-lg border border-white/10 bg-surface-2 shadow-clay-sm px-4 sm:px-5 py-3.5">
                    <span className="sm:w-36 flex-none text-xs font-semibold uppercase tracking-wider text-violet-400 sm:text-ink-low/60 pt-0.5">{item.label}</span>
                    <span className="text-sm text-ink-low leading-relaxed">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.dashboardHeading")}</h2>
              <p className="text-ink-low leading-relaxed">{t("doc.dashboardIntro")}</p>
              <ul className="mt-5 space-y-2.5">
                {(tRaw("doc.dashboardList") || []).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-low">
                    <Icon name="arrow-right" size={14} className="mt-1 flex-none text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Account & Security */}
            <section id="account">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.accountHeading")}</h2>
              <p className="text-ink-low leading-relaxed">
                {t("doc.accountIntro")}
              </p>

              <div className="mt-6 space-y-4">
                {(tRaw("doc.accountCards") || []).map((card, i) => {
                  const styles = [
                    { box: "border-violet-500/20", title: "text-violet-300" },
                    { box: "border-sky/20", title: "text-sky" },
                    { box: "border-violet-500/20", title: "text-violet-300" },
                    { box: "border-sky/20", title: "text-sky" },
                    { box: "border-violet-500/20", title: "text-violet-300" },
                  ];
                  const s = styles[i % styles.length];
                  return (
                    <div key={i} className={`rounded-xl border bg-surface shadow-clay p-5 ${s.box}`}>
                      <p className={`text-sm font-semibold mb-1.5 ${s.title}`}>{card.title}</p>
                      <p className="text-sm text-ink-low leading-relaxed">{card.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-ink-hi border-b border-white/[0.06] pb-3 mb-5">{t("doc.faqHeading")}</h2>
              <dl className="space-y-6">
                {(tRaw("doc.faq") || []).map((item) => (
                  <div key={item.q} className="border-b border-white/[0.05] pb-6 last:border-0 last:pb-0">
                    <dt className="font-semibold text-ink-hi">{item.q}</dt>
                    <dd className="mt-2 text-sm text-ink-low leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Footer note */}
            <div className="rounded-xl border border-white/10 bg-surface shadow-clay p-6">
              <p className="font-semibold text-ink-hi text-sm">{t("doc.footerTitle")}</p>
              <p className="text-xs text-ink-low mt-1">{t("doc.footerPre")} <Link to="/contact" className="text-violet-400 hover:underline">{t("doc.footerContact")}</Link> {t("doc.footerMid")} <Link to="/terms" className="text-violet-400 hover:underline">{t("doc.footerTerms")}</Link> {t("doc.footerAnd")} <Link to="/privacy" className="text-violet-400 hover:underline">{t("doc.footerPrivacy")}</Link>.</p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Doc;
