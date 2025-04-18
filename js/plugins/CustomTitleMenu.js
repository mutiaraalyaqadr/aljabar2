/*:
 * @plugindesc Menu Title MV - Tampilan minimalis: rata kiri, tanpa highlight biru, dan panah ▶ untuk item aktif.
 */

(function() {
    Window_TitleCommand.prototype.standardPadding = function() {
        return 12; // Biar teks gak nempel ke pinggir
    };

    Window_TitleCommand.prototype.windowWidth = function() {
        return 240;
    };

    Window_TitleCommand.prototype.lineHeight = function() {
        return 36;
    };

    // Hilangkan background highlight biru
    Window_TitleCommand.prototype.drawItemBackground = function(index) {
        // Kosong supaya gak ngegambar latar
    };

    // Hilangkan latar belakang kotak putih (jika perlu)
    Window_TitleCommand.prototype.updateBackOpacity = function() {
        this.backOpacity = 0;
    };

    // Gambar teks dengan rata kiri dan panah ▶ saat dipilih
    Window_TitleCommand.prototype.drawItem = function(index) {
        const rect = this.itemRect(index);
        const text = this.commandName(index);
        const isSelected = index === this._index;

        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));

        const displayText = isSelected ? "▶ " + text : "   " + text;

        // Gunakan padding manual dan lebar lebih kecil biar gak nabrak
        const x = rect.x + 12;
        const width = this.contentsWidth() - 24;

        this.drawText(displayText, x, rect.y, width, "left");
    };
})();
