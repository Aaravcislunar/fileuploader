const express = require('express');
const multer = require('multer');
const Client = require('ssh2-sftp-client');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const sftp = new Client();

    await sftp.connect({
      host: '192.168.101.10',
      port: '22',
      username: 'USERNAME',
      password: 'aarav@123'
    });
    const remotePath = '/upload';

    await sftp.put(file.path, `${remotePath}/${file.originalname}`);
    await sftp.end();

    res.send('File uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file.');
  }
});

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});






