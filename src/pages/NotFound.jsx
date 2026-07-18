import { useNavigate } from "react-router-dom";
// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';

const NotFound = () => {
  const goToHome = useNavigate();
  // const h1Ref1 = useRef(null);
  // const h1Ref2 = useRef(null);
  // const h1Ref3 = useRef(null);
  // useEffect(() => {
  //   const tl1 = gsap.timeline({ delay: 0.2 });
  //   tl1.fromTo(h1Ref1.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 });
  //   tl1.to(h1Ref1.current, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 5 });

  //   const tl2 = gsap.timeline({ delay: 0.4 });
  //   tl2.fromTo(h1Ref2.current, { opacity: 0, rotation: -90 }, { opacity: 1, rotation: 0, duration: 0.5 });
  //   tl2.to(h1Ref2.current, { rotation: 20, duration: 0.2, yoyo: true, repeat: 5 });

  //   const tl3 = gsap.timeline({ delay: 0.6 });
  //   tl3.fromTo(h1Ref3.current, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.5 });
  //   tl3.to(h1Ref3.current, { scale: 0.8, duration: 0.2, yoyo: true, repeat: 5 });
  // }, []);
  return (
    <div className="flex items-center justify-center flex-col text-white gap-3 text-center py-2">
      <div className="notFound flex text-9xl">
        <h1>4</h1>
        <h1 className="">0</h1>
        <h1>4</h1>
      </div>

      <h1 className="text-4xl font-bold my-2 tablets:text-6xl md:text-[4.5rem]">
        Page not Found
      </h1>
      <p className="w-full px-1 tablets:w-[85%] md:text-[1.3rem]">
        Sorry for the inconvience, please try again later or check your internet
        connection...
      </p>
      <button
        className="btn-style max-w-72 md:w-[320px] md:p-4 md:text-xl"
        onClick={() => goToHome("/")}
      >
        Go to HomePage
      </button>
    </div>
  );
};

export default NotFound;
