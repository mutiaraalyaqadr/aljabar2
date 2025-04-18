/*:
 * @plugindesc Mengganti tampilan musuh dengan SV actor sprite. Pakai <SVActorSprite:x> di note.
 * @author ChatGPT
 */

(function() {
    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_setBattler.call(this, battler);

        const note = battler.enemy().note;
        const match = note.match(/<SVActorSprite:(\d+)>/i);
        if (match) {
            const actorId = Number(match[1]);
            const actor = $dataActors[actorId];
            if (actor && actor.battlerName) {
                this.bitmap = ImageManager.loadSvActor(actor.battlerName);

                this._mainSprite = new Sprite(this.bitmap);
                this._mainSprite.setFrame(0, 0, this.bitmap.width / 9, this.bitmap.height / 6);
                this.addChild(this._mainSprite);

                this.scale.x = 1;
                this.scale.y = 1;
            }
        }
    };
})();
