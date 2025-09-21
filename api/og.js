export default function handler(req, res) {
  try {
    const siteUrl = process.env.VITE_SITE_URL;
    const [pathOnly, queryString] = (req.url || "/").split("?");
    const params = new URLSearchParams(queryString);
    let lang = params.get("lang");

    const acceptLang = req.headers["accept-language"] || "";

    // Если параметра нет — пробуем Accept-Language
    if (!lang) {
      if (acceptLang.startsWith("uk")) lang = "uk";
      else if (acceptLang.startsWith("es")) lang = "es";
      else lang = "en";
    }

    // Дефолт на английский
    if (!["en", "uk", "es"].includes(lang)) lang = "en";

    // Мэппинг языков для og:locale
    const localeMap = {
      en: "en_US",
      uk: "uk_UA",
      es: "es_ES"
    };

    // Автор проекта
    // const author = {
    //   name: "Anatolii Zorin",
    //   url: "https://zorin.expert",
    //   social: {
    //     github: "https://github.com/zorger27",
    //     linkedin: "https://www.linkedin.com/in/anatolii-zorin"
    //   }
    // };

    const translations = {
      home: {
        en: { title: "Reactorium", desc: "A collection from several React web applications (created by Anatolii Zorin)" },
        uk: { title: "Reactorium", desc: "Колекція із декількох веб-застосунків на React (створено Анатолієм Зоріним)" },
        es: { title: "Reactorium", desc: "Una colección de varios aplicaciones web en React (creado por Anatolii Zorin)" }
      },
      project1: {
        en: { title: "Cube", desc: "Dynamics, geometry, and a touch of 3D magic (created by Anatolii Zorin)" },
        uk: { title: "Куб", desc: "Динаміка, геометрія й трішки 3D-магії (створено Анатолієм Зоріним)" },
        es: { title: "Cubo", desc: "Dinámica, geometría y un poco de magia 3D (creado por Anatolii Zorin)" }
      },
      project2: {
        en: { title: "Calculator", desc: "Both standard and financial mode, for any tasks (created by Anatolii Zorin)" },
        uk: { title: "Калькулятор", desc: "І стандартний, і фінансовий, для будь-яких завдань (створено Анатолієм Зоріним)" },
        es: { title: "Calculadora", desc: "En versión estándar y finanzas, para cualquier tarea (creado por Anatolii Zorin)" }
      },
      project3: {
        en: { title: "Affairs", desc: "Your personal assistant with data persistence (created by Anatolii Zorin)" },
        uk: { title: "Справи", desc: "Особистий помічник із збереженням даних (створено Анатолієм Зоріним)" },
        es: { title: "Asuntos", desc: "Tu asistente personal con guardado de datos (creado por Anatolii Zorin)" }
      },
      project4: {
        en: { title: "Memory Game", desc: "A fun challenge that you’ll want to play again (created by Anatolii Zorin)" },
        uk: { title: "Гра Пам'ять", desc: "Гра на уважність, у яку захочеться зіграти ще раз (створено Анатолієм Зоріним)" },
        es: { title: "Juego de memoria", desc: "Un reto divertido al que querrás volver a jugar (creado por Anatolii Zorin)" }
      },
      about: {
        en: { title: "About", desc: "Detailed information about Reactorium (created by Anatolii Zorin)" },
        uk: { title: "Про проект", desc: "Детальна інформація про Reactorium (створено Анатолієм Зоріним)" },
        es: { title: "Sobre", desc: "Información detallada sobre Reactorium (creado por Anatolii Zorin)" }
      },
      page404: {
        en: { title: "Page Not Found", desc: "Page 404 - page not found (created by Anatolii Zorin)" },
        uk: { title: "Сторінку не знайдено", desc: "Сторінка 404 - сторінку не знайдено (створено Анатолієм Зоріним)" },
        es: { title: "Página no encontrada", desc: "Página 404 - página no encontrada (creado por Anatolii Zorin)" }
      }
    };

    let key;
    let image;
    let pageUrl;

    const cleanPath = pathOnly.trim().replace(/\/+$/, "");

    if (cleanPath === "" || cleanPath === "/") {
      key = "home";
      image = `${siteUrl}/ogimage/home.jpg`;
      pageUrl = siteUrl;
    } else if (cleanPath === "/project1") {
      key = "project1";
      image = `${siteUrl}/ogimage/project1.jpg`;
      pageUrl = `${siteUrl}/project1`;
    } else if (cleanPath === "/project2") {
      key = "project2";
      image = `${siteUrl}/ogimage/project2.jpg`;
      pageUrl = `${siteUrl}/project2`;
    } else if (cleanPath === "/project3") {
      key = "project3";
      image = `${siteUrl}/ogimage/project3.jpg`;
      pageUrl = `${siteUrl}/project3`;
    } else if (cleanPath === "/project4") {
      key = "project4";
      image = `${siteUrl}/ogimage/project4.jpg`;
      pageUrl = `${siteUrl}/project4`;
    } else if (cleanPath === "/about") {
      key = "about";
      image = `${siteUrl}/ogimage/about.jpg`;
      pageUrl = `${siteUrl}/about`;
    } else if (cleanPath === "/404") {
      key = "page404";
      image = `${siteUrl}/ogimage/404.jpg`;
      pageUrl = `${siteUrl}/404`;
    } else {
      // Всё остальное — 404
      key = "page404";
      image = `${siteUrl}/ogimage/404.jpg`;
      pageUrl = `${siteUrl}/404`;
    }

    const { title, desc } = translations[key][lang] || translations[key]["en"];
    const locale = localeMap[lang];

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${pageUrl}?lang=${lang}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="${locale}" />
<meta property="og:site_name" content="${siteUrl}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${image}" />
<meta name="twitter:creator" content="@Regroz" />
<meta name="twitter:site" content="@Regroz" />
</head>
<body>
<h1>${title}</h1>
<p>${desc}</p>
</body>
</html>`;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}