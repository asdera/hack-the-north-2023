import images from './images';
import Pieces from './Enums.js'

const chessSkins = {
    // default
    'Soilder': {type: Pieces.PAWN, set: "Default", whiteImage: images.white_pawn, blackImage: images.black_pawn, grade: "normal", whiteIcon: images.white_pawn_icon, blackIcon: images.black_pawn_icon},
    'Sailor': {type: Pieces.ROOK, set: "Default", whiteImage: images.white_rook, blackImage: images.black_rook, grade: "normal", whiteIcon: images.white_rook_icon, blackIcon: images.black_rook_icon},
    'Cavalry': {type: Pieces.KNIGHT, set: "Default", whiteImage: images.white_knight, blackImage: images.black_knight, grade: "normal", whiteIcon: images.white_knight_icon, blackIcon: images.black_knight_icon},
    'Medic': {type: Pieces.BISHOP, set: "Default", whiteImage: images.white_bishop, blackImage: images.black_bishop, grade: "normal", whiteIcon: images.white_bishop_icon, blackIcon: images.black_bishop_icon},
    'The Lieutenant': {type: Pieces.QUEEN, set: "Default", whiteImage: images.white_queen, blackImage: images.black_queen, grade: "normal", whiteIcon: images.white_queen_icon, blackIcon: images.black_queen_icon},
    'The General': {type: Pieces.KING, set: "Default", whiteImage: images.white_king, blackImage: images.black_king, grade: "normal", whiteIcon: images.white_king_icon, blackIcon: images.black_king_icon},

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

    // tiles
    'Default Tile': {type: Pieces.TILE, set: "Default", whiteImage: images.default_tile, blackImage: images.default_tile, grade: "normal", whiteIcon: images.default_tile, blackIcon: images.default_tile},
    'Brick Tile': {type: Pieces.TILE, set: "Mafia", whiteImage: images.white_brick_tile, blackImage: images.black_brick_tile, grade: "normal", whiteIcon: images.black_brick_tile, blackIcon: images.black_brick_tile},

}


export default chessSkins