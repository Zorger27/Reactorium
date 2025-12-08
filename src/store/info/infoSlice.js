import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    title: 'React',
    version: '19.2.1',
    url: 'https://react.dev',
  },
  {
    id: 2,
    title: 'React Router',
    version: '7.10.1',
    url: 'https://reactrouter.com',
  },
  {
    id: 3,
    title: 'Redux Toolkit',
    version: '2.11.0',
    url: 'https://redux-toolkit.js.org',
  },
  {
    id: 4,
    title: 'Vite',
    version: '7.2.6',
    url: 'https://vitejs.dev',
  },
  {
    id: 5,
    title: 'React i18next',
    version: '16.4.0',
    url: 'https://react.i18next.com',
  },
  {
    id: 6,
    title: "HTML5",
    version: "",
    url: "https://developer.mozilla.org/ru/docs/Learn/HTML/Introduction_to_HTML"
  },
  {
    id: 7,
    title: "CSS3",
    version: "",
    url: "https://developer.mozilla.org/ru/docs/Learn/CSS/First_steps"
  },
  {
    id: 8,
    title: "SASS",
    version: "1.94.2",
    url: "https://sass-lang.com"
  },
  {
    id: 9,
    title: "FlexBox CSS",
    version: "",
    url: "https://developer.mozilla.org/ru/docs/Learn/CSS/CSS_layout/Flexbox"
  },
  {
    id: 10,
    title: "Grid CSS",
    version: "",
    url: "https://developer.mozilla.org/ru/docs/Web/CSS/CSS_grid_layout"
  },
  {
    id: 11,
    title: "JavaScript",
    version: "",
    url: "https://developer.mozilla.org/ru/docs/Learn/JavaScript"
  },
  {
    id: 12,
    title: "Markdown",
    version: "",
    url: "https://www.markdownguide.org"
  },
  {
    id: 13,
    title: "Font Awesome",
    version: "7.1.0",
    url: "https://fontawesome.com"
  },
  {
    id: 14,
    title: "Google Search Console",
    version: "",
    url: "https://search.google.com/search-console"
  },
  {
    id: 15,
    title: "Google Analytics",
    version: "4.0",
    url: "https://analytics.google.com"
  },
  {
    id: 16,
    title: "Open Graph protocol",
    version: "",
    url: "https://ogp.me"
  },
  {
    id: 17,
    title: "Favicon",
    version: "",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Favicon"
  },
  {
    id: 18,
    title: "Sitemap",
    version: "",
    url: "https://www.sitemaps.org"
  },
  {
    id: 19,
    title: "Robots.txt",
    version: "",
    url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro"
  },
];

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
});

export default infoSlice.reducer;
