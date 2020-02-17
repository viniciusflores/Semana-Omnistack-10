const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports ={
  async index(req, res) {
    const {latitude,longitude, techs} = req.query

    const techAsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {
        $in: techAsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000,
        }
      }
    })

    return res.json({ devs })

  },
}