function MonospaceTextLine(
    letterWidth,
    lineHeight,
    lineLetters
) {
    this.letterWidth = letterWidth;
    this.lineHeight = lineHeight;
    this.lineLetters = lineLetters;

    this.lineGlyphsMemoized = null;
    this.glyphholdersMemoized = null;

    return this;
}

MonospaceTextLine.prototype.glyphs = function () {
    if (this.lineGlyphsMemoized) {
        return this.lineGlyphsMemoized;
    }

    var lineGlyphs = [];
    
    for (var i = 0; i < this.lineLetters.length; i++) {
        lineGlyphs[
            lineGlyphs.length
        ] = new Glyph(this.lineLetters[i]);
    }

    this.lineGlyphsMemoized = lineGlyphs;

    return this.lineGlyphsMemoized;
};

MonospaceTextLine.prototype.glyphholders = function (count) {
    if (this.glyphholdersMemoized) {
        return this.glyphholdersMemoized;
    }

    var glyphholders = [];

    for (var i = 0; i < count; i++) {
        var glyphholder = document.createElement("div");
        glyphholder.style.position = "absolute";
        glyphholder.style.width = this.letterWidth + "px";
        glyphholder.style.height = this.lineHeight + "px";
        glyphholder.style.fontSize = this.lineHeight + "px";
        glyphholder.style.fontFamily = "Monospace";
        glyphholder.style.top = 0;
        glyphholder.style.left = i * this.letterWidth + "px";
        glyphholders[
            glyphholders.length
        ] = glyphholder;
    }

    this.glyphholdersMemoized = glyphholders;
    return this.glyphholdersMemoized;
};

MonospaceTextLine.prototype.write = function (lineholder) {
    var glyphs = this.glyphs();
    var glyphholders = this.glyphholders(glyphs.length);
    for (var i = 0; i < glyphs.length; i++) {
        glyphs[i].write(glyphholders[i]);
        lineholder.appendChild(glyphholders[i]);
    }
};
