function getUserName(user) {
    return user.name.toUpperCase();
  }
  
    if (!user) {
        return '';
    }
    return user.name.toUpperCase();
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