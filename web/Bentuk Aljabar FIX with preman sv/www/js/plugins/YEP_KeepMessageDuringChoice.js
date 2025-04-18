/*:
 * @plugindesc Keeps Show Text message visible during Show Choices (Compatible with YEP_MessageCore) — by ChatGPT
 * @author ChatGPT
 *
 * @help
 * Letakkan plugin ini DI BAWAH YEP_MessageCore
 * Lalu pakai event biasa:
 * ◆Show Text: "T-t-tapi.."
 * ◆Show Choices: Lawan / Balik
 *
 * Teks akan tetap terlihat saat pilihan muncul.
 */

(function() {
  const _Window_Message_doesContinue = Window_Message.prototype.doesContinue;
  Window_Message.prototype.doesContinue = function() {
    // Jangan lanjut ke message berikutnya jika Show Choices aktif
    if ($gameMessage.isChoice() && !$gameMessage.isBusy()) return false;
    return _Window_Message_doesContinue.call(this);
  };

  const _Window_Message_isEndOfText = Window_Message.prototype.isEndOfText;
  Window_Message.prototype.isEndOfText = function(textState) {
    // Tahan agar window tetap terbuka saat pilihan muncul
    if ($gameMessage.isChoice()) return false;
    return _Window_Message_isEndOfText.call(this, textState);
  };

  // Hindari window nge-clear pesan saat pilihan muncul
  const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    if ($gameMessage.isChoice()) return;
    _Window_Message_terminateMessage.call(this);
  };
})();
