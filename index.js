const axios = require('axios').default;


const API_KEY = "7c05f0db88f64b74bdd1bf3b0a8e3329";
const country = 'in'
const DATE = '2020-04-06';

const postSheety = async (title, content, publishedAt, url) => {
    try{
        /**
         * !Sheety wants the body to be covered in a root object with name of endpoint, here sheet1
         */
        const response = await axios.post('https://v2-api.sheety.co/aa990fdf93ff1104c7f79ed60b30c09c/newsxractor/sheet1',{
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
/**
 * 
 * @param {String} date 
 */
const fecthData = async (date) => {
    try{
        const response = await axios.get(`https://newsapi.org/v2/everything?q=india&from=${date}&to=${date}&pageSize=2&apiKey=7c05f0db88f64b74bdd1bf3b0a8e3329`); 
        // response.data.articles is an *array
        // const {title, publishedAt, content, url} = response.data.articles[0];
        response.data.articles.map(article => {
            const {title, content, publishedAt, url} = article;
            postSheety(title, content, publishedAt, url);
        })
    }catch(err){
        console.log('At fecthData',err);
    }
}

/**
 * * Source : https://stackoverflow.com/questions/5116657/javascript-how-can-i-increment-a-date-string-yyyy-mm-dd-by-1-day
 * @param {String} date_str
 */
function incr_date(date_str){
  let parts = date_str.split("-");
  let dt = new Date(
    parseInt(parts[0], 10),      // year
    parseInt(parts[1], 10) - 1,  // month (starts with 0)
    parseInt(parts[2], 10)       // date
  );
  dt.setDate(dt.getDate() + 1);
  parts[0] = "" + dt.getFullYear();
  parts[1] = "" + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = "0" + parts[1];
  }
  parts[2] = "" + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = "0" + parts[2];
  }
  return parts.join("-");
}

const init = () => {   
    // let newDate = DATE;
    // while(newDate !== '2020-04-30'){
    //     newDate = incr_date(newDate);
    //     console.log(newDate);

    // }
    fecthData(DATE);
}


init();


/**
 * TODO:Use shetty api to save the articles. Use it as a DB
 * TODO:Use some ml to extract only usefull part of the article. a.k.a make the article lesser in size.
 */