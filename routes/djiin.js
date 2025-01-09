const express = require("express"); // Імпорт express
const cheerio = require("cheerio");
const router = express.Router();

async function searchVacanciesDjiin(query, pages = 1) {
    const baseUrl = 'https://djinni.co/jobs/?search=';
    let vacancies = [];
  
    for (let page = 1; page <= pages; page++) {
      const url = `${baseUrl}${encodeURIComponent(query)}&page=${page}`;
      
      try {
        const response = await fetch(url);
        if (response.status !== 200) {
          return { message: "Не вдалося завантажити вакансії. Спробуйте пізніше." };
        }
  
        const body = await response.text();
        const $ = cheerio.load(body);
  
        // Шукаємо всі елементи вакансій
        const vacancyItems = $('li.mb-4');
        if (vacancyItems.length > 0) {
          vacancyItems.each((index, item) => {
            const titleTag = $(item).find('h3.mb-2');
            if (titleTag) {
              const title = titleTag.text().trim();
              const linkTag = $(item).find('a.job-item__title-link');
              if (linkTag) {
                const link = "https://djinni.co" + linkTag.attr('href');
                vacancies.push(`💼 ${title} - ${link}`);
              }
            }
          });
        }
      } catch (error) {
        console.error('Error fetching vacancies:', error);
        return { message: "Не вдалося завантажити вакансії. Спробуйте пізніше." };
      }
    }
  
    return vacancies.length > 0 ? { vacancies } : { message: "Вакансії за вашим запитом не знайдено." };
  }
  
  router.get("/search-vacancies/:query", async (req, res) => {
    try {
      const query = req.params.query;  
      const pages = parseInt(req.query.pages) || 1;  
  
      const vacancies = await searchVacanciesDjiin(query, pages);  
  
      if (vacancies.vacancies && vacancies.vacancies.length > 0) {
        res.status(200).json({ vacancies: vacancies.vacancies });
      } else {
        res.status(404).json({ message: "Вакансії за вашим запитом не знайдено." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Виникла помилка під час отримання вакансій." });
    }
  });
module.exports = router;
