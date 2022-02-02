const { getAllDogs } = require("./GetAllDogs")

const Dogs = async (req, res, next) => {
    const { name } = req.query;
    const AllDogs = await getAllDogs();
    try {
        if(name) {
            const auxDogs =  AllDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(auxDogs.length > 0) {
                res.status(200).json(auxDogs);
            } else {
                res.status(404).json({information:"There is no information related to the parameter"})
            }
        } else {
            res.status(200).json(AllDogs)
        }
    } catch (error) {
        next(error)
    }
}


const DogsId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const AllDogs = await getAllDogs();
        let Dog = AllDogs.find(e => e.id.toString() === id)
        if(Dog) {
            res.status(200).json(Dog)
        } else {
            res.status(404).json({information:"There is no information related to the parameter"})
        }
    } catch (error) {
        next(error)
    }
}


const DogPost = async (req, res, next) => {
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
            res.status(201).json({ info: "Dog created successfully!" })
        } catch (error) {
            next(error)
        };
    } else {
        return res.status(400).json({info:"fields without data"})
    }
}

module.exports = {
    Dogs,
    DogsId,
    DogPost
}