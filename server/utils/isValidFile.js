const isValidFile = file => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/bmp' || file.mimetype === 'image/png') {
        return true;
    }
    else {
        return false;
    }
}

module.exports = isValidFile;