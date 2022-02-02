const axios = require("axios");
const { Dog,Temperament } = require("../db.js");

const {
    YOUR_API_KEY,
  } = process.env;

const getApiInfo = async () => {
    const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={${YOUR_API_KEY}}`);
    let apiInfo = await dogApi.data.map((dog) => {  
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric, 
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image.url,
            temperaments: dog.temperament,
        };
    });
    return apiInfo;
};
const getDbInfo = async () => {
    return await Dog.findAll({            
        include: {
            model: Temperament,                        
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
}
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const dbInfoaux = await dbInfo.map( dog => {
        let aux =(dog.temperaments.map( e => e.name)).join(", ")
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height, 
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            temperaments: aux
        }
    })
    const totalInfo = apiInfo.concat(dbInfoaux);
    return totalInfo;
}

module.exports = {
    getAllDogs
}