/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Sparkles,
  Lightbulb,
  MousePointer2,
  Zap,
  Pencil,
  PenTool,
  ZoomIn,
  Clock,
} from "lucide-react";
import { CustomCursor } from "./components/CustomCursor";
import { Lightbox } from "./components/Lightbox";
import { getProjectImages, getSingleImage } from "./services/imageService";
import { projects as projectConfigs } from "./data/projects.config";

interface Project {
  id: string;
  title: { vi: string; en: string };
  category: "uiux" | "other";
  tag: string;
  chip?: { vi: string; en: string };
  duration: { vi: string; en: string };
  description: { vi: string; en: string };
  shortDescription?: { vi: string; en: string };
  image: string;
  homeThumbnail: string;
  problem: { vi: string; en: string };
  research: { vi: string; en: string };
  solution: { vi: string; en: string };
  folder?: string;
  frameCount?: number;
}

const PROJECTS: Project[] = [
  {
    id: "uiux-1",
    title: { vi: "Zoner - Measure area app", en: "Zoner - Measure area app" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Tiện ích", en: "Utility" },
    duration: { vi: "10 tuần", en: "10 weeks" },
    description: {
      vi: "Ứng dụng di động giúp người dùng đo đạc và quản lý diện tích đất hoặc mặt bằng trực tiếp trên điện thoại, kết hợp bản đồ tương tác với hệ thống quản lý dự án có cấu trúc.",
      en: "Mobile app helping users measure and manage land or surface area directly on their phones, combining interactive maps with a structured project management system.",
    },
    shortDescription: {
      vi: "Ứng dụng đo và quản lý diện tích trên map",
      en: "Area measurement and management app on map",
    },
    image: `./image/UIUX_Project/Zoner/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/Zoner/Thumbnail-1.webp`,
    problem: {
      vi: "Người dùng gặp khó khăn trong việc đo đạc diện tích đất đai một cách chính xác và nhanh chóng trên thiết bị di động.",
      en: "Users struggle to measure land area accurately and quickly on mobile devices.",
    },
    research: {
      vi: "Nghiên cứu về các thuật toán GPS và trải nghiệm người dùng trong lĩnh vực đo đạc địa chính.",
      en: "Research on GPS algorithms and user experience in the field of cadastral measurement.",
    },
    solution: {
      vi: "Giao diện bản đồ trực quan, hỗ trợ vẽ ranh giới bằng tay hoặc GPS, tính toán diện tích thời gian thực.",
      en: "Intuitive map interface, supporting manual or GPS boundary drawing, real-time area calculation.",
    },
    folder: "Zoner",
  },
  {
    id: "uiux-2",
    title: { vi: "Meyu - Food dating app", en: "Meyu - Food dating app" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Case study", en: "Case study" },
    duration: { vi: "8 tuần", en: "8 weeks" },
    description: {
      vi: "Ứng dụng “foodating” giúp kết nối mọi người thông qua những buổi ăn uống. Người dùng có thể lên lịch hẹn ăn, chọn món, chọn địa điểm và khám phá những người có cùng gu ẩm thực.",
      en: 'A "foodating" app that connects people through dining experiences. Users can schedule dining dates, choose dishes, select locations, and discover people with similar culinary tastes.',
    },
    shortDescription: {
      vi: "Ứng dụng quản lý tài chính cá nhân thông minh",
      en: "Smart personal finance management app",
    },
    image: `./image/UIUX_Project/Meyu/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/Meyu/Thumbnail-1.webp`,
    problem: {
      vi: "Việc theo dõi chi tiêu hàng ngày thường gây nhàm chán và khó duy trì thói quen.",
      en: "Tracking daily spending is often boring and hard to maintain as a habit.",
    },
    research: {
      vi: "Khảo sát thói quen chi tiêu của người trẻ và các yếu tố tâm lý ảnh hưởng đến việc tiết kiệm.",
      en: "Surveyed spending habits of young people and psychological factors influencing saving.",
    },
    solution: {
      vi: "Thiết kế giao diện tươi sáng, tích hợp biểu đồ trực quan và hệ thống nhắc nhở thông minh.",
      en: "Designed a bright interface, integrated visual charts, and a smart reminder system.",
    },
    folder: "Meyu",
  },
  {
    id: "other-1",
    title: { vi: "MLegend - Đèn tăng sáng", en: "MLegend - Lighting Upgrade" },
    category: "other",
    tag: "Graphic Design",
    chip: { vi: "Social post", en: "Social post" },
    duration: { vi: "6 tuần", en: "6 weeks" },
    description: {
      vi: "Dự án thiết kế các social posts nhằm nâng cao mức độ nhận cho thương hiệu MLegend miền Bắc, từ đó thu hút nhóm khách hàng mục tiêu là những người đam mê nâng cấp đèn xe ô tô.",
      en: "Social media post design project aimed at increasing brand awareness for MLegend in the North, thereby attracting the target audience of car lighting upgrade enthusiasts.",
    },
    shortDescription: {
      vi: "Thiết kế nhận diện thương hiệu & bao bì",
      en: "Brand identity & packaging design",
    },
    image: `./image/Other_Project/MLegend/Thumbnail-2.webp`,
    homeThumbnail: `./image/Other_Project/MLegend/Thumbnail-1.webp`,
    problem: {
      vi: "Thương hiệu cần một hình ảnh chuyên nghiệp, hiện đại để tiếp cận phân khúc khách hàng cao cấp.",
      en: "The brand needs a professional, modern image to reach the premium customer segment.",
    },
    research: {
      vi: "Nghiên cứu về xu hướng thiết kế tối giản và các vật liệu chiếu sáng hiện đại.",
      en: "Research on minimalist design trends and modern lighting materials.",
    },
    solution: {
      vi: "Sử dụng phong cách thiết kế tối giản, tập trung vào sự tinh tế của ánh sáng và chất liệu.",
      en: "Used a minimalist design style, focusing on the sophistication of light and materials.",
    },
    folder: "MLegend",
  },
  {
    id: "mrsgrand",
    title: { vi: "Mrs. Earth Vietnam", en: "Mrs. Earth Vietnam" },
    category: "other",
    tag: "Graphic Design",
    chip: { vi: "Social post", en: "Social post" },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Dự án này thực hiện việc thiết kế các bài đăng trên mạng xã hội nhằm hỗ trợ chương trình MRS. EARTH VIETNAM thu hút một lượng lớn người theo dõi và ủng hộ cho cuộc thi sắc đẹp này.",
      en: "This project involves designing social media posts to support the MRS. EARTH VIETNAM program in attracting a large number of followers and supporters for this beauty pageant.",
    },
    shortDescription: {
      vi: "Thiết kế hình ảnh sự kiện & cuộc thi",
      en: "Event & pageant visual design",
    },
    image: `./image/Other_Project/MrsGrand/Thumbnail-2.webp`,
    homeThumbnail: `./image/Other_Project/MrsGrand/Thumbnail-1.webp`,
    problem: {
      vi: "Cần xây dựng hình ảnh chuyên nghiệp và sang trọng cho cuộc thi.",
      en: "Need to build a professional and luxurious image for the pageant.",
    },
    research: {
      vi: "Nghiên cứu về phong cách thiết kế cho các sự kiện hoa hậu và quý bà.",
      en: "Research on design styles for beauty pageants and pageants for married women.",
    },
    solution: {
      vi: "Sử dụng các tông màu sang trọng, bố cục tinh tế để tôn vinh vẻ đẹp của các thí sinh.",
      en: "Used luxurious color tones and sophisticated layouts to honor the beauty of contestants.",
    },
    folder: "MrsGrand",
  },
  {
    id: "lang-gio",
    title: { vi: "Làng Gió - Pixel Farm", en: "Lang Gio - Pixel Farm" },
    category: "other",
    tag: "Screenshots",
    chip: { vi: "Đang cập nhật...", en: "Updating..." },
    duration: { vi: "Đang cập nhật...", en: "Updating..." },
    description: { vi: "Dự án Làng Gió.", en: "Lang Gio project." },
    shortDescription: { vi: "Dự án Làng Gió", en: "Lang Gio project" },
    image: `./image/Other_Project/lang-gio/Thumbnail-2.jpg`,
    homeThumbnail: `./image/Other_Project/lang-gio/Thumbnail-1.webp`,
    problem: { vi: "Đang cập nhật...", en: "Updating..." },
    research: { vi: "Đang cập nhật...", en: "Updating..." },
    solution: { vi: "Đang cập nhật...", en: "Updating..." },
    folder: "lang-gio",
  },
  {
    id: "pushup-counter",
    title: { vi: "Pushup Counter", en: "Pushup Counter" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Sức khỏe", en: "Health" },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Ứng dụng fitness sử dụng AI để theo dõi chuyển động và tự động đếm số lần chống đẩy theo thời gian thực, giúp bạn tập luyện hoàn toàn rảnh tay, không cần thao tác nhiều với thiết bị trong quá trình tập luyện.",
      en: "Fitness app using AI to track movement and automatically count pushups in real-time, allowing for completely hands-free workouts without needing to interact with the device during exercise.",
    },
    shortDescription: {
      vi: "Ứng dụng đếm hít đất tự động",
      en: "Automatic pushup counting app",
    },
    image: `./image/UIUX_Project/pushup-counter/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/pushup-counter/Thumbnail-1.webp`,
    problem: {
      vi: "Người dùng khó tự đếm số lần hít đất chính xác khi tập luyện.",
      en: "Users find it difficult to count pushups accurately while exercising.",
    },
    research: {
      vi: "Nghiên cứu công nghệ nhận diện chuyển động qua camera điện thoại.",
      en: "Research on motion recognition technology via phone camera.",
    },
    solution: {
      vi: "Sử dụng AI để nhận diện tư thế và đếm số lần hít đất tự động.",
      en: "Use AI to recognize posture and count pushups automatically.",
    },
    folder: "pushup-counter",
  },
  {
    id: "stitch-photos",
    title: { vi: "Stitch Photos", en: "Stitch Photos" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Photo & Video", en: "Photo & Video" },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Stitch Photos v2.0 là bản nâng cấp toàn diện của bản V1.0, với giao diện Liquid Glass hoàn toàn mới và tính năng đột phá: tạo ảnh ghép trực tiếp từ video",
      en: "Stitch Photos v2.0 is a comprehensive upgrade of V1.0, featuring an all-new Liquid Glass interface and a breakthrough feature: creating photo stitches directly from videos.",
    },
    shortDescription: {
      vi: "Ứng dụng ghép ảnh dài",
      en: "Long photo stitching app",
    },
    image: `./image/UIUX_Project/stitch-photos/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/stitch-photos/Thumbnail-1.webp`,
    problem: {
      vi: "Người dùng muốn ghép nhiều ảnh màn hình thành một ảnh dài nhưng các công cụ hiện tại phức tạp.",
      en: "Users want to stitch multiple screenshots into a long photo but current tools are complex.",
    },
    research: {
      vi: "Nghiên cứu thuật toán nhận diện điểm chung giữa các ảnh.",
      en: "Research on algorithms to identify common points between photos.",
    },
    solution: {
      vi: "Tự động tìm điểm chung và ghép nối mượt mà các ảnh màn hình.",
      en: "Automatically find common points and smoothly stitch screenshots.",
    },
    folder: "stitch-photos",
  },
  {
    id: "businesscard-maker",
    title: { vi: "Business Card Maker", en: "Business Card Maker" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Đang cập nhật...", en: "Updating..." },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Ứng dụng tạo danh thiếp.",
      en: "Business card maker app.",
    },
    shortDescription: {
      vi: "Ứng dụng tạo danh thiếp",
      en: "Business card maker app",
    },
    image: `./image/UIUX_Project/businesscard-maker/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/businesscard-maker/Thumbnail-2.webp`,
    problem: {
      vi: "Người dùng cần một công cụ nhanh chóng để tạo danh thiếp chuyên nghiệp.",
      en: "Users need a quick tool to create professional business cards.",
    },
    research: {
      vi: "Nghiên cứu các mẫu danh thiếp phổ biến và quy trình thiết kế.",
      en: "Research popular business card templates and design processes.",
    },
    solution: {
      vi: "Cung cấp các mẫu có sẵn và công cụ chỉnh sửa trực quan.",
      en: "Provide pre-made templates and intuitive editing tools.",
    },
    folder: "businesscard-maker",
  },
  {
    id: "try-on-hairstyle",
    title: { vi: "Try On Hairstyle", en: "Try On Hairstyle" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Đang cập nhật...", en: "Updating..." },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Ứng dụng thử nghiệm kiểu tóc.",
      en: "Hairstyle try-on app.",
    },
    shortDescription: {
      vi: "Ứng dụng thử kiểu tóc",
      en: "Hairstyle try-on app",
    },
    image: `./image/UIUX_Project/try-on-hairstyle/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/try-on-hairstyle/Thumbnail-2.webp`,
    problem: {
      vi: "Người dùng khó hình dung kiểu tóc mới sẽ trông như thế nào trên khuôn mặt họ.",
      en: "Users find it hard to imagine how a new hairstyle will look on their face.",
    },
    research: {
      vi: "Nghiên cứu công nghệ AR và nhận diện khuôn mặt.",
      en: "Research AR technology and facial recognition.",
    },
    solution: {
      vi: "Sử dụng AI/AR để ướm thử các kiểu tóc khác nhau lên khuôn mặt người dùng theo thời gian thực.",
      en: "Use AI/AR to try different hairstyles on the user's face in real-time.",
    },
    folder: "try-on-hairstyle",
  },
  {
    id: "wardrobe",
    title: { vi: "Smart Wardrobe", en: "Smart Wardrobe" },
    category: "uiux",
    tag: "Mobile App",
    chip: { vi: "Đang cập nhật...", en: "Updating..." },
    duration: { vi: "4 tuần", en: "4 weeks" },
    description: {
      vi: "Ứng dụng quản lý tủ quần áo.",
      en: "Wardrobe management app.",
    },
    shortDescription: {
      vi: "Ứng dụng quản lý tủ đồ",
      en: "Wardrobe management app",
    },
    image: `./image/UIUX_Project/wardrobe/Thumbnail-2.webp`,
    homeThumbnail: `./image/UIUX_Project/wardrobe/Thumbnail-2.webp`,
    problem: {
      vi: "Người dùng có quá nhiều quần áo nhưng luôn cảm thấy không có gì để mặc.",
      en: "Users have too many clothes but always feel like they have nothing to wear.",
    },
    research: {
      vi: "Nghiên cứu thói quen sắp xếp đồ đạc và phối đồ hàng ngày.",
      en: "Research daily organizing and outfit matching habits.",
    },
    solution: {
      vi: "Số hóa tủ đồ, gợi ý phối đồ bằng AI và theo dõi tần suất sử dụng trang phục.",
      en: "Digitize the wardrobe, suggest outfits using AI, and track clothing usage frequency.",
    },
    folder: "wardrobe",
  },
];

const TRANSLATIONS = {
  vi: {
    nav: {
      work: "Dự án",
      about: "Về tôi",
      whatIHave: "Những gì tôi có",
      contact: "Liên hệ",
      resume: "Resume",
    },
    hero: {
      label: "Ui/UX Designer",
      intro: "Hello, tôi là Nhật Nam!",
      title: ["WELCOME TO", "MY SPACE"],
      tagline:
        "Tôi research trước, thiết kế sau — vì đẹp mà không dùng được thì chưa đủ.",
      sub: "Tôi tin rằng vấn đề khó đến đâu đều có cách giải quyết",
      cta: "Xem dự án →",
      status: "🟢 Đang tìm kiếm cơ hội mới",
      scroll: "CUỘN XUỐNG",
    },
    work: {
      title: "Dự án",
      accent: "của tôi",
      sub: "Những dự án tôi đã thực hiện đều ở đây",
      all: "Tất cả",
      uiux: "UI/UX Design",
      other: "Other Works",
      clickToView: "Bấm để xem",
      detail: "Xem chi tiết",
      select: "Chọn một thẻ để xem dự án",
    },
    about: {
      title: "Về",
      accent: "tôi",
      sub: "Người luôn tìm kiếm giải pháp tối ưu",
      content:
        "Xin chào! Tôi là Nhật Nam.\n\nTôi là UI/UX Designer, với xuất phát điểm từ Branding & Graphic Design. Đam mê sáng tạo thôi thúc tôi bắt đầu xây dựng nền tảng Graphic Design từ lúc học đại học, mặc dù chuyên ngành tôi theo học là Quản trị Kinh doanh Quốc tế tại UEB, ĐHQG Hà Nội.\n\nSự kết hợp có vẻ lạ, nhưng lại là nền tảng định hình cách tôi nhìn mọi thứ đến hiện tại.\n\nTôi dần nhận ra mình không chỉ muốn tạo ra sản phẩm đẹp, có tính ứng dụng mà còn là tạo ra giải pháp cho những vấn đề thiết thực hàng ngày. Tư duy kinh tế và nền tảng thiết kế đã đưa tôi đến với UI/UX - nơi tôi tổng hòa mọi thứ.",
      caption: "Để hiện thực những ý tưởng",
    },
    whatIHave: {
      title: "Tôi",
      accent: "có gì?",
      sub: "Dành cho bạn nếu chưa xem qua CV của tôi",
      experience: {
        title: "Kinh Nghiệm",
        items: [
          {
            role: "UI/UX Designer",
            company: "TAPUNIVERSE",
            period: "04/2025 - HIỆN TẠI",
          },
          {
            role: "Graphic Designer & UI/UX Designer",
            company: "FREELANCE",
            period: "02/2024 - 03/2025",
          },
          {
            role: "Graphic Designer",
            company: "TRANGNAMAUTO & MLEGEND",
            period: "05/2022 - 01/2023",
          },
          {
            role: "Design Intern",
            company: "TRUONGTHANH FURNITURE",
            period: "12/2021 - 02/2022",
          },
        ],
      },
      education: {
        title: "Học Vấn",
        items: [
          {
            school:
              "Troy University - Trường Đại học Kinh tế, Đại học Quốc gia Hà Nội",
            major: "QUẢN TRỊ KINH DOANH QUỐC TẾ",
            period: "2020 - 2024",
          },
          {
            school: "ColorMe - Trung Tâm Đào Tạo Thiết Kế Đồ Hoạ",
            major: "2D GRAPHIC DESIGN - UI/UX DESIGN",
            period: "2021 - 2022",
          },
        ],
      },
      skills: {
        title: "Kỹ Năng",
        list: [
          "UI Design",
          "UX Design",
          "Interaction Design",
          "Market Research",
          "User Research",
          "Define Problems",
          "Ideate Solutions",
          "User Flow",
          "Information Architecture",
          "Wireframing",
          "Design System",
          "Visual Design",
          "Prototyping",
          "Testing",
          "Basic HTML",
          "Basic CSS",
        ],
      },
      tools: {
        title: "Công Cụ",
        list: [
          "Figma",
          "Adobe Illustrator",
          "Adobe Photoshop",
          "Adobe InDesign",
          "Procreate",
          "Capcut",
          "Affinity",
          "Notion",
        ],
      },
    },
    contact: {
      title: 'Không "bắt" được tôi ở kia?',
      accent: 'Thì "bắt" tôi ở đây',
      sub: "Hãy cùng nhau tạo nên điều gì đó tuyệt vời",
      note: "Hãy đập đúng nhân vật của tôi để mở thông tin liên hệ nhé!",
      email: "bnnamdesign@gmail.com",
      phone: "+84 852 208 088",
      socials: [
        {
          name: "Instagram",
          icon: "📸",
          handle: "bnnambrandingdesign",
          link: "https://www.instagram.com/bnnambrandingdesign/",
        },
        {
          name: "Behance",
          icon: "🎨",
          link: "https://www.behance.net/nambui2909",
        },
        { name: "LinkedIn", icon: "💼", link: "#" },
        { name: "Zalo", icon: "💬", link: "https://zalo.me/0852208088" },
      ],
    },
    detail: {
      back: "Quay lại",
      backOther: "Quay lại các dự án",
      contact: "Liên hệ với tôi",
      problem: "Vấn đề",
      research: "Nghiên cứu",
      solution: "Giải pháp",
      info: "Thông tin dự án",
      category: "Lĩnh vực",
      role: "Vai trò",
      timeline: "Thời gian",
      visit: "Ghé thăm dự án",
      prevProject: "Dự án trước",
      nextProject: "Dự án sau",
    },
    footer: { rights: "Copyright © Nam Bùi 2026. All rights reserved." },
  },
  en: {
    nav: {
      work: "Projects",
      about: "About",
      whatIHave: "What I Have",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      label: "Ui/UX Designer",
      intro: "Hello, I'm Nhat Nam!",
      title: ["WELCOME TO", "MY SPACE"],
      tagline:
        "I research first, design second — because beauty without usability is not enough.",
      sub: "I believe that no matter how difficult the problem, there is always a solution",
      cta: "View Projects →",
      status: "🟢 Open to new opportunities",
      scroll: "SCROLL",
    },
    work: {
      title: "My",
      accent: "Projects",
      sub: "hover the folder to see what's inside",
      all: "All",
      uiux: "UI/UX Design",
      other: "Other Works",
      clickToView: "Click to view",
      detail: "View Details",
      select: "Select a card to view project",
    },
    about: {
      title: "About",
      accent: "Me",
      sub: "the person behind the pixels",
      content:
        "Hello! I am Nhat Nam.\n\nI am a UI/UX Designer, with a starting point from Branding & Graphic Design. My passion for creativity urged me to build a Graphic Design foundation since university, even though my major was International Business Administration at UEB, VNU Hanoi.\n\nThis seemingly strange combination is the foundation that shapes how I see everything to this day.\n\nI gradually realized that I don't just want to create beautiful and functional products, but also to create solutions for practical daily problems. Economic thinking and a design background brought me to UI/UX - where I synthesize everything.",
      caption: "To realize ideas",
    },
    whatIHave: {
      title: "What",
      accent: "I Have",
      sub: "For you if you haven't seen my CV yet",
      experience: {
        title: "Experience",
        items: [
          {
            role: "UI/UX Designer",
            company: "TAPUNIVERSE",
            period: "04/2025 - PRESENT",
          },
          {
            role: "Graphic Designer & UI/UX Designer",
            company: "FREELANCE",
            period: "02/2024 - 03/2025",
          },
          {
            role: "Graphic Designer",
            company: "TRANGNAMAUTO & MLEGEND",
            period: "05/2022 - 01/2023",
          },
          {
            role: "Design Intern",
            company: "TRUONGTHANH FURNITURE",
            period: "12/2021 - 02/2022",
          },
        ],
      },
      education: {
        title: "Education",
        items: [
          {
            school:
              "Troy University - University of Economics and Business, VNU",
            major: "INTERNATIONAL BUSINESS ADMINISTRATION",
            period: "2020 - 2024",
          },
          {
            school: "ColorMe - Design Training Center",
            major: "2D GRAPHIC DESIGN - UI/UX DESIGN",
            period: "2021 - 2022",
          },
        ],
      },
      skills: {
        title: "Skills",
        list: [
          "UI Design",
          "UX Design",
          "Interaction Design",
          "Market Research",
          "User Research",
          "Define Problems",
          "Ideate Solutions",
          "User Flow",
          "Information Architecture",
          "Wireframing",
          "Design System",
          "Visual Design",
          "Prototyping",
          "Testing",
          "Basic HTML",
          "Basic CSS",
        ],
      },
      tools: {
        title: "Tools",
        list: [
          "Figma",
          "Adobe Illustrator",
          "Adobe Photoshop",
          "Adobe InDesign",
          "Procreate",
          "Capcut",
          "Affinity",
          "Notion",
        ],
      },
    },
    contact: {
      title: "Can't catch me there?",
      accent: "Then catch me here",
      sub: "Let's create something amazing together",
      note: "Whack my character to unlock contact info!",
      email: "bnnamdesign@gmail.com",
      phone: "+84 852 208 088",
      socials: [
        {
          name: "Instagram",
          icon: "📸",
          handle: "bnnambrandingdesign",
          link: "https://www.instagram.com/bnnambrandingdesign/",
        },
        {
          name: "Behance",
          icon: "🎨",
          link: "https://www.behance.net/nambui2909",
        },
        { name: "LinkedIn", icon: "💼", link: "#" },
        { name: "Zalo", icon: "💬", link: "https://zalo.me/0852208088" },
      ],
    },
    detail: {
      back: "Back",
      backOther: "Back to projects",
      contact: "Contact me",
      problem: "Problem",
      research: "Research",
      solution: "Solution",
      info: "Project Info",
      category: "Category",
      role: "Role",
      timeline: "Timeline",
      visit: "Visit Project",
      prevProject: "Previous Project",
      nextProject: "Next Project",
    },
    footer: { rights: "Copyright © Nam Bùi 2026. All rights reserved." },
  },
};

const WhackAMoleGame = ({ lang }: { lang: "vi" | "en" }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [activeHoles, setActiveHoles] = useState<
    { index: number; type: "me" | "fake" }[]
  >([]);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWrongCatch, setIsWrongCatch] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [speed] = useState(700); // Faster constant speed
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const popCharacter = () => {
    if (isWon || isGameOver || !isStarted) return;

    const newHoles: { index: number; type: "me" | "fake" }[] = [];
    const availableIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const getHole = () => {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      return availableIndices.splice(randomIndex, 1)[0];
    };

    const rand = Math.random();
    if (rand < 0.33) {
      // Scenario 1: Only 1 Me
      newHoles.push({ index: getHole(), type: "me" });
    } else if (rand < 0.66) {
      // Scenario 2: Only 1 Fake
      newHoles.push({ index: getHole(), type: "fake" });
    } else {
      // Scenario 3: Both 1 Me and 1 Fake
      newHoles.push({ index: getHole(), type: "me" });
      newHoles.push({ index: getHole(), type: "fake" });
    }

    setActiveHoles(newHoles);

    // Hide after a duration
    setTimeout(() => {
      setActiveHoles([]);
    }, speed * 0.8);
  };

  useEffect(() => {
    if (isStarted && !isWon && !isGameOver) {
      timerRef.current = setInterval(popCharacter, speed);

      countdownRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameOver(true);
            if (countdownRef.current) clearInterval(countdownRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [speed, isWon, isStarted, isGameOver]);

  const resetGame = () => {
    setIsWon(false);
    setIsGameOver(false);
    setIsStarted(false);
    setTimeLeft(15);
    setActiveHoles([]);
  };

  const handleWhack = (index: number) => {
    if (!isStarted || isWon || isGameOver || isWrongCatch) return;
    const hit = activeHoles.find((h) => h.index === index);
    if (hit) {
      if (hit.type === "me") {
        setIsWon(true);
        setActiveHoles([]);
        if (countdownRef.current) clearInterval(countdownRef.current);
        if (timerRef.current) clearInterval(timerRef.current);

        // Auto open email immediately
        window.location.href = "mailto:bnnamdesign@gmail.com";
      } else {
        setIsWrongCatch(true);
        setActiveHoles([]);
        // Clear wrong catch after 2 seconds
        setTimeout(() => setIsWrongCatch(false), 2000);
      }
    }
  };

  return (
    <div className="relative w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-[48px] border border-black/5 dark:border-white/5 pt-8 px-12 md:px-24 pb-8 flex flex-col overflow-hidden">
      {/* Game Title / Timer */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-display font-bold text-accent uppercase tracking-wider">
          {isStarted && !isWon && !isGameOver
            ? lang === "vi"
              ? `CÒN LẠI: ${timeLeft}S`
              : `TIME LEFT: ${timeLeft}S`
            : lang === "vi"
              ? "Thử bắt tôi đi"
              : "Try to catch me"}
        </h3>
      </div>

      {/* Timer Display Removed from absolute position as it's now in the title */}

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => {
            const activeHole = activeHoles.find((h) => h.index === i);
            return (
              <div
                key={i}
                className="relative aspect-square bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full shadow-inner overflow-hidden border-b-4 border-black/10 dark:border-white/5"
              >
                <AnimatePresence>
                  {/* Initial state: Me in the center */}
                  {!isStarted && i === 4 && (
                    <motion.div
                      initial={{ y: isMobile ? "150%" : "100%" }}
                      animate={{ y: 0 }}
                      className="absolute inset-0 flex items-center justify-center select-none"
                    >
                      <div className="relative">
                        <img
                          src="./image/Game/Game_Mainchar.webp"
                          alt="Character"
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-zinc-800 shadow-2xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Active game state */}
                  {isStarted && activeHole && (
                    <motion.div
                      initial={{ y: isMobile ? "150%" : "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: isMobile ? "150%" : "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onClick={() => handleWhack(i)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer select-none"
                    >
                      {activeHole.type === "me" ? (
                        <img
                          src="./image/Game/Game_Mainchar.webp"
                          alt="Character"
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white dark:border-zinc-800 shadow-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <img
                          src="./image/Game/Ghigachad.webp"
                          alt="Joker"
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white dark:border-zinc-800 shadow-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/20 blur-sm rounded-full" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button Overlay - Removed blur/dim */}
      {!isStarted && !isWon && !isGameOver && (
        <div className="absolute inset-0 z-20 flex items-end justify-center pb-12 rounded-[48px]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsStarted(true)}
            className="bg-accent text-white px-12 py-4 rounded-full font-sans font-bold text-[16px] shadow-xl hover:shadow-accent/40 transition-shadow"
          >
            {lang === "vi" ? "BẮT ĐẦU" : "START"}
          </motion.button>
        </div>
      )}

      {/* Wrong Catch State */}
      {isWrongCatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-red-500/90 backdrop-blur-sm rounded-[48px] flex flex-col items-center justify-center text-white p-8 text-center z-30"
        >
          <motion.div
            animate={{ x: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 mb-4 rounded-full border-4 border-white overflow-hidden shadow-2xl"
          >
            <img
              src="./image/Game/Ghigachad.webp"
              alt="Joker"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h3 className="text-2xl font-display font-bold mb-2">
            {lang === "vi" ? "Opps!" : "Oops!"}
          </h3>
          <p className="text-lg font-medium">
            {lang === "vi"
              ? "Tôi không phải Nhật Nam, bạn bắt nhầm rồi"
              : "I'm not Nhat Nam, you caught the wrong one"}
          </p>
        </motion.div>
      )}

      {/* Win State */}
      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-accent/90 backdrop-blur-sm rounded-[48px] flex flex-col items-center justify-center text-white p-8 text-center z-30"
        >
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.span>
          <h3 className="text-3xl font-display font-bold mb-2">
            {lang === "vi" ? "Bắt được tôi rồi!!" : "Caught Me!!"}
          </h3>
          <p className="opacity-90 mb-6">
            {lang === "vi" ? "Bạn giỏi quá đi!" : "You are so good!"}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-white text-accent px-8 py-3 rounded-full font-sans font-bold text-[16px] shadow-lg"
          >
            {lang === "vi" ? "CHƠI LẠI" : "PLAY AGAIN"}
          </motion.button>
        </motion.div>
      )}

      {/* Game Over State */}
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm rounded-[48px] flex flex-col items-center justify-center text-white p-8 text-center z-30"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-6xl mb-4"
          >
            ⏰
          </motion.span>
          <h3 className="text-3xl font-display font-bold mb-2">
            {lang === "vi" ? "Hết thời gian!" : "Time Out!"}
          </h3>
          <p className="opacity-90 mb-6">
            {lang === "vi"
              ? "Bạn chưa bắt được tôi rồi."
              : "You couldn't catch me."}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-accent text-white px-8 py-3 rounded-full font-sans font-bold text-[16px] shadow-lg"
          >
            {lang === "vi" ? "THỬ LẠI" : "TRY AGAIN"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

const SectionHeader = ({
  title,
  accent,
  sub,
  titleSize = "text-[clamp(32px,7vw,80px)]",
  titleClassName = "",
}: {
  title: string;
  accent: string;
  sub: string;
  titleSize?: string;
  gap?: string;
  titleClassName?: string;
}) => (
  <div className="flex flex-col items-center mb-20 md:mb-12 text-center relative z-10 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <h2
        className={`font-display ${titleSize} leading-[1.1] font-bold text-accent text-center mx-auto ${titleClassName}`}
      >
        {title} {accent}
      </h2>
      <p className="font-sans italic text-base md:text-xl text-ink/40 dark:text-white/40 mt-2 md:mt-3 max-w-2xl">
        {sub}
      </p>
    </motion.div>
  </div>
);

const AboutImageBloom = ({ lang, t }: { lang: "vi" | "en"; t: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bloomImages = [
    "./image/About_me/What help me 1.webp",
    "./image/About_me/What help me 2.webp",
    "./image/About_me/What help me 3.webp",
    "./image/About_me/What help me 4.webp",
    "./image/About_me/What help me 5.webp",
    "./image/About_me/What help me 6.webp",
  ];

  const multiplier = isMobile ? 0.65 : 1.0;

  const positions = [
    { x: -120 * multiplier, y: -180 * multiplier, rotate: 10 }, // Top Left
    { x: 120 * multiplier, y: -180 * multiplier, rotate: -10 }, // Top Right
    { x: -145 * multiplier, y: -30 * multiplier, rotate: 10 }, // Middle Left (Closer & 10deg)
    { x: 145 * multiplier, y: -30 * multiplier, rotate: 13 }, // Middle Right (Closer & 13deg)
    { x: -105 * multiplier, y: 135 * multiplier, rotate: 25 }, // Bottom Left (Closer & 25deg)
    { x: 105 * multiplier, y: 135 * multiplier, rotate: -8 }, // Bottom Right (Closer & -8deg)
  ];

  return (
    <div
      className="relative w-full max-w-[600px] aspect-square flex items-center justify-center mb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bloom Images */}
      {bloomImages.map((src, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={
            isHovered
              ? {
                  x: positions[i].x,
                  y: positions[i].y,
                  opacity: 1,
                  scale: 0.85,
                  rotate: positions[i].rotate,
                }
              : {
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.5,
                  rotate: 0,
                }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: i * 0.05,
          }}
          className="absolute w-20 h-20 md:w-36 md:h-36 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl border-[4px] md:border-[6px] border-white dark:border-zinc-800 z-10"
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      ))}

      {/* Main Central Image */}
      <motion.div
        animate={isHovered ? { scale: 1.0 } : { scale: 1.25 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full z-20 flex items-center justify-center"
      >
        <img
          src="./image/About_me/Full Body_Character.webp"
          alt="Nhật Nam"
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.25))" }}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Caption Overlay */}
      <motion.div
        animate={{ y: 0 }}
        className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 z-30 font-sans italic text-[16px] md:text-[18px] tracking-wide text-center whitespace-nowrap transition-colors duration-300"
        style={{ color: isHovered ? "#00A3FF" : "#94a3b8" }}
      >
        {isHovered
          ? lang === "vi"
            ? "Không thể thiếu những người bạn này"
            : "These friends are indispensable"
          : t.about.caption}
      </motion.div>
    </div>
  );
};

const Marquee = () => {
  const items = [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Affinity",
    "Procreate",
    "CapCut",
    "Notion",
    "Figma",
  ];
  const icons = [Sparkles, Pencil, MousePointer2, Lightbulb, PenTool];

  const MarqueeGroup = () => (
    <div className="flex gap-12 items-center pr-12">
      {items.map((text, j) => {
        const Icon = icons[j % icons.length];
        return (
          <React.Fragment key={j}>
            <span className="font-sans font-medium text-base uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-accent to-[#007BFF]">
              {text}
            </span>
            <Icon className="text-accent w-4 h-4 opacity-80" />
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden py-6 z-0">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        <MarqueeGroup />
        <MarqueeGroup />
      </motion.div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </div>
  );
};

export default function App() {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [filter, setFilter] = useState<"all" | "uiux" | "other">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFolder, setActiveFolder] = useState<"uiux" | "other" | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    index: number;
    images: string[];
  }>({
    isOpen: false,
    index: 0,
    images: [],
  });

  // Prevent right click context menu to protect images
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const t = TRANSLATIONS[lang];
  const filteredProjects = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter,
  );

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setImagesLoaded(0);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (activeFolder && !selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeFolder, selectedProject]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resetView = () => {
    setSelectedProject(null);
    setActiveFolder(null);
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white relative">
      <CustomCursor />
      {/* Navigation */}
      <div
        className={`${selectedProject ? "absolute" : "fixed"} z-50 transition-all duration-500 flex justify-center items-center ${scrolled && !selectedProject ? "top-6 w-full px-6" : "top-0 w-full px-0"}`}
      >
        <nav
          className={`bg-bg/90 backdrop-blur-md border-black/5 transition-all duration-500 flex items-center ${scrolled && !selectedProject ? "rounded-full pl-4 md:pl-6 pr-1.5 py-1.5 shadow-2xl border gap-4 md:gap-12" : "w-full px-6 py-4 md:py-6 border-b rounded-none justify-between"}`}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              resetView();
              window.scrollTo(0, 0);
            }}
            className="shrink-0 flex items-center"
          >
            <img
              src="./image/logo/logo.svg"
              alt="Logo"
              className="h-10 md:h-12 w-auto brightness-0 dark:invert"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <ul className="flex items-center gap-2">
              <li>
                <a
                  href="#work"
                  onClick={resetView}
                  className="t-nav-link hover:text-accent hover:bg-accent/5 px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  {t.nav.work}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={resetView}
                  className="t-nav-link hover:text-accent hover:bg-accent/5 px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={resetView}
                  className="t-nav-link hover:text-accent hover:bg-accent/5 px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>

            <a
              href="https://drive.google.com/file/d/1-0jp6SN-CYT-0l4rGDZq6fCXaBYpShOt/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Xem CV"
              className="bg-gradient-to-r from-blue-400 to-accent text-white px-[30px] py-2.5 rounded-full t-btn hover:shadow-xl hover:shadow-accent/20 hover:scale-105 transition-all duration-300 whitespace-nowrap font-bold tracking-wide"
            >
              {t.nav.resume}
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="relative w-[66px] h-[44px] bg-zinc-100 dark:bg-zinc-800 rounded-full p-0 transition-colors duration-300 focus:outline-none flex items-center overflow-hidden"
              aria-label="Toggle Language"
            >
              <motion.div
                animate={{ x: lang === "vi" ? 0 : 17.5 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[48.5px] h-[42.5px] bg-white dark:bg-zinc-700 rounded-full shadow-sm flex items-center justify-center text-[12px] font-bold text-accent"
              >
                {lang === "vi" ? "Vi" : "En"}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden ml-auto">
            <button
              className="text-ink p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-bg dark:bg-ink z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <a
              href="#work"
              onClick={() => {
                setIsMenuOpen(false);
                resetView();
              }}
              className="text-2xl font-sans font-bold"
            >
              {t.nav.work}
            </a>
            <a
              href="#about"
              onClick={() => {
                setIsMenuOpen(false);
                resetView();
              }}
              className="text-2xl font-sans font-bold"
            >
              {t.nav.about}
            </a>
            <a
              href="#contact"
              onClick={() => {
                setIsMenuOpen(false);
                resetView();
              }}
              className="text-2xl font-sans font-bold"
            >
              {t.nav.contact}
            </a>

            <a
              href="https://drive.google.com/file/d/1xSBP3uJ8YHye-i8ZCLntZHvCM5vFwXgz/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Xem CV"
              className="bg-gradient-to-r from-blue-400 to-accent text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
            >
              {t.nav.resume}
            </a>

            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="relative w-16 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 transition-colors duration-300"
            >
              <motion.div
                animate={{ x: lang === "vi" ? 0 : 24 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-8 h-8 bg-white dark:bg-zinc-700 rounded-full shadow-sm flex items-center justify-center text-[12px] font-bold text-accent"
              >
                {lang === "vi" ? "Vi" : "En"}
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Lightbox
          images={lightboxState.images}
          initialIndex={lightboxState.index}
          isOpen={lightboxState.isOpen}
          onClose={() =>
            setLightboxState((prev) => ({ ...prev, isOpen: false }))
          }
          onIndexChange={(index) =>
            setLightboxState((prev) => ({ ...prev, index }))
          }
        />
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section
                id="hero"
                className="min-h-screen relative flex flex-col justify-center items-center px-[5%] pt-[160px] pb-20 rounded-none overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500 text-center"
              >
                <div className="max-w-4xl mx-auto w-full flex flex-col items-center relative z-10">
                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onMouseEnter={() => setIsAvatarHovered(true)}
                    onMouseLeave={() => setIsAvatarHovered(false)}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="relative mb-12 cursor-pointer group"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      animate={{ rotateY: isAvatarHovered ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="w-44 h-44 md:w-60 md:h-60 relative"
                    >
                      {/* Front Face */}
                      <div
                        className={`absolute inset-0 w-full h-full rounded-full border-4 ${isAvatarHovered ? "border-accent" : "border-transparent"} p-1 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden transition-colors duration-300`}
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <img
                          src="./image/Profile/Profile_Front.webp"
                          alt="Nhật Nam"
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Back Face */}
                      <div
                        className={`absolute inset-0 w-full h-full rounded-full border-4 ${isAvatarHovered ? "border-accent" : "border-transparent"} p-1 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden transition-colors duration-300`}
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <img
                          src="./image/Profile/Profile_back.webp"
                          alt="Nhật Nam Creative"
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </motion.div>

                    {/* Overlapping Label */}
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: isAvatarHovered ? 0 : [0, -6, 0],
                        rotate: isAvatarHovered ? 0 : [-1.5, 1.5, -1.5],
                      }}
                      transition={{
                        opacity: { delay: 0.5 },
                        x: { delay: 0.5 },
                        y: isAvatarHovered
                          ? { duration: 0.3 }
                          : {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                        rotate: isAvatarHovered
                          ? { duration: 0.3 }
                          : {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                        layout: { type: "spring", stiffness: 300, damping: 25 },
                      }}
                      className={`absolute ${isAvatarHovered ? "-top-2" : "-bottom-2"} -right-6 md:-right-8 bg-white dark:bg-zinc-900 text-ink dark:text-white px-5 py-2.5 rounded-full font-sans font-bold italic text-[14px] uppercase border border-black/5 dark:border-white/5 shadow-xl shadow-black/10 dark:shadow-white/5 whitespace-nowrap z-20 flex items-center gap-2`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${isAvatarHovered ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-accent shadow-[0_0_10px_rgba(0,163,255,0.5)]"} animate-pulse`}
                      />
                      {isAvatarHovered ? "OPEN TO WORK " : t.hero.label}
                    </motion.div>
                  </motion.div>

                  {/* Intro Line */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 text-accent font-sans font-bold text-2xl tracking-wide"
                  >
                    {t.hero.intro}
                  </motion.p>

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12 font-display font-black tracking-tighter flex flex-col items-center gap-y-2 md:gap-y-3 w-full px-8 md:px-0"
                    style={{
                      fontSize: "clamp(22px, 8.5vw, 110px)",
                      lineHeight: "1",
                    }}
                  >
                    {(t.hero.title as string[]).map((line, lineIdx) => (
                      <motion.div
                        key={lineIdx}
                        className={`whitespace-nowrap flex gap-x-4 md:gap-x-6 cursor-default transition-colors duration-300 ${
                          lineIdx === 1
                            ? "text-zinc-400 dark:text-zinc-500"
                            : "text-ink dark:text-white"
                        }`}
                        whileHover="hover"
                      >
                        {line.split(" ").map((word, wordIdx) => (
                          <div key={wordIdx} className="flex">
                            {word.split("").map((char, i) => {
                              // Alternate rotation for each letter to create a dynamic tilted effect
                              const rotation =
                                (i + wordIdx + lineIdx) % 2 === 0 ? 6 : -6;
                              return (
                                <motion.span
                                  key={i}
                                  className="inline-block"
                                  variants={{
                                    hover: {
                                      y: -12,
                                      rotate: rotation,
                                      color: "#00A3FF",
                                      transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15,
                                      },
                                    },
                                  }}
                                >
                                  {char}
                                </motion.span>
                              );
                            })}
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </motion.h1>

                  {/* CTA Button removed */}
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
                  <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                  />
                </div>
              </section>

              <Marquee />

              {/* Work Section */}
              <section
                id="work"
                className="pt-[100px] pb-[100px] px-[5%] relative"
              >
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="flex flex-col items-center mb-20 md:mb-12 text-center relative z-10 px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="font-display text-[clamp(32px,6vw,60px)] leading-[1.1] font-bold text-accent text-center">
                        {t.work.title} {t.work.accent}
                      </h2>
                      <p className="font-sans italic text-base md:text-xl text-ink/40 dark:text-white/40 mt-2 md:mt-3 max-w-2xl">
                        {t.work.sub}
                      </p>
                    </motion.div>
                  </div>

                  {/* Folder Categories */}
                  <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-32 lg:gap-32 pt-12 pb-0 max-w-7xl mx-auto">
                    {(["uiux", "other"] as const).map((cat) => {
                      const catProjects = PROJECTS.filter(
                        (p) => p.category === cat,
                      );
                      return (
                        <motion.div
                          key={cat}
                          className="relative group cursor-pointer w-full max-w-[420px] aspect-[1.4/1] flex items-end justify-center"
                          onClick={() => setActiveFolder(cat)}
                          data-cursor-label={
                            lang === "vi" ? "Mở các dự án" : "Open projects"
                          }
                          initial="initial"
                          whileHover="hover"
                        >
                          {/* Background White Shape */}
                          <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-[56px] shadow-xl border border-black/5 dark:border-white/5 overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.07] dot-grid text-ink pointer-events-none" />
                          </div>

                          {/* Stacked Cards (Peeking out) */}
                          <div className="absolute top-0 left-0 right-0 h-1/2 flex justify-center items-end pointer-events-none">
                            {catProjects.slice(0, 4).map((p, i, arr) => {
                              const total = arr.length;
                              const distFromCenter = i - (total - 1) / 2;
                              return (
                                <motion.div
                                  key={p.id}
                                  variants={{
                                    initial: {
                                      rotate: distFromCenter * 10,
                                      x: distFromCenter * 20,
                                      y: 30,
                                      scale: 1.1,
                                    },
                                    hover: {
                                      rotate: distFromCenter * 15,
                                      x: distFromCenter * 60,
                                      y: 10,
                                      scale: 1.3,
                                      transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                      },
                                    },
                                  }}
                                  className="absolute left-1/2 -translate-x-1/2 w-40 h-52 bg-zinc-100 dark:bg-zinc-800 rounded-[32px] shadow-2xl border border-white/50 dark:border-zinc-700 overflow-hidden"
                                  style={{ zIndex: 10 - i }}
                                >
                                  {p.homeThumbnail ? (
                                    <img
                                      src={p.homeThumbnail}
                                      alt=""
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700" />
                                  )}
                                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Front Panel (Gradient) */}
                          <motion.div
                            variants={{
                              initial: { height: 180 },
                              hover: { height: 115 },
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                            className="relative w-full bg-linear-to-br from-[#7DD3FC] to-accent rounded-[48px] p-6 flex items-start justify-center shadow-2xl z-30 overflow-hidden"
                          >
                            {/* Label Box */}
                            <div className="w-full bg-white/40 backdrop-blur-md rounded-[32px] py-4 px-4 flex items-center justify-center border border-white/30 shadow-inner">
                              <span className="text-white font-black text-2xl tracking-tight uppercase">
                                {cat === "uiux"
                                  ? "UI/UX"
                                  : lang === "vi"
                                    ? "DỰ ÁN KHÁC"
                                    : "OTHERS"}
                              </span>
                            </div>

                            {/* Stats & Action */}
                            <motion.div
                              variants={{
                                initial: { opacity: 1, y: 0 },
                                hover: { opacity: 0, y: 20 },
                              }}
                              className="absolute bottom-6 left-8 right-8 flex justify-between items-center px-2 shrink-0"
                            >
                              <span className="text-white font-bold text-base">
                                {catProjects.length}{" "}
                                {lang === "vi" ? "dự án" : "projects"}
                              </span>
                              <span className="text-white font-medium text-base italic flex items-center gap-1 opacity-90">
                                {t.work.clickToView}{" "}
                                <ArrowDown size={16} className="-rotate-90" />
                              </span>
                            </motion.div>
                          </motion.div>

                          {/* Hover Glow Effect */}
                          <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Project Spread Overlay - Moved outside section for better layering */}
              <AnimatePresence>
                {activeFolder && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                  >
                    {/* Backdrop */}
                    <div
                      className="absolute inset-0 bg-bg/80 backdrop-blur-md"
                      onClick={() => {
                        setActiveFolder(null);
                        const workSection = document.getElementById("work");
                        if (workSection) {
                          workSection.scrollIntoView({ behavior: "instant" });
                        }
                      }}
                    />

                    {/* Selection Frame */}
                    <div className="relative w-full h-full flex flex-col overflow-hidden">
                      {/* Scroll Frame with Mask Effect */}
                      <div className="relative flex-1 overflow-hidden">
                        {/* Top Fading Blur Overlay */}
                        <div
                          className="absolute top-0 left-0 right-[8px] h-32 z-30 pointer-events-none bg-linear-to-b from-bg via-bg/50 to-transparent"
                          style={{
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            maskImage:
                              "linear-gradient(to bottom, black 0%, transparent 100%)",
                            WebkitMaskImage:
                              "linear-gradient(to bottom, black 0%, transparent 100%)",
                          }}
                        />

                        {/* Bottom Fading Blur Overlay */}
                        <div
                          className="absolute bottom-0 left-0 right-[8px] h-48 z-30 pointer-events-none bg-linear-to-t from-bg via-bg/98 to-transparent"
                          style={{
                            backdropFilter: "blur(32px)",
                            WebkitBackdropFilter: "blur(32px)",
                            maskImage:
                              "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                            WebkitMaskImage:
                              "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                          }}
                        />

                        {/* Cards Grid Spread */}
                        <div className="w-full h-full overflow-y-auto pt-32 pb-32 px-6 md:px-12 custom-scrollbar mask-fade-edges z-10">
                          <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-stretch gap-8 md:gap-12">
                            {PROJECTS.filter(
                              (p) => p.category === activeFolder,
                            ).map((project, index) => {
                              return (
                                <motion.div
                                  key={project.id}
                                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                      delay: index * 0.04,
                                      type: "spring",
                                      stiffness: 100,
                                      damping: 15,
                                    },
                                  }}
                                  whileHover={
                                    project.chip?.en === "Updating..."
                                      ? {}
                                      : {
                                          scale: 1.05,
                                          y: -10,
                                          rotate: -2,
                                          zIndex: 20,
                                          transition: {
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 15,
                                          },
                                        }
                                  }
                                  onClick={() => {
                                    if (project.chip?.en !== "Updating...") {
                                      setSelectedProject(project);
                                      window.scrollTo(0, 0);
                                    }
                                  }}
                                  data-cursor-label={
                                    project.chip?.en === "Updating..."
                                      ? ""
                                      : lang === "vi"
                                        ? "Xem chi tiết"
                                        : "View Details"
                                  }
                                  className={`relative w-full max-w-[388px] bg-white dark:bg-zinc-900 rounded-[24px] sm:rounded-[32px] p-2 sm:p-[10px] shadow-xl hover:shadow-2xl border border-black/5 dark:border-white/10 z-0 flex flex-col items-start gap-2 sm:gap-[10px] ${project.chip?.en === "Updating..." ? "cursor-not-allowed group" : "cursor-pointer group"}`}
                                >
                                  <div className="w-full aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden shrink-0">
                                    <img
                                      src={project.image}
                                      alt={project.title[lang]}
                                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>

                                  <div className="flex p-3 sm:p-4 justify-between items-end gap-3 sm:gap-4 self-stretch rounded-[16px] sm:rounded-[22px] bg-white border-2 border-[#f2f2f2] dark:bg-zinc-900 dark:border-zinc-800 flex-1">
                                    <div className="flex flex-col items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                      <div className="flex flex-nowrap gap-2 overflow-hidden w-full">
                                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#DAF3FF] dark:bg-sky-900/30 text-[#00A3FF] dark:text-sky-400 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap truncate min-w-0 shrink">
                                          {project.tag.split(" ").length > 3
                                            ? project.tag
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ") + "..."
                                            : project.tag}
                                        </span>
                                        {project.chip && (
                                          <span
                                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap truncate min-w-0 shrink ${
                                              project.chip.en === "Updating..."
                                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                                                : "bg-[#DAF3FF] dark:bg-sky-900/30 text-[#00A3FF] dark:text-sky-400"
                                            }`}
                                          >
                                            {project.chip[lang].split(" ")
                                              .length > 3
                                              ? project.chip[lang]
                                                  .split(" ")
                                                  .slice(0, 3)
                                                  .join(" ") + "..."
                                              : project.chip[lang]}
                                          </span>
                                        )}
                                      </div>
                                      <h3 className="font-sans font-bold text-lg sm:text-xl text-ink dark:text-white leading-tight line-clamp-2 w-full">
                                        {project.title[lang]}
                                      </h3>
                                    </div>
                                    <div
                                      className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 text-white rounded-full flex items-center justify-center shadow-md transition-transform ${project.chip?.en === "Updating..." ? "bg-zinc-400 dark:bg-zinc-600" : "bg-[#00A3FF] group-hover:scale-110"}`}
                                    >
                                      {project.chip?.en === "Updating..." ? (
                                        <Clock
                                          className="w-5 h-5 sm:w-6 sm:h-6"
                                          strokeWidth={2.5}
                                        />
                                      ) : (
                                        <ArrowUpRight
                                          className="w-5 h-5 sm:w-6 sm:h-6"
                                          strokeWidth={2.5}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setActiveFolder(null);
                          const workSection = document.getElementById("work");
                          if (workSection) {
                            workSection.scrollIntoView({ behavior: "instant" });
                          }
                        }}
                        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-full text-ink hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-300 z-50"
                      >
                        <X size={20} />
                      </button>

                      {/* Helper Text */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50"
                      >
                        <div className="px-6 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-full shadow-2xl flex items-center gap-4">
                          <span className="w-8 h-[1.5px] bg-accent/60"></span>
                          <span className="t-caption text-ink dark:text-white font-bold tracking-widest whitespace-nowrap">
                            {t.work.select}
                          </span>
                          <span className="w-8 h-[1.5px] bg-accent/60"></span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* About Section */}
              <section
                id="about"
                className="pt-[100px] pb-[100px] px-[5%] bg-[#e9f7ff] dark:bg-zinc-950 relative overflow-hidden"
              >
                <div className="max-w-7xl mx-auto relative z-10">
                  <SectionHeader
                    title={t.about.title}
                    accent={t.about.accent}
                    sub={t.about.sub}
                    titleSize="text-[clamp(32px,6vw,60px)]"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0 items-center -mt-5">
                    <div className="lg:col-span-7">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rotate-[-1deg] max-w-[600px] mx-auto lg:mr-0 lg:ml-auto"
                      >
                        {/* Paperclip - Positioned at 80 degrees, centered on the red line, half-overlapping the top edge */}
                        <div className="absolute top-0 left-12 md:left-16 z-30 -translate-x-1/2 -translate-y-1/2 rotate-[80deg] drop-shadow-lg pointer-events-none">
                          <img
                            src="./image/Decoration/paper_clip8.webp"
                            alt="Paperclip"
                            className="w-[100px] h-[200px] object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Paper Background with clipping for texture and margin line */}
                        <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden">
                          {/* Red margin line */}
                          <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[1.5px] bg-red-400/30 dark:bg-red-900/40 z-10" />

                          {/* Paper texture overlay */}
                          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                        </div>

                        {/* Content Layer */}
                        <div className="relative p-8 md:p-12 z-20">
                          <div
                            className="opacity-90 text-ink dark:text-white/90 whitespace-pre-line relative z-20"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(transparent, transparent 28px, rgba(0,0,0,0.06) 28px, rgba(0,0,0,0.06) 29px)",
                              backgroundSize: "100% 29px",
                              lineHeight: "29px",
                              paddingTop: "6px",
                              paddingLeft: "38px",
                              fontSize: "16px",
                              width: "497px",
                              maxWidth: "100%",
                            }}
                          >
                            {(() => {
                              const lines = t.about.content.split("\n");
                              const firstLine = lines[0];
                              const rest = lines.slice(1).join("\n");
                              return (
                                <>
                                  <span className="text-accent font-bold italic font-display block mb-2">
                                    {firstLine}
                                  </span>
                                  {rest && (
                                    <span className="text-ink dark:text-white/90 font-normal not-italic">
                                      {rest}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                      <AboutImageBloom lang={lang} t={t} />
                    </div>
                  </div>
                </div>
              </section>

              {/* What I Have Section */}
              <section
                id="what-i-have"
                className="pt-[100px] pb-[100px] px-[5%] bg-white dark:bg-zinc-950 relative overflow-hidden"
              >
                <div className="max-w-7xl mx-auto relative z-10">
                  <SectionHeader
                    title={t.whatIHave.title}
                    accent={t.whatIHave.accent}
                    sub={t.whatIHave.sub}
                    titleSize="text-[clamp(32px,6vw,60px)]"
                    gap="gap-x-2 md:gap-x-3"
                    titleClassName="max-w-[250px] md:max-w-none md:whitespace-nowrap"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience */}
                    <div className="bg-[#F0F9FF] dark:bg-accent/5 rounded-[40px] md:rounded-[48px] p-8 md:p-6 lg:p-10 space-y-6 md:space-y-8">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-full text-accent font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                          {t.whatIHave.experience.title}
                        </div>
                      </div>
                      <div className="space-y-10">
                        {t.whatIHave.experience.items.map((item, i) => (
                          <div key={i} className="flex gap-4 lg:gap-6 group">
                            <div className="w-4 h-4 border-[3px] border-accent bg-white dark:bg-zinc-900 rounded-full shrink-0 mt-1.5"></div>
                            <div className="space-y-1">
                              <h4 className="text-base md:text-xl font-bold text-ink dark:text-white leading-tight">
                                {item.role}
                              </h4>
                              <p className="text-[12px] md:text-[13px] font-bold text-ink/40 dark:text-white/40 uppercase tracking-wider">
                                {item.company}{" "}
                                {item.period && `| ${item.period}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-[#F0F9FF] dark:bg-accent/5 rounded-[40px] md:rounded-[48px] p-8 md:p-6 lg:p-10 space-y-6 md:space-y-8">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-full text-accent font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                          {t.whatIHave.skills.title}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {t.whatIHave.skills.list.map((skill, i) => (
                          <span
                            key={i}
                            className="px-4 md:px-5 py-2 md:py-2.5 bg-white dark:bg-zinc-100 text-ink rounded-full text-[12px] md:text-sm font-bold tracking-wide border-2 border-[#80cfff] transition-all duration-150"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="bg-[#F0F9FF] dark:bg-accent/5 rounded-[40px] md:rounded-[48px] p-8 md:p-6 lg:p-10 space-y-6 md:space-y-8">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-full text-accent font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                          {t.whatIHave.education.title}
                        </div>
                      </div>
                      <div className="space-y-10">
                        {t.whatIHave.education.items.map((item, i) => (
                          <div key={i} className="flex gap-4 lg:gap-6 group">
                            <div className="w-4 h-4 border-[3px] border-accent bg-white dark:bg-zinc-900 rounded-full shrink-0 mt-1.5"></div>
                            <div className="space-y-1">
                              <h4 className="text-base md:text-xl font-bold text-ink dark:text-white leading-tight">
                                {item.school}
                              </h4>
                              <p className="text-[12px] md:text-[13px] font-bold text-ink/40 dark:text-white/40 uppercase tracking-wider">
                                {item.major} {item.period && `| ${item.period}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="bg-[#F0F9FF] dark:bg-accent/5 rounded-[40px] md:rounded-[48px] p-8 md:p-6 lg:p-10 space-y-6 md:space-y-8">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-full text-accent font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                          {t.whatIHave.tools.title}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                        {/* Showing 8 boxes as requested */}
                        {[...Array(8)].map((_, i) => {
                          const toolName = t.whatIHave.tools.list[i];
                          const toolIcons: Record<string, string> = {
                            Figma: "./image/Tools/figma.svg",
                            "Adobe Illustrator":
                              "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
                            "Adobe Photoshop":
                              "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
                            "Adobe InDesign":
                              "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
                            Affinity:
                              "https://upload.wikimedia.org/wikipedia/commons/c/cf/Affinity_%28App%29_Logo.svg",
                            Capcut: "./image/Tools/Capcut.svg",
                            Procreate: "./image/Tools/Procreate.svg",
                            Notion: "./image/Tools/Notion.svg",
                          };

                          const iconSrc =
                            toolName && toolIcons[toolName]
                              ? toolIcons[toolName]
                              : `https://picsum.photos/seed/tool-${i}/100/100`;

                          return (
                            <motion.div
                              key={i}
                              whileHover={{
                                scale: 1.15,
                                y: -12,
                                rotate: 8,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                              className="aspect-square flex items-center justify-center overflow-visible cursor-pointer group"
                              data-cursor-label={toolName}
                            >
                              <img
                                src={iconSrc}
                                alt={toolName || `Tool ${i + 1}`}
                                className="w-full h-full object-contain rounded-[12px] sm:rounded-[18px] md:rounded-[24px] group-hover:shadow-[0_15px_25px_-5px_rgba(0,163,255,0.4)] transition-all duration-150"
                                referrerPolicy="no-referrer"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section
                id="contact"
                className="pt-[100px] pb-[100px] px-[5%] bg-[#e9f7ff] dark:bg-zinc-950 overflow-hidden relative"
              >
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-end">
                    {/* Left: Interactive Board */}
                    <div className="flex justify-center lg:justify-start w-full max-w-[640px] mx-auto lg:mx-0">
                      <WhackAMoleGame lang={lang} />
                    </div>

                    {/* Right: Contact Info */}
                    <div className="flex flex-col text-center lg:text-left">
                      <div className="mb-0">
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="font-display text-[32px] leading-[44px] md:text-[60px] md:leading-[73px] font-bold text-accent border-[#9f9b9b] mb-8 lg:w-[590px]"
                        >
                          {t.contact.title}
                        </motion.h2>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[radial-gradient(587.45%_106.53%_at_9.82%_9.72%,_#64D4FF_0%,_#00A6FF_100%)] p-8 rounded-[44px] flex flex-col items-start gap-8 self-stretch"
                      >
                        <motion.p className="text-[32px] font-sans font-medium text-white leading-normal">
                          {lang === "vi" ? (
                            <>Thì "bắt" tôi ở đây</>
                          ) : (
                            t.contact.accent
                          )}
                        </motion.p>

                        <div className="flex flex-row gap-4 w-full">
                          {/* Behance */}
                          <motion.a
                            href={t.contact.socials[1].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label={
                              lang === "vi" ? "Behance của tôi" : "My Behance"
                            }
                            whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex-1 aspect-square md:h-24 rounded-[20px] md:rounded-[30px] bg-white flex flex-col items-center justify-center gap-2 overflow-hidden"
                          >
                            <img
                              src="./image/Contact/Behance.svg"
                              alt="Behance"
                              className="w-full h-full p-1 md:p-2 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </motion.a>

                          {/* Zalo */}
                          <motion.a
                            href={t.contact.socials[3].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label={
                              lang === "vi" ? "Zalo của tôi" : "My Zalo"
                            }
                            whileHover={{ scale: 1.1, rotate: -5, y: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex-1 aspect-square md:h-24 rounded-[20px] md:rounded-[30px] bg-white flex flex-col items-center justify-center gap-2 overflow-hidden"
                          >
                            <img
                              src="./image/Contact/Zalo.svg"
                              alt="Zalo"
                              className="w-full h-full p-1 md:p-2 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </motion.a>

                          {/* Email */}
                          <motion.a
                            href={`mailto:${t.contact.email}`}
                            data-cursor-label={
                              lang === "vi" ? "Mail cho tôi" : "Mail me"
                            }
                            whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex-1 aspect-square md:h-24 rounded-[20px] md:rounded-[30px] bg-white flex flex-col items-center justify-center gap-2 overflow-hidden"
                          >
                            <img
                              src="./image/Contact/Mail.svg"
                              alt="Email"
                              className="w-full h-full p-1 md:p-2 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </motion.a>

                          {/* Phone */}
                          <motion.a
                            href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                            data-cursor-label="+84 852208088"
                            whileHover={{ scale: 1.1, rotate: -5, y: -5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex-1 aspect-square md:h-24 rounded-[20px] md:rounded-[30px] bg-white flex flex-col items-center justify-center gap-2 overflow-hidden"
                          >
                            <img
                              src="./image/Contact/Phone.svg"
                              alt="Phone"
                              className="w-full h-full p-1 md:p-2 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            /* Case Study Detail View */
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pt-32 md:pt-40 pb-24 md:pb-32 min-h-screen"
            >
              <div className="max-w-7xl mx-auto px-[5%]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mb-12 md:mb-16 hover:text-accent transition-colors group"
                >
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full group-hover:bg-accent/10 transition-colors">
                    <ArrowLeft size={24} />
                  </div>
                </button>

                <div className="mb-16 md:mb-24">
                  <h1 className="font-sans font-bold text-2xl md:text-[40px] leading-tight mt-4 mb-4 md:mb-6 max-w-5xl">
                    {selectedProject.title[lang]}
                  </h1>

                  {selectedProject.chip?.en === "Updating..." ? (
                    <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
                      <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                        <Clock className="w-12 h-12 text-accent" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-ink dark:text-white mb-4">
                        {lang === "vi"
                          ? "Dự án đang được cập nhật"
                          : "Project is being updated"}
                      </h2>
                      <p className="text-ink/60 dark:text-white/60 max-w-md mx-auto">
                        {lang === "vi"
                          ? "Chi tiết về dự án này sẽ sớm được ra mắt trong thời gian tới. Vui lòng quay lại sau!"
                          : "Details about this project will be available soon. Please check back later!"}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Project Overview */}
                      <div className="max-w-3xl mb-16 md:mb-24">
                        <p className="text-base md:text-[20px] leading-relaxed md:leading-[33px] opacity-80 font-medium">
                          {selectedProject.description[lang]}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Seamless Image Frames */}
              {selectedProject.chip?.en !== "Updating..." && (
                <div className="flex flex-col w-full relative">
                  {(() => {
                    const categoryFolder =
                      selectedProject.category === "uiux"
                        ? "UIUX_Project"
                        : "Other_Project";
                    const projectImages = selectedProject.folder
                      ? getProjectImages(categoryFolder, selectedProject.folder)
                      : [];

                    const isAllLoaded = imagesLoaded >= projectImages.length;

                    return (
                      <>
                        {!isAllLoaded && projectImages.length > 0 && (
                          <div className="py-10 flex flex-col items-center justify-center gap-4 text-accent/60">
                            <div className="w-6 h-6 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                            <p className="t-caption font-medium animate-pulse">
                              {lang === "vi"
                                ? "Ảnh đang tải lên..."
                                : "Images are loading..."}
                            </p>
                          </div>
                        )}
                        {projectImages.map((src, i) => (
                          <div
                            key={i}
                            className={`w-full overflow-hidden cursor-zoom-in relative ${!isAllLoaded ? "hidden" : "block"}`}
                            onClick={() =>
                              setLightboxState({
                                isOpen: true,
                                index: i,
                                images: projectImages,
                              })
                            }
                          >
                            <motion.img
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              src={src}
                              alt={`${selectedProject.title[lang]} - Frame ${i + 1}`}
                              className="w-full h-auto block"
                              referrerPolicy="no-referrer"
                              onLoad={() => setImagesLoaded((prev) => prev + 1)}
                              onError={(e) => {
                                console.error(`Failed to load image: ${src}`);
                                setImagesLoaded((prev) => prev + 1); // Increment anyway to avoid infinite loading state
                              }}
                            />
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
              )}

              <div className="max-w-7xl mx-auto px-[5%] mt-40">
                <div className="pt-24 border-t border-black/5 dark:border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
                    {(() => {
                      const categoryProjects = PROJECTS.filter(
                        (p) => p.category === selectedProject.category,
                      );
                      const currentIndex = categoryProjects.findIndex(
                        (p) => p.id === selectedProject.id,
                      );
                      const prevIndex =
                        (currentIndex - 1 + categoryProjects.length) %
                        categoryProjects.length;
                      const nextIndex =
                        (currentIndex + 1) % categoryProjects.length;
                      const prevProject = categoryProjects[prevIndex];
                      const nextProject = categoryProjects[nextIndex];

                      return (
                        <>
                          {/* Previous Project */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group cursor-pointer relative overflow-hidden rounded-2xl md:rounded-[40px] bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10"
                            onClick={() => {
                              setSelectedProject(prevProject);
                              setActiveFolder(prevProject.category);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <div className="absolute inset-0 bg-linear-to-r from-bg/90 to-transparent z-10 hidden md:block" />
                            <div className="relative z-20 p-4 md:p-10 flex flex-col justify-center md:justify-between h-full min-h-[80px] md:min-h-0">
                              <div className="hidden md:block">
                                <span className="t-tag text-accent mb-2 md:mb-4 block">
                                  {prevProject.tag}
                                </span>
                                <h3 className="t-h3 text-xl md:text-3xl mb-2 md:mb-4 group-hover:text-accent transition-colors">
                                  {prevProject.title[lang]}
                                </h3>
                              </div>
                              <div className="flex items-center justify-center md:justify-start gap-2 t-caption text-accent font-bold text-[10px] md:text-sm uppercase tracking-wider">
                                <ArrowLeft
                                  size={14}
                                  className="md:w-4 md:h-4"
                                />{" "}
                                {t.detail.prevProject}
                              </div>
                            </div>
                          </motion.div>

                          {/* Next Project */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group cursor-pointer relative overflow-hidden rounded-2xl md:rounded-[40px] bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10"
                            onClick={() => {
                              setSelectedProject(nextProject);
                              setActiveFolder(nextProject.category);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <div className="absolute inset-0 bg-linear-to-l from-bg/90 to-transparent z-10 hidden md:block" />
                            <div className="relative z-20 p-4 md:p-10 flex flex-col justify-center md:justify-between h-full text-right items-center md:items-end min-h-[80px] md:min-h-0">
                              <div className="hidden md:block">
                                <span className="t-tag text-accent mb-2 md:mb-4 block">
                                  {nextProject.tag}
                                </span>
                                <h3 className="t-h3 text-xl md:text-3xl mb-2 md:mb-4 group-hover:text-accent transition-colors">
                                  {nextProject.title[lang]}
                                </h3>
                              </div>
                              <div className="flex items-center justify-center md:justify-start gap-2 t-caption text-accent font-bold text-[10px] md:text-sm uppercase tracking-wider">
                                {t.detail.nextProject}{" "}
                                <ArrowRight
                                  size={14}
                                  className="md:w-4 md:h-4"
                                />
                              </div>
                            </div>
                          </motion.div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-24 pt-16 border-t border-black/5 dark:border-white/10 flex flex-row justify-between items-center gap-4 md:gap-10">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                    }}
                    className="group transition-colors"
                  >
                    <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full text-ink dark:text-white group-hover:bg-accent/10 group-hover:text-accent transition-all">
                      <ArrowLeft size={24} />
                    </div>
                  </button>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="bg-accent/10 text-accent px-6 py-3 md:px-10 md:py-5 rounded-full t-btn font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base h-[48px] md:h-auto"
                  >
                    {t.detail.contact}{" "}
                    <ExternalLink size={18} className="md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-[5%] border-t border-black/10 dark:border-white/10 bg-[#e9f7ff] dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto flex justify-center items-center t-caption relative z-10">
          <p className="opacity-60 text-center">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
