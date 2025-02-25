const wordList = ['happy', 'calm', 'bright', 'cool', 'funny', 'smart', 'quick', 'strong', 'kind', 'brave'];

function generateUsernameOptions() {
  const options = [];
  for (let i = 0; i < 3; i++) {
    const word1 = wordList[Math.floor(Math.random() * wordList.length)];
    const word2 = wordList[Math.floor(Math.random() * wordList.length)];
    const number = Math.floor(1000 + Math.random() * 9000);
    options.push(`${word1}_${word2}_${number}`);
  }
  return options;
}

module.exports = { generateUsernameOptions };