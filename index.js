const axios = require('axios').default;


const API_KEY = "7c05f0db88f64b74bdd1bf3b0a8e3329";
const country = 'in'

const postSheety = async (title, content, publishedAt, url) => {
    try{
        /**
         * !Sheety wants the body to be covered in a root object with name of endpoint, here sheet1
         */
        const response = await axios.post('https://v2-api.sheety.co/aa990fdf93ff1104c7f79ed60b30c09c/newsxcraper/sheet1',{
            sheet1:{
                title,
                publishedAt,
                content,
                url
            }
        })
        console.log(response);
    }catch(err){
        console.log("At postSheety",err);
    }
}
const fecthData = async () => {
    try{
        const response = await axios.get(`https://newsapi.org/v2/everything?q=india&pageSize=2&apiKey=7c05f0db88f64b74bdd1bf3b0a8e3329`); 
        // response.data.articles is an *array
        // const {title, publishedAt, content, url} = response.data.articles[0];
        response.data.articles.map(article => {
            const {title, content, publishedAt, url} = article;
            postSheety(title, content, publishedAt, url);
        })
    }catch(err){
        console.log(err);
    }
    // const data = response.json();
}
const init = () => {    
    fecthData();
}


init();


/**
 * TODO:Use shetty api to save the articles. Use it as a DB
 * TODO:Use some ml to extract only usefull part of the article. a.k.a make the article lesser in size.
 */