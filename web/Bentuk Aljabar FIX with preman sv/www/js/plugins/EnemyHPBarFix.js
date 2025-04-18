/*:
 * @plugindesc Memastikan HP Bar musuh muncul kembali di setiap awal battle. Fix untuk plugin EnemyHPBars.js.
 * @author ChatGPT
 */

(() => {
    // Simpan original Scene_Battle.prototype.start
    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);

        // Refresh ulang HP bar musuh
        if (this._spriteset && this._spriteset._enemySprites) {
            this._spriteset._enemySprites.forEach(sprite => {
                if (sprite._enemy && sprite.createHpBar) {
                    // Hapus bar lama (kalau ada)
                    if (sprite._hpBar) {
                        sprite.removeChild(sprite._hpBar);
                        sprite._hpBar = null;
                    }

                    // Panggil lagi method createHpBar dari plugin aslinya
                    sprite.createHpBar();
                }
            });
        }
    };
})();
