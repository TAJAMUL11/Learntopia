import { NavLink } from "react-router-dom";
import math from "../assets/CourseImg/math.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/python.png";
import star from "../assets/CourseImg/star.png";
import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

const Courses = () => {
  const coursesList = [
    {
      id: 1,
      category: "IT Software",
      title: "Python: Programming Language for beginners.",
      rating: "4.8",
      image: python,
      students: "3,320",
      avatars: [one, two, three, four]
    },
    {
      id: 2,
      category: "Mathematics",
      title: "Algebra and Calculus: Beginner friendly",
      rating: "4.2",
      image: math,
      students: "2,020",
      avatars: [one, two, three]
    },
    {
      id: 3,
      category: "Finance",
      title: "How to invest early and save your future",
      rating: "4.9",
      image: finance,
      students: "8,320",
      avatars: [one, two, three, four]
    },
    {
      id: 4,
      category: "Marketing",
      title: "Digital Marketing: Complete guide for beginners.",
      rating: "5.0",
      image: Dmarket,
      students: "1,990",
      avatars: [one, two, three]
    },
    {
      id: 5,
      category: "IT Software",
      title: "Frontend development: Advance Topics",
      rating: "4.8",
      image: coding,
      students: "9,120",
      avatars: [one, two, three]
    },
    {
      id: 6,
      category: "Arts",
      title: "Interior Designs: Complete guide for all",
      rating: "4.5",
      image: paint,
      students: "3,320",
      avatars: [one, two, three, four]
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16 text-white">
      {/* Page Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          Invest In Your <br />
          <span className="bg-gradient-to-r from-button-bg-color to-highlighted-btn-bg bg-clip-text text-transparent">
            Education
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
          Unlock your potential by learning from industry-leading instructors and earning verified high scores.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coursesList.map((course) => (
          <div key={course.id} className="courseCard">
            {/* Card Header Info */}
            <div className="courseHeader">
              <div className="type">
                <img src={course.image} alt={course.category} className="courseImg" />
              </div>
              <h4 className="text-sm font-bold text-gray-200 tracking-wider uppercase">{course.category}</h4>
              <div className="rating flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                <img src={star} alt="star" className="w-3.5 h-3.5 object-contain" />
                <span className="text-sm font-extrabold text-highlighted-btn-bg">{course.rating}</span>
              </div>
            </div>

            {/* Course Image Banner & Title */}
            <div className="coursesDetails flex-grow flex flex-col justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-left text-white leading-snug my-4">
                {course.title}
              </h3>
              
              {/* Bottom Metadata */}
              <div>
                <div className="info">
                  <p className="text-sm font-semibold text-gray-300">{course.students} students</p>
                  <div className="studentsImg flex -space-x-2 items-center">
                    {course.avatars.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt="student"
                        className="w-6 h-6 rounded-full border border-primary-bg-color shadow-sm object-cover"
                      />
                    ))}
                  </div>
                </div>

                {/* Enrollment Button */}
                <div className="mt-5">
                  <NavLink to="/signUp" className="block w-full">
                    <button className="w-full bg-button-bg-color hover:bg-button-bg-color/90 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-[0.98]">
                      Enroll Now
                    </button>
                  </NavLink>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
