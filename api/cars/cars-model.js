const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const getByVin = (vin) => {
  console.log("calling from getbyvin");
  console.log(vin);
  return db('cars').where('vin', vin).first();
}

const create = (car) => {
  console.log("Calling from car");
  console.log(car);
  return db('cars').insert(car).then(([id]) => {
        return getById(id)
  })
}

const updateById = (id, car) => {
  db('cars').where('id', id).update(car)
  return getById(id)
}

const deleteById = (id) => {
  return db('cars').where('id', id).del()
}

module.exports = {
  getAll, 
  getByVin,
  getById,
  create,
  updateById,
  deleteById
}
