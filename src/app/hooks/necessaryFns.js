export const pronoun = (name, currentUser) => name === currentUser ? "you" : name;
export const partner = (users, currentUser) => users.find(u => u !== currentUser);