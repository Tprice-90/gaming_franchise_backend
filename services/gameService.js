const db = require('./db');
const helper = require('../helper/helper');
const config = require('../config');

// Display all game entries
async function getAll() {
    const rows = await db.query(`SELECT id, title, description, creator, imgURL, type, tags FROM games`);

    const data = helper.emptyOrRows(rows);

    return data;
}

// Add a game
async function create(game) {
    const result = await db.query(
        `INSERT INTO games (title, description, creator, imgURL, type, tags)
        VALUES
        (${game.title}, ${game.description}, ${game.creator}, ${game.imgURL}, ${game.type}, ${game.tags})`
    );

    let message = 'Error creating game entry';

    if(result.affectedRows) {
        message = 'Game Successfully added!';
    }

    return {message};
}

// Update game entry
async function update(id, game) {
    const result = await db.query(
        `UPDATE games
        SET title=${game.title}, description=${game.description}, creator=${game.creator}, imgURL=${game.imgURL}, type=${game.type}, tags=${game.tags}
        WHERE id=${id}`
    );

    let message = 'Error updating game entry';

    if(result.affectedRows) {
        message = 'Game entry successfully updated!';
    }

    return {message};
}

// DELETE game from database
async function remove(id) {
    const result = await db.query(
        `DELETE FROM games where id=${id}`
    );

    let message = 'Error deleting game entry';

    if(result.affectedRows) {
        message = 'Game successfully deleted from database!';
    }

    return {message};
}

module.exports = {getAll, create, update, remove};