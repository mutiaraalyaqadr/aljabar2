/*:
 * @plugindesc Tampilkan musuh dengan sprite SV Actor + animasi. Pakai <SVActorSprite:x> di Note musuh.
 * @author ChatGPT
 */

(function () {
    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function (battler) {
        _Sprite_Enemy_setBattler.call(this, battler);

        const note = battler.enemy().note;
        const match = note.match(/<SVActorSprite:(\d+)>/i);
        if (match) {
            const actorId = Number(match[1]);
            const actorData = $dataActors[actorId];

            if (actorData && actorData.battlerName) {
                const fakeActor = new Game_Actor(actorId);
                this._svEnemySprite = new Sprite_Actor(fakeActor);
                this._svEnemySprite.setActorHome(0, 0);
                this._svEnemySprite.startEntryMotion();

                this.addChild(this._svEnemySprite);

                if (this._mainSprite) this._mainSprite.visible = false;
                this._isSVEnemy = true;
            }
        }
    };

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function () {
        _Sprite_Enemy_update.call(this);
        if (this._isSVEnemy && this._svEnemySprite) {
            this._svEnemySprite.update();
        }
    };

    const _Sprite_Enemy_startMotion = Sprite_Enemy.prototype.startMotion;
    Sprite_Enemy.prototype.startMotion = function (motionType) {
        if (this._svEnemySprite) {
            this._svEnemySprite.startMotion(motionType);
        } else {
            _Sprite_Enemy_startMotion.call(this, motionType);
        }
    };

    const _Sprite_Enemy_setupDamagePopup = Sprite_Enemy.prototype.setupDamagePopup;
    Sprite_Enemy.prototype.setupDamagePopup = function () {
        if (this._svEnemySprite) {
            this._svEnemySprite.startMotion('damage');
        }
        _Sprite_Enemy_setupDamagePopup.call(this);
    };

    const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
    Sprite_Enemy.prototype.updateCollapse = function () {
        if (this._svEnemySprite) {
            this._svEnemySprite.startMotion('collapse');
        }
        _Sprite_Enemy_updateCollapse.call(this);
    };
})();
