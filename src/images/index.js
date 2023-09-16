// library for all the images

const images = {
    empty: require('./utils/empty.png'),
    predict: require('./utils/predict.png'),
    pieceShadow: require('./utils/piece_shadow.png'),

    defaultIcon: require('./icons/default_icon.png'),

    white_king: require('./white_pieces/white_king_default.png'),
    white_queen: require('./white_pieces/white_queen_default.png'),
    white_bishop: require('./white_pieces/white_bishop_default.png'),
    white_knight: require('./white_pieces/white_knight_default.png'),
    white_rook: require('./white_pieces/white_rook_default.png'),
    white_pawn: require('./white_pieces/white_pawn_default.png'),

    black_king: require('./black_pieces/black_king_default.png'),
    black_queen: require('./black_pieces/black_queen_default.png'),
    black_bishop: require('./black_pieces/black_bishop_default.png'),
    black_knight: require('./black_pieces/black_knight_default.png'),
    black_rook: require('./black_pieces/black_rook_default.png'),
    black_pawn: require('./black_pieces/black_pawn_default.png'),

    pistol_avatar: require('./equipment_avatar/pistol_avatar.png'),
    shotgun_avatar: require('./equipment_avatar/shotgun_avatar.png'),
    sniper_avatar: require('./equipment_avatar/sniper_avatar.png'),

    pistol_active: require('./equipment_active/pistol_active.png'),
    sniper_active: require('./equipment_active/sniper_active.png'),
    shotgun_active: require('./equipment_active/shotgun_active.png'),
    rifle_active: require('./equipment_active/rifle_active.png'),
    white_shield_active: require('./equipment_active/white_shield.png'),
    black_shield_active: require('./equipment_active/black_shield.png'),
}

export default images;
