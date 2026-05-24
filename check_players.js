const fs = require('fs');
const files = ['lib/api-mock.ts', 'lib/team-details.ts'];
const players = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /name:\s*['"]([^'"]+)['"].*?image:\s*['"]([^'"]+)['"]/gs;
  let match;
  while ((match = regex.exec(content)) !== null) {
    players.add(match[1] + ' -> ' + match[2]);
  }
});
console.log(Array.from(players).join('\n'));
