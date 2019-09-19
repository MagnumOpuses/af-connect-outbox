module.exports = (req, res) => {
    const body = req.body;
    console.log(`from inside sessionToken module ${body}`)
    res.send(body);
}