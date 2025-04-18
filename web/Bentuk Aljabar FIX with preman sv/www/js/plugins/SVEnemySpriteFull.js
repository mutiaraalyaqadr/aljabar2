/*:
 * @plugindesc Ganti tampilan musuh dengan sprite SV actor animasi. Pakai <SVActorSprite:x> di note musuh.
 * @author ChatGPT
 * 
 * @help
 * Tambahkan notetag berikut pada bagian note musuh:
 * <SVActorSprite:x>
 * 
 * x = ID dari actor yang gambarnya mau dipakai.
 * 
 * Contoh:
 * Jika ingin musuh pakai sprite actor ID 2,
 * maka di note musuh tambahkan:
 * <SVActorSprite:2>
 * 
 * Pastikan gambar SV Actor (contoh: Package1_1.png)
 * tersedia di folder img/sv_actors/
 */

(function () {
    console.log(">>> SVEnemySpriteFull Plugin Loaded");

    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function (battler) {
        _Sprite_Enemy_setBattler.call(this, battler);

        const note = battler.enemy().note;
        const match = note.match(/<SVActorSprite:(\d+)>/i);

        if (match) {
            const actorId = Number(match[1]);
            const actor = $dataActors[actorId];
            console.log(`>>> SVActorSprite ditemukan. Actor ID: ${actorId}`);

            if (actor && actor.battlerName) {
                this._svBattler = new Sprite_Actor(battler);
                this._svBattler.setBattler(actor);
                this._svBattler.setActorHome(0, 0);
                this._svBattler.startEntryMotion();

                this.addChild(this._svBattler);
                if (this._mainSprite) this._mainSprite.visible = false;

                console.log(">>> SV Enemy Sprite berhasil dimunculkan.");
            } else {
                console.warn(`>>> Aktor ID ${actorId} tidak memiliki battlerName.`);
            }
        } else {
            console.log(">>> Tidak ada notetag <SVActorSprite:x> pada musuh.");
        }
    };

    // Saat musuh menyerang
    const _Sprite_Enemy_startMotion = Sprite_Enemy.prototype.startMotion;
    Sprite_Enemy.prototype.startMotion = function (motionType) {
        if (this._svBattler) {
            this._svBattler.startMotion(motionType);
        } else {
            _Sprite_Enemy_startMotion.call(this, motionType);
        }
    };

    // Saat musuh kena damage
    const _Sprite_Enemy_setupDamagePopup = Sprite_Enemy.prototype.setupDamagePopup;
    Sprite_Enemy.prototype.setupDamagePopup = function () {
        if (this._svBattler) {
            this._svBattler.startMotion('damage');
        }
        _Sprite_Enemy_setupDamagePopup.call(this);
    };

    // Saat musuh mati (collapse)
    const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
    Sprite_Enemy.prototype.updateCollapse = function () {
        if (this._svBattler) {
            this._svBattler.startMotion('collapse');
        }
        _Sprite_Enemy_updateCollapse.call(this);
    };
})();
