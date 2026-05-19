const fs = require('fs');
const path = './src/content/blog/storytelling-comunidade.md';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  /description:.*$/m,
  'description: "O público percebe quando está sendo tratado como número. Aprenda a criar comunidade com storytelling."',
);
fs.writeFileSync(path, content, 'utf8');
console.log('Feito!');
