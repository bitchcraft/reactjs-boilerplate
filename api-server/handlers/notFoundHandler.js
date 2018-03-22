const notFoundHandler = (req, res) => {
	res.status(404).send('404 - File not found');
};

export default notFoundHandler;
