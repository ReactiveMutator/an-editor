function MonospaceText(
    letterWidth,
    lineHeight,
    lineLetters
) {
    this.letterWidth = letterWidth;
    this.lineHeight = lineHeight;
    this.lineLetters = lineLetters;

    this.cursor = null;
    this.linesMemoized = null;
    this.lineholdersMemoized = null;
}

MonospaceText.prototype.lines = function () {
    if (this.linesMemoized) {
        return this.linesMemoized;
    }

    var lines = [];

    for (var i = 0; i < this.lineLetters.length; i++) {
        var line = new MonospaceTextLine(
            this.letterWidth,
            this.lineHeight,
            this.lineLetters[i] + "\n"
        );
        lines[
            lines.length
        ] = line;
    }

    this.linesMemoized = lines;
    return this.linesMemoized;
};

MonospaceText.prototype.lineholders = function (count) {
    if (this.lineholdersMemoized) {
        return this.lineholdersMemoized;
    }
    
    var lineholders = [];

    for (var i = 0; i < count; i++) {
        var lineholder = document.createElement("div");
        lineholder.style.position = "absolute";
        lineholder.style.width = this.letterWidth * this.lineLetters[i].length + "px";
        lineholder.style.height = this.lineHeight + "px";
        lineholder.style.top = i * this.lineHeight + "px";
        lineholders[
            lineholders.length
        ] = lineholder;
    }

    this.lineholdersMemoized = lineholders;
    return this.lineholdersMemoized;
};

MonospaceText.prototype.write = function (lineholder) {
    var lines = this.lines();
    var lineholders = this.lineholders(lines.length);
    for (var i = 0; i < lines.length; i++) {
        lines[i].write(lineholders[i]);
        lineholder.appendChild(lineholders[i]);
    }
};

MonospaceText.prototype.newline = function (cursor) {
    this.linesMemoized = null;
    this.lineholdersMemoized = null;

    this.lineLetters = [].concat(
        this.lineLetters.slice(0, cursor.lineNumber),
        [
            this.lineLetters[cursor.lineNumber].slice(0, cursor.lineLetterNumber),
            this.lineLetters[cursor.lineNumber].slice(
                cursor.lineLetterNumber, this.lineLetters[cursor.lineNumber].length
            )
        ],
        this.lineLetters.slice(cursor.lineNumber + 1, this.lineLetters.length)
    );
};

MonospaceText.prototype.backspace = function (cursor) {
    this.linesMemoized = null;
    this.lineholdersMemoized = null;
    
    var position = cursor.position;

    if (position.lineLetterNumber === 0) {
        if (position.lineNumber === 0) {
            return {
                lineNumber: 0,
                lineLetterNumber: 0
            };
        } else {
            var newLineLetterNumber = this.lineLetters[position.lineNumber - 1].length;
            this.lineLetters = [].concat(
                this.lineLetters.slice(0, position.lineNumber - 1),
                [
                    this.lineLetters[
                        position.lineNumber - 1
                    ].substr(0, this.lineLetters[
                        position.lineNumber - 1
                    ].length - 1) + this.lineLetters[position.lineNumber]
                ],
                this.lineLetters.slice(position.lineNumber + 1, this.lineLetters.length)
            );
            return {
                lineNumber: position.lineNumber - 1,
                lineLetterNumber: newLineLetterNumber
            };
        }
    } else {
        this.lineLetters[position.lineNumber] = 
            this.lineLetters[
                position.lineNumber
            ].substr(0, position.lineLetterNumber - 1) + 
                this.lineLetters[
                    position.lineNumber
                ].substr(
                    position.lineLetterNumber, 
                    this.lineLetters[position.lineNumber].length
                );

                return {
                    lineNumber: position.lineNumber,
                    lineLetterNumber: position.lineLetterNumber - 1
                };
    }
};

MonospaceText.prototype.beginOfLine = function (lineNumber) {
    return {
        lineNumber: lineNumber,
        lineLetterNumber: 0
    };
};

MonospaceText.prototype.endOfLine = function (lineNumber) {
    var that = this;
    return {
        lineNumber: lineNumber,
        lineLetterNumber: that.lineLetters[lineNumber].length
    };
}

MonospaceText.prototype.insert = function (cursor, letter) {
    this.linesMemoized = null;
    this.lineholdersMemoized = null;

    this.lineLetters[cursor.lineNumber] = this.lineLetters[
        cursor.lineNumber
    ].substr(0, cursor.lineLetterNumber) + letter + this.lineLetters[
        cursor.lineNumber
    ].slice(
        cursor.lineLetterNumber,
        this.lineLetters[cursor.lineNumber].length
    );
};
