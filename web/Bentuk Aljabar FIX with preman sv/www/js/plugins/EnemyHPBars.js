/*:
 * @plugindesc Menampilkan HP musuh di atas sprite saat battle. Fix teks kebalik, error, dan posisi beda saat rematch. Stabil!.
 * @author Kamu
 */

(function() {

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateHpBar();
    };

    Sprite_Enemy.prototype.updateHpBar = function() {
        if (!this._battler) return;

        // Pastikan gambar sudah ready sebelum buat HP Bar
        if (!this._hpBar && this.bitmap && this.bitmap.isReady()) {
            this.createHpBar();
        }

        if (!this._hpBar) return; // gambar belum siap

        const rate = this._battler.hp / this._battler.mhp;
        let color = "#00ff00";
        if (rate <= 0.25) color = "#ff4444";
        else if (rate <= 0.5) color = "#ffff00";

        this._hpBarForeground.bitmap.clear();
        this._hpBarForeground.bitmap.fillRect(0, 0, 100, 10, color);
        this._hpBarForeground.scale.x = rate;

        this._hpValue.bitmap.clear();
        const text = `${this._battler.hp} / ${this._battler.mhp}`;
        this._hpValue.bitmap.drawText(text, 0, 0, 100, 22, "center");

        this._hpBar.visible = this._battler.isAlive();
    };

    Sprite_Enemy.prototype.createHpBar = function() {
        const width = 100, height = 10;
const spacing = 4;

this._hpBar = new Sprite();

const trueHeight = (this.bitmap && this.bitmap.isReady()) ? this.bitmap.height : 144;
const anchorY = this.anchor.y || 1;

// Atur posisi HP bar relatif terhadap kepala
this._hpBar.x = -width / 2 + 100;  // geser ke kiri 10px
this._hpBar.y = -trueHeight * anchorY - 50;  // naik lebih dekat ke kepala



        const background = new Sprite(new Bitmap(width, height));
        background.bitmap.fillRect(0, 0, width, height, "#000000");
        this._hpBar.addChild(background);

        this._hpBarForeground = new Sprite(new Bitmap(width, height));
        this._hpBar.addChild(this._hpBarForeground);

        const nameSprite = new Sprite(new Bitmap(width + 40, 28));
        nameSprite.bitmap.fontSize = 20;
        nameSprite.bitmap.textColor = "#ffffff";
        nameSprite.bitmap.outlineColor = "#000000";
        nameSprite.bitmap.outlineWidth = 3;
        nameSprite.bitmap.drawText(this._battler.name(), 0, 0, nameSprite.bitmap.width, 28, "center");
        nameSprite.y = -28 - spacing;
        this._hpBar.addChild(nameSprite);

        this._hpValue = new Sprite(new Bitmap(100, 22));
        this._hpValue.bitmap.fontSize = 18;
        this._hpValue.bitmap.textColor = "#ffffff";
        this._hpValue.bitmap.outlineColor = "#000000";
        this._hpValue.bitmap.outlineWidth = 2;
        this._hpValue.y = height + spacing;
        this._hpBar.addChild(this._hpValue);

        // Pastikan HP Bar tidak kebalik walau musuh dibalik
        this._hpBar.scale.x = 1 / this.scale.x;

        this.addChild(this._hpBar);
    };

})();
