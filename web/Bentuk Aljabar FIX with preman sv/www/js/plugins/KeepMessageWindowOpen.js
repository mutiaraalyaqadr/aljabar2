/*:
 * @plugindesc Keep message window open when choices appear (forcefully). Keeps previous text visible. Compatible with YEP_MessageCore.
 * @author ChatGPT
 */

(function() {
  // Override to force the message window to stay open
  const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
  Scene_Message.prototype.createAllWindows = function() {
    _Scene_Message_createAllWindows.call(this);
    this._messageWindow.keepShowing = false;
  };

  const _Window_Message_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function() {
    this.keepShowing = false;
    _Window_Message_startMessage.call(this);
  };

  const _Window_Message_startChoice = Window_Message.prototype.startChoice;
  Window_Message.prototype.startChoice = function() {
    _Window_Message_startChoice.call(this);
    this.keepShowing = true; // force message stay visible
  };

  const _Window_Message_updateClose = Window_Message.prototype.updateClose;
  Window_Message.prototype.updateClose = function() {
    if (this.keepShowing) return false; // prevent closing
    return _Window_Message_updateClose.call(this);
  };

  const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    if (this.keepShowing) return; // prevent clearing message
    _Window_Message_terminateMessage.call(this);
  };
})();
