// Tambahkan di dalam IIFE plugin kamu (misalnya di ShowKeyboardGuide.js)
const _Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _Scene_Title_create.call(this);

    // Tambah gambar Profile
    const profileIcon = new Sprite(ImageManager.loadPicture("profile_icon")); // ganti dengan nama file PNG kamu
    profileIcon.x = 10;   // Jarak dari kiri
    profileIcon.y = 10;   // Jarak dari atas
    profileIcon.scale.set(0.5, 0.5); // Skala jika perlu dikecilkan
    profileIcon.interactive = true;
    profileIcon.buttonMode = true;

    profileIcon.setClickHandler = function(handler) {
        this._clickHandler = handler;
    };
    profileIcon.on("pointerup", function() {
        if (this._clickHandler) this._clickHandler();
    });

    profileIcon.setClickHandler(function() {
        SceneManager.push(Scene_Profile); // Ganti dengan scene yang ingin kamu panggil, atau bikin Scene_Profile baru
    });

    this.addChild(profileIcon);
};
