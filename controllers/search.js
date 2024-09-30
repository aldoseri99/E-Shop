const Item = require('../models/Item')

exports.search_index_get = async (req, res) => {
    try {
        const query = req.query.query
        if (!query) {
            console.log('1')
            return res.render('search/index', { items: [], message: 'Please enter a search term' })
        }

        const items = await Item.find({ name: { $regex: query, $options: 'i' } })

        if (items.length > 0) {
            console.log('2')
            res.render('search/index', { items: items, message: '' })
        } else {
            res.render('search/index', { items: [], message: 'No items found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Error while searching')
    }
}
// https://www.mongodb.com/docs/manual/reference/operator/query/regex/