function errorHandling (comparer) {
	if(comparer.match(/[^a-z]/) == null)
		return true;
	else
		return false;

};

module.exports = {errorHandling};