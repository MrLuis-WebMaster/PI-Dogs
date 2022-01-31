const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const e = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
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

router.get("/dogs", async (req, res, next) => {
    try {
        const name = req.query.name;
        const AllDogs = await getAllDogs();
        if(name) {
            let dogName = AllDogs.filter( Element => Element.name.toLowerCase() === name.toLowerCase())
            dogName ? res.status(200).send(dogName) 
                    : res.status(404).send({information:"There is no information related to the parameter"})
        } else {
            res.status(200).send(AllDogs)
        }
    } catch (error) {
        next(error)
    }
})

router.get("/dogs/search/:name", async (req,res,next)=> {
    try {
        const {name} = req.params;
        const AllDogs = await getAllDogs();
        const auxDogs =  AllDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        if(auxDogs.length > 0) {
            res.status(200).send(auxDogs);
        } else {
            res.status(404).send({information:"There is no information related to the parameter"})
        }
    } catch (error) {
        next(error)
    }
})

router.get("/dogs/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const AllDogs = await getAllDogs();
        let Dog = AllDogs.find(e => e.id.toString() === id)
        if(Dog) {
            res.status(200).send(Dog)
        } else {
            res.status(404).send({information:"There is no information related to the parameter"})
        }
    } catch (error) {
        next(error)
    }
})

router.get("/temperament", async (req, res,next) => {   
    try {
        const AllDogs = await getAllDogs();
        let temperaments = AllDogs.map((e => e.temperaments))
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
        res.send(allTemperaments);
    } catch (error) {
        next(error)
    }
  });

  router.post("/dog", async (req, res, next) => {
    const { name, height, weight, life_span, temperament} = req.body;  
    if (name && height && weight && life_span && temperament) {
        try {
            let image = "https://image.freepik.com/free-vector/cute-dog-sticking-her-tongue-out-cartoon-icon-illustration_138676-2709.jpg"  
            const newDog = await Dog.create({   
                name, 
                height, 
                weight, 
                life_span, 
                image
            })
            let temperamentsDB = await Temperament.findAll({  
                where: { name : temperament}   
            })
            await newDog.addTemperament(temperamentsDB)  
            res.status(201).send({ info: "Dog created successfully!" })
        } catch (error) {
            next(error)
        };
    } else {
        return res.status(400).json({info:"fields without data"})
    }

});

module.exports = router;
