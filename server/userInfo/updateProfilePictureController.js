import fs from 'fs';
// import {compress, compressAccurately} from 'image-conversion';

const updateProfilePictureController = async (req, res) => {
    const file = req.file
    const imageExtn = file.mimetype.split('/')[1];
    fs.renameSync(file.path, './profilePictures/' + req.body.userId + '.' + imageExtn);
    res.send('success');
}

export default updateProfilePictureController;