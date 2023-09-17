import {firestore, updateSkinCollection} from "./CreateFirebaseEngine";
import {doc, onSnapshot} from "firebase/firestore";

// TODO: Use builder pattern and move this constant to shared file
const USERS_PATH = "users";

class SkinCollectionEngine {

    #user_id;
    #unsub;
    constructor(user_id, skin_collection_did_update) {
        this.#user_id = user_id;

        this.#unsub = onSnapshot(doc(firestore, USERS_PATH + "/" + user_id + "/loot/skins"), (doc) => {
            if (doc.exists) {
                skin_collection_did_update(doc.data());
            }
        });
    }

    async addSkinToCollection(skin){
        try {
            await updateSkinCollection({
                skin: skin,
            })
        } catch (error) {
            switch (error.code) {
                case "functions/invalid-argument":
                    throw new Error("invalid argument");
                default:
                    throw new Error("internal")
            }
        }
    }

    destructor() {
        this.#unsub();
    }

}

export default SkinCollectionEngine;