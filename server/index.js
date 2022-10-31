//Initialize env path
dotenv.config({
    path: '../.env'
})


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))
console.log(__dirname)


// Your API routes go here

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})