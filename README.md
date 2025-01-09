

### README

# Vacancy Search API

This project is a Node.js-based API that scrapes job vacancies from different platforms and provides a unified interface for retrieving the information.

## Features

- **Vacancy Search from Multiple Platforms**:
  - [Djinni](https://djinni.co)
  - [DOU](https://dou.ua)
  - [Work.ua](https://work.ua)
- **RESTful Endpoints**: 
  - Retrieve job postings based on user queries.
- **Cross-Origin Resource Sharing**: Enabled via `cors` for secure API integration.
- **Error Handling**: Robust error handling for network and scraping issues.

---

## Requirements

- Node.js (v16 or higher)
- NPM (v8 or higher)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   nodemon app.js
   ```

---

## Usage

### API Endpoints

1. **Djinni Vacancies**
   - **URL**: `/api/djin/search-vacancies/:query`
   - **Method**: `GET`
   - **Query Parameters**:
     - `pages` (optional): Number of pages to fetch (default is 1).
   - **Example**:
     ```bash
     curl http://localhost:1001/api/djin/search-vacancies/developer?pages=2
     ```

2. **DOU Vacancies**
   - Endpoint under development.

3. **Work.ua Vacancies**
   - Endpoint under development.

### Example Response
**Success** (`200`):
```json
{
  "vacancies": [
    "💼 Frontend Developer - https://djinni.co/job/12345/",
    "💼 Backend Developer - https://djinni.co/job/67890/"
  ]
}
```

**Not Found** (`404`):
```json
{
  "message": "Вакансії за вашим запитом не знайдено."
}
```

**Error** (`500`):
```json
{
  "message": "Виникла помилка під час отримання вакансій."
}
```

---

## Project Structure

```
.
├── routes/
│   ├── djiin.js      # Route for Djinni scraping
│   ├── dou.js        # Route for DOU scraping
│   ├── workua.js     # Route for Work.ua scraping
├── app.js          # Main server file
├── package.json      # Node.js dependencies
└── README.md         # Project documentation
```

---

## Dependencies

- **Express**: Web framework.
- **Cors**: Enable cross-origin requests.
- **Cheerio**: HTML parser for scraping.
- **Node-Fetch**: To fetch web pages for scraping.

---

## Development

- **Add New Platforms**: Extend functionality by adding new routes for different platforms in the `routes/` folder.
- **Error Handling**: Enhance error handling for specific scenarios like rate limits or changes in platform structure.

---

