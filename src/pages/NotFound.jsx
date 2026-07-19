import { useNavigate } from "react-router-dom";
import Button from "../Components/ui/Button";
import Icon from "../Components/ui/Icon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="animate-fade-up text-7xl font-black tracking-tight text-gradient sm:text-8xl md:text-9xl">
        404
      </h1>
      <h2 className="mt-4 animate-fade-up text-2xl font-bold text-ink-hi sm:text-3xl md:text-4xl" style={{ animationDelay: "0.05s" }}>
        Page not found
      </h2>
      <p className="mt-3 max-w-md animate-fade-up text-ink-low" style={{ animationDelay: "0.1s" }}>
        Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Check the address, or head
        back home.
      </p>
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <Button size="lg" onClick={() => navigate("/")}>
          <Icon name="arrow" size={18} className="rotate-180" />
          Back to homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
