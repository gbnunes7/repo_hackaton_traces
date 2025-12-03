function getUserName(user) {
    return user.name.toUpperCase();
  }
  
  function processUser(user) {
    const name = getUserName(user);
    console.log(`Processing: ${name}`);
  }
  
  const user = null;
  processUser(user);