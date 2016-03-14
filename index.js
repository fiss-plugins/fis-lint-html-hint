/**
 * @description a html linter for fiss based on htmlhint
 */


/**
 * eslint ignore
 * @param  {Object} fiel  An instence of File class, which defined in fis.
 * @param  {Object} conf  The lint conf.
 * @return {Boolean}      If current subpath matchs one of ignore pattern, return true.
 */
function ignore(file, conf) {
    var ignored = [], ignoreFiles = conf.ignoreFiles;

    if (ignoreFiles) {
        if (typeof ignoreFiles === 'string' || fis.util.is(ignoreFiles, 'RegExp')) {
            ignored = [ignoreFiles];
        } else if (fis.util.is(ignoreFiles, 'Array')) {
            ignored = ignoreFiles;
        }
        delete conf.ignoreFiles;
    }
    if (ignored) {
        for (var i = 0, len = ignored.length; i < len; i++) {
            if (fis.util.filter(file.subpath, ignored[i])) {
                return true;
            }
        }
    }

    return false;
}

module.exports = function(content, file, conf) {
	if (ignore(file, conf)) {
		return;
	}
	var colors = require('colors');
	var HTMLHint,
		messages,
		infoStr = '';

	HTMLHint  = require("htmlhint").HTMLHint;
	if (conf.filename) {
		delete conf.filename;
	}
	messages = HTMLHint.verify(content, conf);

	if (messages.length) {
		messages = HTMLHint.format(messages, {
	                        colors: true,
	                        indent: 6
	                    });
	}

	var errorCount = messages.length/2;
	infoStr = messages.join('\n');

	fis.log.info(' %s\n%s \n ', file.id, infoStr);
}