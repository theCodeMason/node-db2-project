const Car = require('./cars-model')


const checkCarId = async (req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
    if(!car){
      next({
        status: 404,
        message: `car with id ${car} is not found`
      })
    }else{
      req.car = car
      next()
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin)
  return next({
    status: 400,
    message: 'vin is missing'
  })
  if(!req.body.make)
  return next({
    status: 400,
    message: 'make is missing'
  })
  if(!req.body.model)
  return next({
    status: 400,
    message: 'model is missing'
  })
  if(!req.body.mileage)
  return next({
    status: 400,
    message: 'mileage is missing'
  })
  next()
}

const checkVinNumberValid = (req, res, next) => {
    if(!req.body.vin){
      return next({
        status: 400,
        message: 'mileage is missing'
      })
    }

    if (typeof req.body.vin == 'string'){
        try {
            if ((req.body.vin).length === 17){
                 return {"status": 200}
            } else {
                return next({"status": 400, "message": `vin ${req.body.vin} is invalid`});
            }
        }catch (err){
            return {"status": 400, "message": `vin ${req.body.vin} is invalid`}
        }
    } else {
       return {"status": 200};
    }
}

const checkVinNumberUnique = async (req, res, next) => {
    const result = await Car.getAll();
    for (let i = 0; i < result.length; i++) {
        if (result[i].vin === req.body.vin) {
            return { "status": 400, "message": `vin ${req.body.vin} already exists` }
          }
    }
    return {"status": 200, "message": "mediocre poop"}
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}
