import { Howl } from 'howler';

const sounds = {
    pieceSelect: new Howl({
        src: [require('./utils/piece_hover.wav')]
    }),
    pieceLift: new Howl({
        src: [require('./utils/piece_lift.wav')]
    }),
    piecePlace: new Howl({
        src: [require('./utils/piece_place.wav')]
    }), 
    pieceDrop: new Howl({
        src: [require('./utils/piece_drop.wav')]
    }),
    purchaseEquipment: new Howl({
        src: [require('./utils/purchase_equipment.wav')]
    }),
    bulletHit1: new Howl({
        src: [require('./utils/bullet_hit1.wav')]
    }),
    bulletHit2: new Howl({
        src: [require('./utils/bullet_hit2.wav')]
    }),
    bulletHit3: new Howl({
        src: [require('./utils/bullet_hit3.wav')]
    }),
    bulletHit4: new Howl({
        src: [require('./utils/bullet_hit4.wav')]
    }),
    knifeStab: new Howl({
        src: [require('./utils/knife_stab.wav')]
    }),

    pistolReload: new Howl({
        src: [require('./reload/pistol_reload.wav')]
    }),
    shotgunReload: new Howl({
        src: [require('./reload/shotgun_reload.wav')]
    }),
    rifleReload: new Howl({
        src: [require('./reload/rifle_reload.wav')]
    }),
    sniperReload: new Howl({
        src: [require('./reload/sniper_reload.wav')]
    }),

    pistolFire: new Howl({
        src: [require('./fire/pistol_fire.wav')]
    }),
    shotgunFire: new Howl({
        src: [require('./fire/shotgun_fire.wav')]
    }),
    rifleFire: new Howl({
        src: [require('./fire/rifle_fire.wav')]
    }),
    sniperFire: new Howl({
        src: [require('./fire/sniper_fire.wav')]
    }),
};
  
export default sounds;