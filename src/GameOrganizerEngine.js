import { firestore } from './CreateFirebaseEngine.js'
import { collection, addDoc, query, where, getDocs, or } from "firebase/firestore";

// TODO: Use builder pattern
const GAMES_PATH = "games";

class GameOrganizerEngine {

    #user_id;
    constructor(user_id) {
        this.#user_id = user_id;
    }

    async createGame() {
        return addDoc(collection(firestore, GAMES_PATH), {
            white: this.#user_id,
            black: "hLoqPZzIUiW8oxWDHKy3mjAWmKB3", // hardcode the user j927chen@uwaterloo.ca as the opponent for now
            white_moves: true,
            pieces: [
                {type: 'rook', color: 'black', position: 'A8', status: true, idx: 0, weapon: "Knife", vest: false, canCastle: true},
                {type: 'knight', color: 'black', position: 'B8', status: true, idx: 1, weapon: "Knife", vest: false},
                {type: 'bishop', color: 'black', position: 'C8', status: true, idx: 2, weapon: "Knife", vest: false},
                {type: 'queen', color: 'black', position: 'D8', status: true, idx: 3, weapon: "Knife", vest: false},
                {type: 'king', color: 'black', position: 'E8', status: true, idx: 4, weapon: "Knife", vest: false, canCastle: true},
                {type: 'bishop', color: 'black', position: 'F8', status: true, idx: 5, weapon: "Knife", vest: false},
                {type: 'knight', color: 'black', position: 'G8', status: true, idx: 6, weapon: "Knife", vest: false},
                {type: 'rook', color: 'black', position: 'H8', status: true, idx: 7, weapon: "Knife", vest: false, canCastle: true},
                {type: 'pawn', color: 'black', position: 'A7', status: true, idx: 8, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'B7', status: true, idx: 9, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'C7', status: true, idx: 10, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'D7', status: true, idx: 11, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'E7', status: true, idx: 12, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'F7', status: true, idx: 13, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'G7', status: true, idx: 14, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'black', position: 'H7', status: true, idx: 15, weapon: "Knife", vest: false},
                {type: 'rook', color: 'white', position: 'A1', status: true, idx: 16, weapon: "Knife", vest: false, canCastle: true},
                {type: 'knight', color: 'white', position: 'B1', status: true, idx: 17, weapon: "Knife", vest: false},
                {type: 'bishop', color: 'white', position: 'C1', status: true, idx: 18, weapon: "Knife", vest: false},
                {type: 'queen', color: 'white', position: 'D1', status: true, idx: 19, weapon: "Knife", vest: false},
                {type: 'king', color: 'white', position: 'E1', status: true, idx: 20, weapon: "Knife", vest: false, canCastle: true},
                {type: 'bishop', color: 'white', position: 'F1', status: true, idx: 21, weapon: "Knife", vest: false},
                {type: 'knight', color: 'white', position: 'G1', status: true, idx: 22, weapon: "Knife", vest: false},
                {type: 'rook', color: 'white', position: 'H1', status: true, idx: 23, weapon: "Knife", vest: false, canCastle: true},
                {type: 'pawn', color: 'white', position: 'A2', status: true, idx: 24, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'B2', status: true, idx: 25, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'C2', status: true, idx: 26, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'D2', status: true, idx: 27, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'E2', status: true, idx: 28, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'F2', status: true, idx: 29, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'G2', status: true, idx: 30, weapon: "Knife", vest: false},
                {type: 'pawn', color: 'white', position: 'H2', status: true, idx: 31, weapon: "Knife", vest: false}],
            piece_update: []
        }).then(docRef=> {
            return docRef.id; // game id
        }).catch(error => {
            throw new Error("cannot create game");
        })
    }

    async findGame() {
        const games_reference= collection(firestore, GAMES_PATH);
        const q = query(games_reference, or(where("white", "==", this.#user_id), where('black', '==', this.#user_id)));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return this.createGame()
        }
        let game_id = ""
        querySnapshot.forEach((doc) => {
            game_id = doc.id;
        });
        return game_id;
    }
}

export default GameOrganizerEngine;