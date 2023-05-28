# Smakuj Zdrowo
demo: https://smakuj-zdrowo.onrender.com/

### Website created for purpose of participating in Zwolnieni z Teorii and realizing a social project.

Zwolnieni z Teorii is an internet platform established by the renowned Zwolnieni z Teorii Foundation. This platform enables participants to develop and execute their own social projects with the aim of effecting significant positive change within their communities.
Participants hone their leadership and project management skills. Through this platform, individuals are provided with a wealth of resources, mentoring, and support to aid them in their project development. This includes access to a comprehensive range of educational materials, mentor guidance and a supportive network.


## Story
I created a team of pepole who wanted to work on the social project. We came to conclusion that the subject of our project will be about promoting healthy eating habits and giving examples of easy, delicious and nutritious meals. We wanted to create a website, where users could find recipes for healthy meals. I was responsible for leading a project and building a website.

Developing this website proved to be an invaluable experience for me as it provided an opportunity to enhance my skills in Node.js and Express. I designed and implemented a small-scale API to handle recipes and articles displayed on the website. This project was a significant milestone in my learning journey as it was my first production-level website. The project achieved a wide audience that time thanks to a professional marketing and commitment of the entire team. 

## Screenshots

<img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685205077/github%20docs/smakujzdrowo/smakujzdrowo-hero_x2timr.png' width=900 height=454/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685205076/github%20docs/smakujzdrowo/smakujzdrowo-home_t4uurj.png' width=900 height=454/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685205078/github%20docs/smakujzdrowo/smakujzdrowo-photo_yisk1k.png' width=900 height=454/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685205074/github%20docs/smakujzdrowo/smakujzdrowo-bmr_biwafe.png' width=900 height=454/>


## Main Features
* searching recipes by category or name
* articles section 
* info about project and faq
* BMI calculator
* BMR calculator


## Technology used
- JavaScript
- ejs
- Express
- MongoDB
- Postman
- Figma
- mongoose
- slugify
- dotenv

## API Endpoints

### Recipes 
- Create a recipe - `POST /api/v1/recipes`
- Get all recipes - `GET /api/v1/recipes`
- Get a recipe by slug - `GET /api/v1/recipes/:slug`
- Get a recipes by name - `GET /api/v1/recipes?name=${recipeName}`
- Get recipes (pagination) - `GET /api/v1/recipes?page=${pageNumber}&limit=${limitNumber}`
- Get recipes by category - `GET /api/v1/recipes?category=${category}`

### Articles
- Create an article - `POST /api/v1/articles`
- Get all articles - `GET /api/v1/articles`
- Get an article - `GET /api/v1/articles/:slug`

