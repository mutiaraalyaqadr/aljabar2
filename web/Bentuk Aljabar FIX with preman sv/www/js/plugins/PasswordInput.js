//=============================================================================
// PasswordInput.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 n2naokun(柊菜緒)
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.5 2017/11/03 英数字を処理するときに半角を使用するように修正
// 1.0.4 2017/10/28 競合が発生する可能性のあるバグを修正
// 1.0.3 2017/10/19 バグ修正
// 1.0.2 2017/10/19 書き忘れていた処理を追加
// 1.0.1 2017/10/19 説明を一部修正
// 1.0.0 2017/10/19 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/n2naokun/
// [GitHub] : https://github.com/n2naokun/
//=============================================================================

/*:
 * @plugindesc aslinya plugin buat input password, saya edit dikit wkwkw
 * @author n2naokun(Nao Hiiragi) & ilmania(ga di kredit juga gapapa, asal author aslinya aja)
 *
 * @help
 *
 * command
 * PasswordInput variable maxCharacter
 * example:
 * PasswordInput 1 6
 *
 * terms of service:
 * Can be modified and redistributed without the permission of the author, and may be used in any form (commercial, use prohibited under the age of 18, etc.)
 There are no restrictions on *.
 * This plugin is now yours.
 */

"use strict"; //厳格なエラーチェック

(function (_global) {
  //プラグインコマンド定義
  var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    switch (command) {
      case "PasswordInput":
        var maxLength = Number(args[1]);
        SceneManager.push(Scene_Password);
        SceneManager.prepareNextScene(maxLength, Number(args[0]));
    }
    Game_Interpreter_pluginCommand.call(this, command, args);
  };
})(this);

//Scene_nameの継承と処理変更
function Scene_Password() {
  this.initialize.apply(this, arguments);
}

Scene_Password.prototype = Object.create(Scene_Name.prototype);

Scene_Password.prototype.constructor = Scene_Password;
Scene_Password.prototype.initialize = function () {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Password.prototype.prepare = function (maxLength, switchId) {
  this._maxLength = maxLength;
  //this._passWord = passWord;
  this._switchId = switchId;
};

Scene_Password.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createEditWindow();
  this.createInputWindow();
};

Scene_Password.prototype.createEditWindow = function () {
  this._editWindow = new Window_PasswordEdit(this._maxLength);
  this.addWindow(this._editWindow);
};

Scene_Password.prototype.createInputWindow = function () {
  this._inputWindow = new Window_PasswordInput(this._editWindow);
  this._inputWindow.setHandler("ok", this.onInputOk.bind(this));
  this.addWindow(this._inputWindow);
};

Scene_Password.prototype.onInputOk = function () {
  $gameVariables.setValue(this._switchId, this._editWindow.name());
  delete this._actor;
  this.popScene();
};

//Window_NameEditの継承と処理変更
function Window_PasswordEdit() {
  this.initialize.apply(this, arguments);
}

Window_PasswordEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_PasswordEdit.prototype.constructor = Window_PasswordEdit;

Window_PasswordEdit.prototype.initialize = function (maxLength) {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = (Graphics.boxWidth - width) / 2;
  var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this._name = "";
  this._index = this._name.length;
  this._maxLength = maxLength;
  this._defaultName = this._name;
  this.deactivate();
  this.refresh();
};

Window_PasswordEdit.prototype.refresh = function () {
  this.contents.clear();
  for (var i = 0; i < this._maxLength; i++) {
    this.drawUnderline(i);
  }
  for (var j = 0; j < this._name.length; j++) {
    this.drawChar(j);
  }
  var rect = this.itemRect(this._index);
  this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_PasswordEdit.prototype.left = function () {
  var nameCenter = this.contentsWidth() / 2;
  var nameWidth = this._maxLength * this.charWidth();
  return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
};

//Window_NameInputの継承と処理変更
function Window_PasswordInput() {
  this.initialize.apply(this, arguments);
}
Window_PasswordInput.prototype = Object.create(Window_NameInput.prototype);
Window_PasswordInput.prototype.constructor = Window_PasswordInput;

Window_PasswordInput.prototype.onNameOk = function () {
  SoundManager.playOk();
  this.callOkHandler();
};

Window_PasswordInput.prototype.table = function () {
  if ($gameSystem.isJapanese()) {
    return [
      Window_NameInput.JAPAN1,
      Window_NameInput.JAPAN2,
      Window_PasswordInput.JAPAN3,
    ];
  } else if ($gameSystem.isRussian()) {
    return [Window_NameInput.RUSSIA];
  } else {
    return [Window_NameInput.LATIN1, Window_NameInput.LATIN2];
  }
};

Window_PasswordInput.JAPAN3 = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "a",
  "b",
  "c",
  "d",
  "e",
  "F",
  "G",
  "H",
  "I",
  "J",
  "f",
  "g",
  "h",
  "i",
  "j",
  "K",
  "L",
  "M",
  "N",
  "O",
  "k",
  "l",
  "m",
  "n",
  "o",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "p",
  "q",
  "r",
  "s",
  "t",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "u",
  "v",
  "w",
  "x",
  "y",
  "Z",
  "[",
  "]",
  "^",
  "_",
  "z",
  "{",
  "}",
  "|",
  "~",
  "0",
  "1",
  "2",
  "3",
  "4",
  "!",
  "#",
  "$",
  "%",
  "&",
  "5",
  "6",
  "7",
  "8",
  "9",
  "(",
  ")",
  "*",
  "+",
  "-",
  "/",
  "=",
  "@",
  "<",
  ">",
  ":",
  ";",
  " ",
  "かな",
  "決定",
];
