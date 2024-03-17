import * as fs from 'fs';
import handlebars from 'handlebars';
const CURR_DIR = process.cwd();

const templateContents = (contents, data) => {
  const template = handlebars.compile(contents);
  return template(data);
};

const createDirectoryContents = (templatePath, newProjectPath, data) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = templateContents(fs.readFileSync(origFilePath, 'utf8'), data);

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;

      fs.writeFileSync(writePath, contents, 'utf8');
      console.log(`Created ${CURR_DIR}/${newProjectPath}/${file} 💾`);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, data);
    }
  });
};

export default createDirectoryContents;
