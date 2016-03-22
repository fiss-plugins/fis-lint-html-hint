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
    var ignored = [],
        ignoreFiles = conf.ignoreFiles;

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

/**
 * Checks if `value` is a plain object, that isn't an object like.
 * @param  {AnyType}  arg the value to be checked.
 * @return {Boolean}  if it's a plain object, will return true.
 */
function isPlainObject(arg) {
    if (typeof arg == 'object' && Object.getPrototypeOf(arg) == Object.prototype) {
        return true
    }
    return false;
}


module.exports = function(content, file, conf) {
    if (ignore(file, conf)) {
        return;
    }
    // var colors = require('colors');
    var HTMLHint,
        messages,
        infoStr = '',
        rules = {};

    if (typeof conf.rules !== 'undefined' && !isPlainObject(conf.rules)) {
        fis.log.warn('Please check your html-hint rules, which should be a plain object. Currently using the default rules.');
    } else {
        rules = conf.rules;
    }

    HTMLHint = require("htmlhint").HTMLHint;
    messages = HTMLHint.verify(content, rules);

    if (!messages.length) {
        fis.log.info(' %s %s\n', file.id, 'pass!'.green);
        return;
    }

    messages = HTMLHint.format(messages, {
        colors: true,
        indent: 6
    });
    var errorCount = messages.length / 2;
    infoStr = messages.join('\n');

    fis.log.info(' %s %s\n%s \n ', file.id, ' fail!'.red, infoStr);
}