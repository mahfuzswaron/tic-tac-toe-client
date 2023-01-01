export const pronoun = (name, currentUser) => name === currentUser ? "Your" : name + "'s";
export const partner = (users, currentUser) => users.find(u => u !== currentUser);
export const getPiece = (pieces, currentUser) => {
    let piece;
    for (const p in pieces) {
        if (pieces[p] === currentUser) {
            piece = p
        }
    }
    return piece
}
// getPiece({ x: "mahfuz", o: "sadia" }, "sadia")