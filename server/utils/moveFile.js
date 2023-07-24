const moveFile = async (file, path) => {
    let UAvatarFileName = null;

    UAvatarFileName = `${new Date().getTime()}-${file.name.replaceAll(' ', '-')}`;
    await file.mv(`${path}/${UAvatarFileName}`);

    return UAvatarFileName;
}

module.exports = moveFile;