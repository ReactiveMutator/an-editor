function MonospaceTextEditor(
    textConfig,
    text
) {
    this.text = new MonospaceText(
        textConfig.letterWidth, 
        textConfig.lineHeight, 
        text
    );
    
    this.cursor = new EditorCursor(this, {
        lineNumber: 0,
        lineLetterNumber: 0
    });

    this.editorHolder = null;

    return this;
}

MonospaceTextEditor.prototype.insert = function (letter) {
    this.text.insert(this.cursor.position, letter);
    this.editorHolder.innerHTML = "";
    this.text.write(this.editorHolder);
    this.cursor.right();
};

MonospaceTextEditor.prototype.newline = function () {
    this.text.newline(this.cursor.position);
    this.editorHolder.innerHTML = "";
    this.text.write(this.editorHolder);
    this.cursor.newline();
};

MonospaceTextEditor.prototype.backspace = function () {
    var newCursorPosition = this.text.backspace(this.cursor);
    this.editorHolder.innerHTML = "";
    this.text.write(this.editorHolder);
    this.cursor.set(
        newCursorPosition.lineNumber, 
        newCursorPosition.lineLetterNumber
    );
};

MonospaceTextEditor.prototype.endOfLine = function () {
    var newCursorPosition = this.text.endOfLine(this.cursor.position.lineNumber);
    this.cursor.set(
        newCursorPosition.lineNumber,
        newCursorPosition.lineLetterNumber
    );
};

MonospaceTextEditor.prototype.beginOfLine = function () {
    var newCursorPosition = this.text.beginOfLine(this.cursor.position.lineNumber);
    this.cursor.set(
        newCursorPosition.lineNumber,
        newCursorPosition.lineLetterNumber
    );
}

MonospaceTextEditor.prototype.edit = function (editorHolder) {
    this.editorHolder = editorHolder;
    this.text.write(this.editorHolder);

    this.setCursor(this.cursor);

    var that = this;

    addEventListener('keypress', function (event) {
        switch (event.keyCode) {
            case 38:
                that.cursor.up();
                break;
            case 40:
                that.cursor.down();
                break;
            case 37:
                that.cursor.left();
                break;
            case 39:
                that.cursor.right();
                break;
            case 13:
                that.newline();
                break;
            case 8:
                that.backspace();
                break;
            case 35:
                that.endOfLine();
                break;
            case 36:
                that.beginOfLine();
                break;
        }
    }, false);

    addEventListener('keypress', function (event) {
        if (event.charCode) {
            var letter = String.fromCharCode(event.charCode);
            that.insert(letter);
        }
    }, false);
};

MonospaceTextEditor.prototype.setCursor = function (lineNumber, lineLetterNumber) {
    var lines = this.text.lines();
    if (lines[lineNumber]) {
        var glyphs = lines[lineNumber].glyphs();
        if (glyphs[lineLetterNumber]) {
            glyphs[lineLetterNumber].setActive();
            return true;
        } else {
            glyphs[glyphs.length - 1].setActive();
            return true;
        }
    }
    return false;
};
