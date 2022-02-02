const {getAllDogs} = require("./GetAllDogs")
const { Temperament } = require("../db.js");
const getTemperament = async (req, res,next) => {   
    try {
        const AllDogs = await getAllDogs();
        let temperaments = AllDogs.map((e => e.temperaments))
        temperaments = temperaments.filter(e => e !== undefined)
        temperaments = temperaments.join().split(",");
        temperaments = [...new Set (temperaments)].sort();  
        temperaments.map( e => {
            Temperament.findOrCreate(
                {
                    where: {
                        name: e.trim()
                    }
                }
            )
        })
        let allTemperaments = await Temperament.findAll();
        res.json(allTemperaments);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTemperament
}