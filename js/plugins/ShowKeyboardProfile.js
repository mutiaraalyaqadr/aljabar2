/*:
 * @plugindesc Menambahkan tombol Panduan, Tentang, dan ♥ Keluar di title screen. Termasuk konfirmasi Ya/Tidak dengan efek blur latar belakang.
 * @author Kamu
 */

(function() {
    // ===== Scene Tambahan: Panduan & Tentang =====
  
    function Scene_PanduanKeyboard() {
      this.initialize.apply(this, arguments);
    }
  
    Scene_PanduanKeyboard.prototype = Object.create(Scene_Base.prototype);
    Scene_PanduanKeyboard.prototype.constructor = Scene_PanduanKeyboard;
  
    Scene_PanduanKeyboard.prototype.initialize = function() {
      Scene_Base.prototype.initialize.call(this);
    };
  
    Scene_PanduanKeyboard.prototype.create = function() {
      Scene_Base.prototype.create.call(this);
      const sprite = new Sprite(ImageManager.loadPicture("keyboard_guide"));
      this.addChild(sprite);
    };
  
    Scene_PanduanKeyboard.prototype.update = function() {
      Scene_Base.prototype.update.call(this);
      if (Input.isTriggered('cancel') || TouchInput.isTriggered()) {
        SoundManager.playCancel();
        SceneManager.pop();
      }
    };    
  
    function Scene_Profile() {
      this.initialize.apply(this, arguments);
    }
  
    Scene_Profile.prototype = Object.create(Scene_Base.prototype);
    Scene_Profile.prototype.constructor = Scene_Profile;
  
    Scene_Profile.prototype.initialize = function() {
      Scene_Base.prototype.initialize.call(this);
    };
  
    Scene_Profile.prototype.create = function() {
      Scene_Base.prototype.create.call(this);
      const sprite = new Sprite(ImageManager.loadPicture("profile_screen"));
      this.addChild(sprite);
    };
  
    Scene_Profile.prototype.update = function() {
      Scene_Base.prototype.update.call(this);
      if (Input.isTriggered('cancel') || TouchInput.isTriggered()) {
        SoundManager.playCancel();
        SceneManager.pop();
      }
    };    
  
    // ====== Window Konfirmasi Ya/Tidak ======
  
    function Window_ConfirmExit() {
      this.initialize.apply(this, arguments);
    }
  
    Window_ConfirmExit.prototype = Object.create(Window_Command.prototype);
    Window_ConfirmExit.prototype.constructor = Window_ConfirmExit;
  
    Window_ConfirmExit.prototype.initialize = function() {
      Window_Command.prototype.initialize.call(this, 0, 0);
      this.openness = 255;
    };
  
    Window_ConfirmExit.prototype.windowWidth = function() {
      return 240;
    };
  
    Window_ConfirmExit.prototype.makeCommandList = function() {
      this.addCommand("Ya", "yes");
      this.addCommand("Tidak", "no");
    };
  
    // ========== Modifikasi Scene_Title ==========
  
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
      _Scene_Title_create.call(this);
      this._confirmWindow = null;
    };
  
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
      _Scene_Title_createCommandWindow.call(this);
      this._commandWindow.setHandler('exit', this.commandKeluar.bind(this));
      this._commandWindow.setHandler('panduan', this.commandPanduan.bind(this));
      this._commandWindow.setHandler('profile', this.commandProfile.bind(this));
    };
  
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
      this.addCommand('♥ Permainan Baru', 'newGame');
      this.addCommand('♥ Lanjut Permainan', 'continue', this.isContinueEnabled());
      this.addCommand('♥ Panduan Bermain', 'panduan');
      this.addCommand('♥ Pengaturan', 'options');
      this.addCommand('♥ Tentang', 'profile');
      this.addCommand('♥ Keluar', 'exit');
    };        
  
    Scene_Title.prototype.commandKeluar = function() {
      SoundManager.playCancel();
      this._commandWindow.deactivate();
  
      this._confirmWindow = new Window_ConfirmExit();
      this._confirmWindow.x = (Graphics.boxWidth - this._confirmWindow.width) / 2;
      this._confirmWindow.y = (Graphics.boxHeight - this._confirmWindow.height) / 2;
      this._confirmWindow.setHandler('yes', this.confirmExitYes.bind(this));
      this._confirmWindow.setHandler('no', this.confirmExitNo.bind(this));
      this.addWindow(this._confirmWindow);
  
      // Tambah efek blur hanya ke elemen tertentu
      this._backgroundFilter = new PIXI.filters.BlurFilter();
      this._backgroundFilter.blur = 3;
  
      if (this._backSprite1) this._backSprite1.filters = [this._backgroundFilter];
      if (this._backSprite2) this._backSprite2.filters = [this._backgroundFilter];
      if (this._commandWindow) this._commandWindow.filters = [this._backgroundFilter];
  
      this._confirmWindow.select(0);
      this._confirmWindow.activate();
    };
  
    Scene_Title.prototype.confirmExitYes = function() {
      SoundManager.playOk();
      SceneManager.exit();
    };
  
    Scene_Title.prototype.confirmExitNo = function() {
      SoundManager.playCancel();
      this._confirmWindow.close();
      this._confirmWindow.deactivate();
      this.removeChild(this._confirmWindow);
  
      // Hapus efek blur dari elemen yang sebelumnya diberi filter
      if (this._backSprite1) this._backSprite1.filters = null;
      if (this._backSprite2) this._backSprite2.filters = null;
      if (this._commandWindow) this._commandWindow.filters = null;
  
      this._commandWindow.activate();
    };
  
    Scene_Title.prototype.commandPanduan = function() {
      SoundManager.playOk();
      SceneManager.push(Scene_PanduanKeyboard);
    };
  
    Scene_Title.prototype.commandProfile = function() {
      SoundManager.playOk();
      SceneManager.push(Scene_Profile);
    };
  
  })();
  