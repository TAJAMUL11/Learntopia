import math from "../assets/CourseImg/math.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/python.png";

import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

export const COURSES = [
  { 
    id: 1, 
    category: "Programming", 
    title: "Python for Kids: Build Your First Game!", 
    rating: "4.9", 
    image: python, 
    students: "1,200", 
    desc: "Learn to code by building real games. Perfect for beginners aged 10-16. No experience needed!", 
    avatars: [one, two, three, four],
    syllabus: [
      { title: "Module 1: Hello Python!", desc: "Learn what Python is and write your very first lines of code." },
      { title: "Module 2: Variables & Math", desc: "Store numbers, text, and make the computer do math for you." },
      { title: "Module 3: Logic & Loops", desc: "Teach the computer how to make decisions and repeat actions." },
      { title: "Module 4: Build a Guessing Game", desc: "Put it all together and build an interactive game to play with friends!" }
    ]
  },
  { 
    id: 2, 
    category: "Mathematics", 
    title: "Math Magic: Puzzles & Logic", 
    rating: "4.8", 
    image: math, 
    students: "950", 
    desc: "Math isn't just numbers—it's magic! Solve fun puzzles, learn cool tricks, and master logic.", 
    avatars: [one, two, three],
    syllabus: [
      { title: "Module 1: The Magic of Numbers", desc: "Discover cool number patterns that look like magic tricks." },
      { title: "Module 2: Geometry in the Wild", desc: "Find shapes in nature, architecture, and video games." },
      { title: "Module 3: Logic Puzzles", desc: "Solve riddles that will bend your brain and make you smarter." },
      { title: "Module 4: Master Problem Solver", desc: "Learn the secret steps to solving ANY math problem easily." }
    ]
  },
  { 
    id: 3, 
    category: "Finance", 
    title: "Money Smart: Kids & Cash", 
    rating: "4.9", 
    image: finance, 
    students: "840", 
    desc: "Learn how money works, how to save your allowance, and what investing really means.", 
    avatars: [one, two, three, four],
    syllabus: [
      { title: "Module 1: What is Money?", desc: "Learn where money comes from and how people use it every day." },
      { title: "Module 2: Saving & Spending", desc: "How to budget your allowance so you can buy the things you really want." },
      { title: "Module 3: What is a Bank?", desc: "Learn how banks keep your money safe and even pay you to keep it there!" },
      { title: "Module 4: The Idea of Investing", desc: "A simple, kid-friendly look at how money can grow over time." }
    ]
  },
  { 
    id: 4, 
    category: "Marketing", 
    title: "Future Creators: Digital Marketing", 
    rating: "4.7", 
    image: Dmarket, 
    students: "620", 
    desc: "Love making videos or designing? Learn how creators safely share their ideas with the world.", 
    avatars: [one, two, three],
    syllabus: [
      { title: "Module 1: What is a Brand?", desc: "Learn why you recognize your favorite toys, games, and snacks instantly." },
      { title: "Module 2: Telling a Story", desc: "How to make a poster or a video that tells a great story." },
      { title: "Module 3: Safe Sharing", desc: "How to safely share ideas online while protecting your privacy." },
      { title: "Module 4: Your First Campaign", desc: "Design a fun campaign for a fake product of your choice!" }
    ]
  },
  { 
    id: 5, 
    category: "Science", 
    title: "Web Wonders: HTML & CSS", 
    rating: "4.9", 
    image: coding, 
    students: "1,400", 
    desc: "Learn the languages of the internet. Build and style your very own custom webpage!", 
    avatars: [one, two, three],
    syllabus: [
      { title: "Module 1: Skeleton of the Web", desc: "Learn HTML and build the bones of your first website." },
      { title: "Module 2: Painting with CSS", desc: "Add colors, fonts, and backgrounds to make your site pop." },
      { title: "Module 3: Adding Images & Links", desc: "Learn how to connect pages together and add cool pictures." },
      { title: "Module 4: Publish Your Page", desc: "Put everything together into a final project you can show off." }
    ]
  },
  { 
    id: 6, 
    category: "Arts", 
    title: "Digital Art: Draw on Your Screen", 
    rating: "4.6", 
    image: paint, 
    students: "1,100", 
    desc: "Turn your computer into a canvas! Learn colors, shapes, and digital drawing tools.", 
    avatars: [one, two, three, four],
    syllabus: [
      { title: "Module 1: The Digital Brush", desc: "Learn how to use digital drawing tools and layers." },
      { title: "Module 2: Color Theory Basics", desc: "Discover which colors look great together and why." },
      { title: "Module 3: Drawing Characters", desc: "Learn simple shapes to create cool, cartoon-style characters." },
      { title: "Module 4: Your Masterpiece", desc: "Create a final digital painting using all the skills you've learned." }
    ]
  },
];
