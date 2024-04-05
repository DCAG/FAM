const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    const shifts = [
        {time:'3h'},
        {time:'6h'},
        {time:'9h'},
        {time:'12h'}
    ]
    
    res.send(shifts)
})

module.exports = router