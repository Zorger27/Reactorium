import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    title: 'React',
    version: '19.1.0',
    url: 'https://react.dev',
  },
  {
    id: 2,
    title: 'React Router',
    version: '7.7.1',
    url: 'https://reactrouter.com',
  },
  {
    id: 3,
    title: 'Redux Toolkit',
    version: '2.8.2',
    url: 'https://redux-toolkit.js.org',
  },
  {
    id: 4,
    title: 'Vite',
    version: '7.0.6',
    url: 'https://vitejs.dev',
  },
  {
    id: 5,
    title: 'React i18next',
    version: '15.6.1',
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
    version: "1.89.2",
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
    title: "Google Search Console",
    version: "",
    url: "https://search.google.com/search-console"
  },
  {
    id: 14,
    title: "Google Analytics",
    version: "4.0",
    url: "https://analytics.google.com"
  },
  {
    id: 15,
    title: "Open Graph protocol",
    version: "",
    url: "https://ogp.me"
  },
  {
    id: 16,
    title: "Favicon",
    version: "",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Favicon"
  },
  {
    id: 17,
    title: "Sitemap",
    version: "",
    url: "https://www.sitemaps.org"
  },
  {
    id: 18,
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
