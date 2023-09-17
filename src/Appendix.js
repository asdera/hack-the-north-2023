import images from './images';
import Pieces from './Enums';

const chessSkins = {
    // default
    'Soilder': {type: Pieces.PAWN, set: "Default", whiteImage: images.white_pawn, blackImage: images.black_pawn, grade: "normal", 
        description: ""},
    'Sailor': {type: Pieces.ROOK, set: "Default", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'Cavalry': {type: Pieces.KNIGHT, set: "Default", whiteImage: images.white_knight, blackImage: images.black_knight, grade: "normal", 
        description: ""},
    'Medic': {type: Pieces.BISHOP, set: "Default", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'The Lieutenant': {type: Pieces.QUEEN, set: "Default", whiteImage: images.white_queen, blackImage: images.black_queen, grade: "normal", 
        description: ""},
    'The General': {type: Pieces.KING, set: "Default", whiteImage: images.white_king, blackImage: images.black_king, grade: "normal", 
        description: ""},

    // mafia
    'Debt Collector': {type: Pieces.PAWN, set: "Mafia", whiteImage: images.white_pawn, blackImage: images.black_pawn, grade: "normal", 
        description: ""},
    'Body Guard': {type: Pieces.ROOK, set: "Mafia", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'Hitman': {type: Pieces.KNIGHT, set: "Mafia", whiteImage: images.white_knight, blackImage: images.black_knight, grade: "normal", 
        description: ""},
    'Vice': {type: Pieces.BISHOP, set: "Mafia", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'The Mistress': {type: Pieces.QUEEN, set: "Mafia", whiteImage: images.white_queen, blackImage: images.black_queen, grade: "normal", 
        description: ""},
    'The Boss': {type: Pieces.KING, set: "Mafia", whiteImage: images.white_king, blackImage: images.black_king, grade: "normal", 
        description: ""},
    'The Boss': {type: Pieces.KING, set: "Mafia", whiteImage: images.white_king, blackImage: images.black_king, grade: "normal", 
        description: ""},

    // the law
    'Police': {type: Pieces.PAWN, set: "The Law", whiteImage: images.white_pawn, blackImage: images.black_pawn, grade: "normal", 
        description: ""},
    'Police Car': {type: Pieces.ROOK, set: "The Law", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'K-9': {type: Pieces.KNIGHT, set: "The Law", whiteImage: images.white_knight, blackImage: images.black_knight, grade: "normal", 
        description: ""},
    'Scholars': {type: Pieces.BISHOP, set: "The Law", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", 
        description: ""},
    'The Prosecutor': {type: Pieces.QUEEN, set: "The Law", whiteImage: images.white_queen, blackImage: images.black_queen, grade: "normal", 
        description: ""},
    'The Judge': {type: Pieces.KING, set: "The Law", whiteImage: images.white_king, blackImage: images.black_king, grade: "normal", 
        description: ""},
}


export default chessSkins;