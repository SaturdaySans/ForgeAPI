import app from './app'

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Forge-api is now running on port ${PORT}`)
})