const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { MongoClient } = require('mongodb')
const cors = require('cors')
app.use(cors());
app.get('/', (req, res) => {
    res.send("heloow");
});

let query;

const dburl = "mongodb+srv://yagnesh:yagnesh2004@speakx.xn6uw.mongodb.net/?retryWrites=true&w=majority&appName=speakx";
mongoose
    .connect(dburl)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB:', err);
    });
const client = new MongoClient(dburl);
const db = client.db("questions");
collection = db.collection("questions");


app.get('/api/search', async (req, res) => {
    const titleToSearch = req.query.title;
    try {
        await client.connect();
        const result = await collection.find({ title: { $regex: titleToSearch, $options: 'i' } }).limit(5).toArray();
        const count = await collection.countDocuments({})
        console.log(count)
        console.log(result[0].title)
        res.send(result[0].title);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


})
app.get('/api/count', async (req, res) => {
    try {
        await client.connect();
        const documents = await collection.find(query).toArray();
        let count = documents.length;
        console.log(count)
        res.json(count)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



app.get('/api/psearch', paginatedResults(), (req, res) => {
    res.json(res.paginatedResults)
})

function paginatedResults() {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
        console.log(filters)
        const title = req.query.title
        const startIndex = (page - 1) * limit
        let filterConditions = { title: { $regex: "^" + title, $options: 'i' } };

        // Add additional filters to the query
        if (filters.length > 0) {
            filterConditions = {
                ...filterConditions,
                type: { $in: filters }  // Assuming "type" is a field in your documents
            };
        }
        console.log(filterConditions)
        query = filterConditions;

        try {
            await client.connect();
            const result = await collection.find(filterConditions).limit(limit).skip(startIndex).toArray();
            res.paginatedResults = result;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}