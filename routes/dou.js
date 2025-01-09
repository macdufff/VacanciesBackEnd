const router = require("express").Router();
const cheerio = require("cheerio");

const searchVacancies = async (query) => {
    const url = `https://jobs.dou.ua/vacancies/?search=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.text();
      const $ = cheerio.load(data);
  
      const vacancies = [];
      $(".l-vacancy").each((index, element) => {
        if (index >= 10) return false;
        const titleElement = $(element).find(".title a.vt");
        const title = titleElement.text().trim();
        const link = titleElement.attr("href");
  
        if (title && link) {
          vacancies.push({ title, link });
        }
      });
  
      return vacancies.length > 0 ? vacancies : [];
    } catch (error) {
      console.error("Error fetching vacancies:", error.message);
      throw new Error("Не вдалося завантажити вакансії");
    }
  };
  
  // Роут для отримання вакансій
  router.get("/getVacancies/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const vacancies = await searchVacancies(query);
  
      if (vacancies.length !== 0) {
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