(function() {
    const MAP_ID_TITLE = 1; // Ganti sesuai map judul kamu
  
    // Buat window command khusus
    function Window_ExitCommand() {
      this.initialize.apply(this, arguments);
    }
  
    Window_ExitCommand.prototype = Object.create(Window_Command.prototype);
    Window_ExitCommand.prototype.constructor = Window_ExitCommand;
  
    Window_ExitCommand.prototype.initialize = function() {
      Window_Command.prototype.initialize.call(this, 0, 0);
      this.openness = 255;
    };
  
    Window_ExitCommand.prototype.windowWidth = function() {
      return 160;
    };
  
    Window_ExitCommand.prototype.makeCommandList = function() {
      this.addCommand('♥ Keluar', 'exit');
    };
  
    // Tambahkan ke scene map jika sedang di map judul
    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
      _Scene_Map_createAllWindows.call(this);
      if ($gameMap.mapId() === MAP_ID_TITLE) {
        this._exitWindow = new Window_ExitCommand();
        this._exitWindow.x = 0;
        this._exitWindow.y = 0;
        this._exitWindow.setHandler('exit', this.commandExitGame.bind(this));
        this.addWindow(this._exitWindow);
      }
    };
  
    Scene_Map.prototype.commandExitGame = function() {
      SoundManager.playCancel();
      SceneManager.exit();
    };
  })();
  