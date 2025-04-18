/*:
 * @plugindesc [FIX] Sinkronkan posisi target serang musuh dengan sprite yang bergerak (untuk Animated SV Enemies) — tanpa ganggu animasi.
 * @author Kamu
 */

(function() {
    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);

        // Kalau enemy ini pakai animasi SV, sinkronkan posisi target
        if (this._enemy && this._enemy.isAnimatedSVEnemy && this._enemy.isAnimatedSVEnemy()) {
            // Update posisi logika (target) agar sama dengan sprite-nya
            this._battler._screenX = this.x;
            this._battler._screenY = this.y;
        }
    };
})();
