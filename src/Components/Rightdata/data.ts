const datas = [
    {
      question: "How to Reduce CSS/JS Bundle Size By Removing Unused Resource Files and Resource Files",
      shortAnswer: "Use tools like PurgeCSS or UnCSS to identify and remove unused CSS. Minify CSS and JavaScript to reduce file size. Consider code splitting for large applications.",
      longAnswer: "Unused CSS and JavaScript can significantly increase bundle size and impact website performance. Here are strategies to reduce bundle size:\n- **CSS Optimization:**\n  - Use tools like PurgeCSS or UnCSS to analyze your HTML and remove unused CSS declarations.\n  - Minify CSS to remove unnecessary characters and whitespace.\n- **JavaScript Optimization:**\n  - Minify JavaScript to reduce file size.\n  - Consider code splitting to load only necessary code initially and load additional modules on demand.\n- **Image Optimization:**\n  - Use appropriate image formats (e.g., JPEG for photos, PNG for graphics) and optimize image sizes through compression techniques.",
      category: "Suggesstions",
      tags: ["css", "js", "bundle", "size", "unused", "resource", "files"]
    },
    {
      question: "What are the benefits of using a CSS framework?",
      shortAnswer: "Faster development, consistent styling, responsive design",
      longAnswer: "CSS frameworks provide pre-built styles and components that can streamline web development. Benefits include:\n- Faster development: Reduce time spent writing CSS from scratch.\n- Consistent styling: Ensure a consistent look and feel across your website.\n- Responsive design: Easily create websites that adapt to different screen sizes.\n- Community support: Leverage a wide range of plugins and resources.",
      category: "Para-Sale Questions",
      tags: ["css", "framework", "bootstrap", "tailwind", "foundation"]
    },
    {
      question: "How can I improve the SEO of my website?",
      shortAnswer: "Optimize content for relevant keywords, build backlinks, improve website speed and mobile-friendliness.",
      longAnswer: "Search Engine Optimization (SEO) helps your website rank higher in search results. Here are some strategies to improve your SEO:\n- **Keyword Research:** Identify relevant keywords that your target audience is searching for.\n- **Content Optimization:** Create high-quality content that is informative and engaging, and optimize it for your target keywords.\n- **On-page Optimization:** Ensure your website title tags, meta descriptions, and header tags are optimized for your target keywords.\n- **Technical SEO:** Make sure your website is technically sound, including fast loading times, mobile-friendliness, and a clean URL structure.\n- **Off-page Optimization:** Build backlinks to your website from high-quality websites.",
      category: "Metronics",
      tags: ["seo", "search engine optimization", "keywords", "content", "backlinks"]
    },
    {
      question: "What are the advantages of using a JavaScript framework?",
      shortAnswer: "Faster development, better code structure, easier maintenance, large community and resources.",
      longAnswer: "JavaScript frameworks provide a structured approach to building complex web applications. Advantages include:\n- Faster development: Utilize pre-built components and libraries to avoid writing code from scratch.\n- Improved code structure: Benefit from organized code patterns and modules for better maintainability.\n- Easier maintenance: Leverage built-in features and community support for troubleshooting and updates.\n- Large community and resources: Access a wealth of tutorials, documentation, and solutions contributed by the developer community.",
      category: "Metronics",
      tags: ["javascript", "framework", "react", "angular", "vue"]
    },
    {
      question: "What are some best practices for writing clean and maintainable code?",
      shortAnswer: "Use descriptive variable and function names, write well-commented code, follow consistent formatting styles.",
      longAnswer: "Writing clean and maintainable code is essential for long-term project success. Here are some best practices:\n- **Meaningful Naming:** Use clear and descriptive variable and function names that reflect their purpose.\n- **Commenting:** Include comments to explain complex logic or non-obvious code sections.\n- **Formatting:** Follow consistent formatting styles for indentation, spacing, and line breaks for better readability.\n- **Modularization:** Break down code into smaller, reusable functions and modules.\n- **Testing:** Write unit tests to ensure code functionality and prevent regressions.",
      category: "Suggestions",
      tags: ["code", "clean", "maintainable", "naming", "comments", "formatting"]
    }
  ];

export default datas;