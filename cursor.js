function EditorCursor(
    editor, 
    position
) {
    this.editor = editor;
    this.position = position;
}

EditorCursor.prototype.left = function () {
    if (this.editor.setCursor(this.position.lineNumber, this.position.lineLetterNumber - 1)) {
        this.position.lineLetterNumber -= 1;
    }
};

EditorCursor.prototype.up = function () {
    if (this.editor.setCursor(this.position.lineNumber - 1, this.position.lineLetterNumber)) {
        this.position.lineNumber -= 1;
    }
};

EditorCursor.prototype.right = function () {
    if (this.editor.setCursor(this.position.lineNumber, this.position.lineLetterNumber + 1)) {
        this.position.lineLetterNumber += 1;
    }
};

EditorCursor.prototype.down = function () {
    if (this.editor.setCursor(this.position.lineNumber + 1, this.position.lineLetterNumber)) {
        this.position.lineNumber += 1;
    }
};

EditorCursor.prototype.newline = function () {
    if (this.editor.setCursor(this.position.lineNumber + 1, 0)) {
        this.position.lineNumber += 1;
        this.position.lineLetterNumber = 0;
    }
};

EditorCursor.prototype.backspace = function () {
    var newLineLetterNumber = this.position.lineLetterNumber - 1;
    var newLineNumber = this.position.lineNumber;
    if (newLineLetterNumber < 0) {
        newLineLetterNumber = this.position.lineLetterNumber;
        newLineNumber = this.position.lineNumber - 1;
        if (newLineNumber < 0) {
            newLineNumber = 0;
            newLineLetterNumber = 0;
        }
    }
    if (this.editor.setCursor(newLineNumber, newLineLetterNumber)) {
        this.position.lineNumber = newLineNumber;
        this.position.lineLetterNumber = newLineLetterNumber;
    }
};

EditorCursor.prototype.set = function (lineNumber, lineLetterNumber) {
    if (this.editor.setCursor(lineNumber, lineLetterNumber)) {
        this.position.lineNumber = lineNumber;
        this.position.lineLetterNumber = lineLetterNumber;
    }
};
