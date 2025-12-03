function getUserName(user) {
    if (!user) {
      return '';
    }
    return user.name.toUpperCase();
  }
  
  function processUser(userId) {
    const user = getUserById(userId);
    return getUserName(user);
  }
  
  function getUserById(id) {
    const users = {
      '1': { name: 'João' },
      '2': { name: 'Maria' }
    };
    return users[id];
  }
  
  processUser('999');
  
  module.exports = { processUser, getUserName };