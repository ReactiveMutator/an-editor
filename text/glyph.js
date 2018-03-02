function Glyph(
    letter
) {
    this.letter = letter;
    this.glyphholder = null;

    return this;
}

Glyph.prototype.setActive = function () {
    if (Glyph.activeGlyph) {
        Glyph.activeGlyph.glyphholder.style.borderLeft = "";
    }

    Glyph.activeGlyph = this;
    Glyph.activeGlyph.glyphholder.style.borderLeft = "2px solid black";
};

Glyph.prototype.write = function (glyphholder) {
    this.glyphholder = glyphholder;
    glyphholder.innerHTML = "";
    glyphholder.appendChild(
        document.createTextNode(this.letter)
    );
};

Glyph.prototype.erase = function () {
    this.glyphholder.innerHTML = "";
};

Glyph.prototype.replace = function (newGlyph) {
    this.letter = newGlyph.letter;
    this.write(this.glyphholder);
    this.setActive();
};

Glyph.activeGlyph = null;
