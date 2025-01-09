const express = require("express"); // Імпорт express
const router = require("express").Router();
const cheerio = require("cheerio");


async function searchVacanciesWorkUa(query, pages) {
    const baseUrl = 'https://www.work.ua/jobs-remote-qa/';
    let vacancies = [];
  
    for (let page = 1; page <= pages; page++) {
      const url = `${baseUrl}?search=${encodeURIComponent(query)}&page=${page}`;
  
      try {
        const response = await fetch(url);
        
        if (response.status !== 200) {
          return []; 
        }
  
        const body = await response.text();
        const $ = cheerio.load(body);
  
        const vacancyItems = $('.card.card-hover.card-visited.wordwrap.job-link.js-job-link-blank.mt-sm.sm\\:mt-lg');
  
        vacancyItems.each((index, item) => {
          const titleTag = $(item).find('h2.my-0');
          if (titleTag) {
            const linkTag = titleTag.find('a[href][title]');
            if (linkTag) {
              const title = linkTag.attr('title').trim();  
              const link = 'https://www.work.ua' + linkTag.attr('href');  
              vacancies.push(`💼 ${title} - ${link}`);
            }
          }
        });
  
      } catch (error) {
        console.error("Error fetching vacancies:", error);
        return []; 
      }
    }
  
    return vacancies; 
  }
  
  // Роутер для пошуку вакансій через GET
  router.get("/search-vacancies/:query", async (req, res) => {
    try {
      const query = req.params.query;  
      const pages = parseInt(req.query.pages) || 1;  
  
      const vacancies = await searchVacanciesWorkUa(query, pages);  
  
      if (vacancies.length > 0) {
        res.status(200).json({ vacancies });
      } else {
        res.status(404).json({ message: "Вакансії за вашим запитом не знайдено." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Виникла помилка під час отримання вакансій." });
    }
  });
module.exports = router;