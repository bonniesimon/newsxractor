const axios = require('axios').default;


const API_KEY = "7c05f0db88f64b74bdd1bf3b0a8e3329";
const country = 'in'

const fecthData = async () => {
    try{

        const response = await axios.get(`https://newsapi.org/v2/everything?q=india&pageSize=10&apiKey=7c05f0db88f64b74bdd1bf3b0a8e3329`); 
        console.log(response.data);
    }catch(err){
        console.log(err);
    }
    // const data = response.json();
}
const init = () => {    
    fecthData();
}


init();