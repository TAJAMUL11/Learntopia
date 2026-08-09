import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="animate-fade-up text-7xl font-black tracking-tight text-gradient sm:text-8xl md:text-9xl">
        404
      </h1>
      <h2 className="mt-4 animate-fade-up text-2xl font-bold text-ink-hi sm:text-3xl md:text-4xl" style={{ animationDelay: "0.05s" }}>
        {t("notFound.title")}
      </h2>
      <p className="mt-3 max-w-md animate-fade-up text-ink-low" style={{ animationDelay: "0.1s" }}>
        {t("notFound.subtitle")}
      </p>
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <Button size="lg" onClick={() => navigate("/")}>
          <Icon name="arrow" size={18} className="rotate-180" />
          {t("notFound.backHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
