import { m as gu } from './_getPrototype-aecc109d.js';
import { g as Tu } from './_commonjsHelpers-de833af9.js';
var Fu = {},
  X = {},
  Cu = { exports: {} };
(function () {
  function e(n) {
    if (n == null) return !1;
    switch (n.type) {
      case 'ArrayExpression':
      case 'AssignmentExpression':
      case 'BinaryExpression':
      case 'CallExpression':
      case 'ConditionalExpression':
      case 'FunctionExpression':
      case 'Identifier':
      case 'Literal':
      case 'LogicalExpression':
      case 'MemberExpression':
      case 'NewExpression':
      case 'ObjectExpression':
      case 'SequenceExpression':
      case 'ThisExpression':
      case 'UnaryExpression':
      case 'UpdateExpression':
        return !0;
    }
    return !1;
  }
  function u(n) {
    if (n == null) return !1;
    switch (n.type) {
      case 'DoWhileStatement':
      case 'ForInStatement':
      case 'ForStatement':
      case 'WhileStatement':
        return !0;
    }
    return !1;
  }
  function i(n) {
    if (n == null) return !1;
    switch (n.type) {
      case 'BlockStatement':
      case 'BreakStatement':
      case 'ContinueStatement':
      case 'DebuggerStatement':
      case 'DoWhileStatement':
      case 'EmptyStatement':
      case 'ExpressionStatement':
      case 'ForInStatement':
      case 'ForStatement':
      case 'IfStatement':
      case 'LabeledStatement':
      case 'ReturnStatement':
      case 'SwitchStatement':
      case 'ThrowStatement':
      case 'TryStatement':
      case 'VariableDeclaration':
      case 'WhileStatement':
      case 'WithStatement':
        return !0;
    }
    return !1;
  }
  function s(n) {
    return i(n) || (n != null && n.type === 'FunctionDeclaration');
  }
  function D(n) {
    switch (n.type) {
      case 'IfStatement':
        return n.alternate != null ? n.alternate : n.consequent;
      case 'LabeledStatement':
      case 'ForStatement':
      case 'ForInStatement':
      case 'WhileStatement':
      case 'WithStatement':
        return n.body;
    }
    return null;
  }
  function F(n) {
    var f;
    if (n.type !== 'IfStatement' || n.alternate == null) return !1;
    f = n.consequent;
    do {
      if (f.type === 'IfStatement' && f.alternate == null) return !0;
      f = D(f);
    } while (f);
    return !1;
  }
  Cu.exports = {
    isExpression: e,
    isStatement: i,
    isIterationStatement: u,
    isSourceElement: s,
    isProblematicIfStatement: F,
    trailingStatement: D,
  };
})();
var vu = Cu.exports,
  Eu = { exports: {} };
(function () {
  var e, u, i, s, D, F;
  (u = {
    NonAsciiIdentifierStart:
      /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    NonAsciiIdentifierPart:
      /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  }),
    (e = {
      NonAsciiIdentifierStart:
        /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
      NonAsciiIdentifierPart:
        /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
    });
  function n(p) {
    return 48 <= p && p <= 57;
  }
  function f(p) {
    return (
      (48 <= p && p <= 57) || (97 <= p && p <= 102) || (65 <= p && p <= 70)
    );
  }
  function x(p) {
    return p >= 48 && p <= 55;
  }
  i = [
    5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202,
    8239, 8287, 12288, 65279,
  ];
  function T(p) {
    return (
      p === 32 ||
      p === 9 ||
      p === 11 ||
      p === 12 ||
      p === 160 ||
      (p >= 5760 && i.indexOf(p) >= 0)
    );
  }
  function I(p) {
    return p === 10 || p === 13 || p === 8232 || p === 8233;
  }
  function _(p) {
    if (p <= 65535) return String.fromCharCode(p);
    var W = String.fromCharCode(Math.floor((p - 65536) / 1024) + 55296),
      K = String.fromCharCode(((p - 65536) % 1024) + 56320);
    return W + K;
  }
  for (s = new Array(128), F = 0; F < 128; ++F)
    s[F] =
      (F >= 97 && F <= 122) || (F >= 65 && F <= 90) || F === 36 || F === 95;
  for (D = new Array(128), F = 0; F < 128; ++F)
    D[F] =
      (F >= 97 && F <= 122) ||
      (F >= 65 && F <= 90) ||
      (F >= 48 && F <= 57) ||
      F === 36 ||
      F === 95;
  function E(p) {
    return p < 128 ? s[p] : u.NonAsciiIdentifierStart.test(_(p));
  }
  function y(p) {
    return p < 128 ? D[p] : u.NonAsciiIdentifierPart.test(_(p));
  }
  function m(p) {
    return p < 128 ? s[p] : e.NonAsciiIdentifierStart.test(_(p));
  }
  function B(p) {
    return p < 128 ? D[p] : e.NonAsciiIdentifierPart.test(_(p));
  }
  Eu.exports = {
    isDecimalDigit: n,
    isHexDigit: f,
    isOctalDigit: x,
    isWhiteSpace: T,
    isLineTerminator: I,
    isIdentifierStartES5: E,
    isIdentifierPartES5: y,
    isIdentifierStartES6: m,
    isIdentifierPartES6: B,
  };
})();
var ou = Eu.exports,
  lu = { exports: {} };
(function () {
  var e = ou;
  function u(E) {
    switch (E) {
      case 'implements':
      case 'interface':
      case 'package':
      case 'private':
      case 'protected':
      case 'public':
      case 'static':
      case 'let':
        return !0;
      default:
        return !1;
    }
  }
  function i(E, y) {
    return !y && E === 'yield' ? !1 : s(E, y);
  }
  function s(E, y) {
    if (y && u(E)) return !0;
    switch (E.length) {
      case 2:
        return E === 'if' || E === 'in' || E === 'do';
      case 3:
        return E === 'var' || E === 'for' || E === 'new' || E === 'try';
      case 4:
        return (
          E === 'this' ||
          E === 'else' ||
          E === 'case' ||
          E === 'void' ||
          E === 'with' ||
          E === 'enum'
        );
      case 5:
        return (
          E === 'while' ||
          E === 'break' ||
          E === 'catch' ||
          E === 'throw' ||
          E === 'const' ||
          E === 'yield' ||
          E === 'class' ||
          E === 'super'
        );
      case 6:
        return (
          E === 'return' ||
          E === 'typeof' ||
          E === 'delete' ||
          E === 'switch' ||
          E === 'export' ||
          E === 'import'
        );
      case 7:
        return E === 'default' || E === 'finally' || E === 'extends';
      case 8:
        return E === 'function' || E === 'continue' || E === 'debugger';
      case 10:
        return E === 'instanceof';
      default:
        return !1;
    }
  }
  function D(E, y) {
    return E === 'null' || E === 'true' || E === 'false' || i(E, y);
  }
  function F(E, y) {
    return E === 'null' || E === 'true' || E === 'false' || s(E, y);
  }
  function n(E) {
    return E === 'eval' || E === 'arguments';
  }
  function f(E) {
    var y, m, B;
    if (E.length === 0 || ((B = E.charCodeAt(0)), !e.isIdentifierStartES5(B)))
      return !1;
    for (y = 1, m = E.length; y < m; ++y)
      if (((B = E.charCodeAt(y)), !e.isIdentifierPartES5(B))) return !1;
    return !0;
  }
  function x(E, y) {
    return (E - 55296) * 1024 + (y - 56320) + 65536;
  }
  function T(E) {
    var y, m, B, p, W;
    if (E.length === 0) return !1;
    for (W = e.isIdentifierStartES6, y = 0, m = E.length; y < m; ++y) {
      if (((B = E.charCodeAt(y)), 55296 <= B && B <= 56319)) {
        if (
          (++y, y >= m || ((p = E.charCodeAt(y)), !(56320 <= p && p <= 57343)))
        )
          return !1;
        B = x(B, p);
      }
      if (!W(B)) return !1;
      W = e.isIdentifierPartES6;
    }
    return !0;
  }
  function I(E, y) {
    return f(E) && !D(E, y);
  }
  function _(E, y) {
    return T(E) && !F(E, y);
  }
  lu.exports = {
    isKeywordES5: i,
    isKeywordES6: s,
    isReservedWordES5: D,
    isReservedWordES6: F,
    isRestrictedWord: n,
    isIdentifierNameES5: f,
    isIdentifierNameES6: T,
    isIdentifierES5: I,
    isIdentifierES6: _,
  };
})();
var Su = lu.exports;
(function () {
  (X.ast = vu), (X.code = ou), (X.keyword = Su);
})();
var H = {},
  J = {};
const Nu = 'doctrine',
  wu = 'JSDoc parser',
  bu = 'https://github.com/eslint/doctrine',
  Ru = 'lib/doctrine.js',
  Ou = '3.0.0',
  _u = { node: '>=6.0.0' },
  Pu = { lib: './lib' },
  Iu = ['lib'],
  ku = [
    {
      name: 'Nicholas C. Zakas',
      email: 'nicholas+npm@nczconsulting.com',
      web: 'https://www.nczonline.net',
    },
    {
      name: 'Yusuke Suzuki',
      email: 'utatane.tea@gmail.com',
      web: 'https://github.com/Constellation',
    },
  ],
  Lu = 'eslint/doctrine',
  Mu = {
    coveralls: '^3.0.1',
    dateformat: '^1.0.11',
    eslint: '^1.10.3',
    'eslint-release': '^1.0.0',
    linefix: '^0.1.1',
    mocha: '^3.4.2',
    'npm-license': '^0.3.1',
    nyc: '^10.3.2',
    semver: '^5.0.3',
    shelljs: '^0.5.3',
    'shelljs-nodecli': '^0.1.1',
    should: '^5.0.1',
  },
  Uu = 'Apache-2.0',
  Wu = {
    pretest: 'npm run lint',
    test: 'nyc mocha',
    coveralls: 'nyc report --reporter=text-lcov | coveralls',
    lint: 'eslint lib/',
    'generate-release': 'eslint-generate-release',
    'generate-alpharelease': 'eslint-generate-prerelease alpha',
    'generate-betarelease': 'eslint-generate-prerelease beta',
    'generate-rcrelease': 'eslint-generate-prerelease rc',
    'publish-release': 'eslint-publish-release',
  },
  Vu = { esutils: '^2.0.2' },
  Ku = {
    name: Nu,
    description: wu,
    homepage: bu,
    main: Ru,
    version: Ou,
    engines: _u,
    directories: Pu,
    files: Iu,
    maintainers: ku,
    repository: Lu,
    devDependencies: Mu,
    license: Uu,
    scripts: Wu,
    dependencies: Vu,
  };
function $u(e, u) {
  if (!e) throw new Error(u || 'unknown assertion error');
}
var ju = $u;
(function () {
  var e;
  (e = Ku.version), (J.VERSION = e);
  function u(s) {
    (this.name = 'DoctrineError'), (this.message = s);
  }
  (u.prototype = (function () {
    var s = function () {};
    return (s.prototype = Error.prototype), new s();
  })()),
    (u.prototype.constructor = u),
    (J.DoctrineError = u);
  function i(s) {
    throw new u(s);
  }
  (J.throwError = i), (J.assert = ju);
})();
(function () {
  var e, u, i, s, D, F, n, f, x, T, I, _;
  (x = X),
    (T = J),
    (e = {
      NullableLiteral: 'NullableLiteral',
      AllLiteral: 'AllLiteral',
      NullLiteral: 'NullLiteral',
      UndefinedLiteral: 'UndefinedLiteral',
      VoidLiteral: 'VoidLiteral',
      UnionType: 'UnionType',
      ArrayType: 'ArrayType',
      RecordType: 'RecordType',
      FieldType: 'FieldType',
      FunctionType: 'FunctionType',
      ParameterType: 'ParameterType',
      RestType: 'RestType',
      NonNullableType: 'NonNullableType',
      OptionalType: 'OptionalType',
      NullableType: 'NullableType',
      NameExpression: 'NameExpression',
      TypeApplication: 'TypeApplication',
      StringLiteralType: 'StringLiteralType',
      NumericLiteralType: 'NumericLiteralType',
      BooleanLiteralType: 'BooleanLiteralType',
    }),
    (u = {
      ILLEGAL: 0,
      DOT_LT: 1,
      REST: 2,
      LT: 3,
      GT: 4,
      LPAREN: 5,
      RPAREN: 6,
      LBRACE: 7,
      RBRACE: 8,
      LBRACK: 9,
      RBRACK: 10,
      COMMA: 11,
      COLON: 12,
      STAR: 13,
      PIPE: 14,
      QUESTION: 15,
      BANG: 16,
      EQUAL: 17,
      NAME: 18,
      STRING: 19,
      NUMBER: 20,
      EOF: 21,
    });
  function E(r) {
    return (
      '><(){}[],:*|?!='.indexOf(String.fromCharCode(r)) === -1 &&
      !x.code.isWhiteSpace(r) &&
      !x.code.isLineTerminator(r)
    );
  }
  function y(r, t, c, A) {
    (this._previous = r),
      (this._index = t),
      (this._token = c),
      (this._value = A);
  }
  (y.prototype.restore = function () {
    (F = this._previous),
      (D = this._index),
      (n = this._token),
      (f = this._value);
  }),
    (y.save = function () {
      return new y(F, D, n, f);
    });
  function m(r, t) {
    return _ && (r.range = [t[0] + I, t[1] + I]), r;
  }
  function B() {
    var r = i.charAt(D);
    return (D += 1), r;
  }
  function p(r) {
    var t,
      c,
      A,
      a = 0;
    for (c = r === 'u' ? 4 : 2, t = 0; t < c; ++t)
      if (D < s && x.code.isHexDigit(i.charCodeAt(D)))
        (A = B()), (a = a * 16 + '0123456789abcdef'.indexOf(A.toLowerCase()));
      else return '';
    return String.fromCharCode(a);
  }
  function W() {
    var r = '',
      t,
      c,
      A,
      a,
      l;
    for (t = i.charAt(D), ++D; D < s; )
      if (((c = B()), c === t)) {
        t = '';
        break;
      } else if (c === '\\')
        if (((c = B()), x.code.isLineTerminator(c.charCodeAt(0))))
          c === '\r' && i.charCodeAt(D) === 10 && ++D;
        else
          switch (c) {
            case 'n':
              r += `
`;
              break;
            case 'r':
              r += '\r';
              break;
            case 't':
              r += '	';
              break;
            case 'u':
            case 'x':
              (l = D), (a = p(c)), a ? (r += a) : ((D = l), (r += c));
              break;
            case 'b':
              r += '\b';
              break;
            case 'f':
              r += '\f';
              break;
            case 'v':
              r += '\v';
              break;
            default:
              x.code.isOctalDigit(c.charCodeAt(0))
                ? ((A = '01234567'.indexOf(c)),
                  D < s &&
                    x.code.isOctalDigit(i.charCodeAt(D)) &&
                    ((A = A * 8 + '01234567'.indexOf(B())),
                    '0123'.indexOf(c) >= 0 &&
                      D < s &&
                      x.code.isOctalDigit(i.charCodeAt(D)) &&
                      (A = A * 8 + '01234567'.indexOf(B()))),
                  (r += String.fromCharCode(A)))
                : (r += c);
              break;
          }
      else {
        if (x.code.isLineTerminator(c.charCodeAt(0))) break;
        r += c;
      }
    return t !== '' && T.throwError('unexpected quote'), (f = r), u.STRING;
  }
  function K() {
    var r, t;
    if (((r = ''), (t = i.charCodeAt(D)), t !== 46)) {
      if (((r = B()), (t = i.charCodeAt(D)), r === '0')) {
        if (t === 120 || t === 88) {
          for (
            r += B();
            D < s && ((t = i.charCodeAt(D)), !!x.code.isHexDigit(t));

          )
            r += B();
          return (
            r.length <= 2 && T.throwError('unexpected token'),
            D < s &&
              ((t = i.charCodeAt(D)),
              x.code.isIdentifierStartES5(t) &&
                T.throwError('unexpected token')),
            (f = parseInt(r, 16)),
            u.NUMBER
          );
        }
        if (x.code.isOctalDigit(t)) {
          for (
            r += B();
            D < s && ((t = i.charCodeAt(D)), !!x.code.isOctalDigit(t));

          )
            r += B();
          return (
            D < s &&
              ((t = i.charCodeAt(D)),
              (x.code.isIdentifierStartES5(t) || x.code.isDecimalDigit(t)) &&
                T.throwError('unexpected token')),
            (f = parseInt(r, 8)),
            u.NUMBER
          );
        }
        x.code.isDecimalDigit(t) && T.throwError('unexpected token');
      }
      for (; D < s && ((t = i.charCodeAt(D)), !!x.code.isDecimalDigit(t)); )
        r += B();
    }
    if (t === 46)
      for (
        r += B();
        D < s && ((t = i.charCodeAt(D)), !!x.code.isDecimalDigit(t));

      )
        r += B();
    if (t === 101 || t === 69)
      if (
        ((r += B()),
        (t = i.charCodeAt(D)),
        (t === 43 || t === 45) && (r += B()),
        (t = i.charCodeAt(D)),
        x.code.isDecimalDigit(t))
      )
        for (
          r += B();
          D < s && ((t = i.charCodeAt(D)), !!x.code.isDecimalDigit(t));

        )
          r += B();
      else T.throwError('unexpected token');
    return (
      D < s &&
        ((t = i.charCodeAt(D)),
        x.code.isIdentifierStartES5(t) && T.throwError('unexpected token')),
      (f = parseFloat(r)),
      u.NUMBER
    );
  }
  function eu() {
    var r, t;
    for (f = B(); D < s && E(i.charCodeAt(D)); ) {
      if (((r = i.charCodeAt(D)), r === 46)) {
        if (D + 1 >= s) return u.ILLEGAL;
        if (((t = i.charCodeAt(D + 1)), t === 60)) break;
      }
      f += B();
    }
    return u.NAME;
  }
  function L() {
    var r;
    for (F = D; D < s && x.code.isWhiteSpace(i.charCodeAt(D)); ) B();
    if (D >= s) return (n = u.EOF), n;
    switch (((r = i.charCodeAt(D)), r)) {
      case 39:
      case 34:
        return (n = W()), n;
      case 58:
        return B(), (n = u.COLON), n;
      case 44:
        return B(), (n = u.COMMA), n;
      case 40:
        return B(), (n = u.LPAREN), n;
      case 41:
        return B(), (n = u.RPAREN), n;
      case 91:
        return B(), (n = u.LBRACK), n;
      case 93:
        return B(), (n = u.RBRACK), n;
      case 123:
        return B(), (n = u.LBRACE), n;
      case 125:
        return B(), (n = u.RBRACE), n;
      case 46:
        if (D + 1 < s) {
          if (((r = i.charCodeAt(D + 1)), r === 60))
            return B(), B(), (n = u.DOT_LT), n;
          if (r === 46 && D + 2 < s && i.charCodeAt(D + 2) === 46)
            return B(), B(), B(), (n = u.REST), n;
          if (x.code.isDecimalDigit(r)) return (n = K()), n;
        }
        return (n = u.ILLEGAL), n;
      case 60:
        return B(), (n = u.LT), n;
      case 62:
        return B(), (n = u.GT), n;
      case 42:
        return B(), (n = u.STAR), n;
      case 124:
        return B(), (n = u.PIPE), n;
      case 63:
        return B(), (n = u.QUESTION), n;
      case 33:
        return B(), (n = u.BANG), n;
      case 61:
        return B(), (n = u.EQUAL), n;
      case 45:
        return (n = K()), n;
      default:
        return x.code.isDecimalDigit(r)
          ? ((n = K()), n)
          : (T.assert(E(r)), (n = eu()), n);
    }
  }
  function g(r, t) {
    T.assert(n === r, t || 'consumed token not matched'), L();
  }
  function C(r, t) {
    n !== r && T.throwError(t || 'unexpected token'), L();
  }
  function P() {
    var r,
      t = D - 1;
    if (
      (g(u.LPAREN, 'UnionType should start with ('), (r = []), n !== u.RPAREN)
    )
      for (; r.push(k()), n !== u.RPAREN; ) C(u.PIPE);
    return (
      g(u.RPAREN, 'UnionType should end with )'),
      m({ type: e.UnionType, elements: r }, [t, F])
    );
  }
  function o() {
    var r,
      t = D - 1,
      c;
    for (
      g(u.LBRACK, 'ArrayType should start with ['), r = [];
      n !== u.RBRACK;

    ) {
      if (n === u.REST) {
        (c = D - 3),
          g(u.REST),
          r.push(m({ type: e.RestType, expression: k() }, [c, F]));
        break;
      } else r.push(k());
      n !== u.RBRACK && C(u.COMMA);
    }
    return C(u.RBRACK), m({ type: e.ArrayType, elements: r }, [t, F]);
  }
  function M() {
    var r = f;
    if (n === u.NAME || n === u.STRING) return L(), r;
    if (n === u.NUMBER) return g(u.NUMBER), String(r);
    T.throwError('unexpected token');
  }
  function U() {
    var r,
      t = F;
    return (
      (r = M()),
      n === u.COLON
        ? (g(u.COLON), m({ type: e.FieldType, key: r, value: k() }, [t, F]))
        : m({ type: e.FieldType, key: r, value: null }, [t, F])
    );
  }
  function d() {
    var r,
      t = D - 1,
      c;
    if (
      (g(u.LBRACE, 'RecordType should start with {'), (r = []), n === u.COMMA)
    )
      g(u.COMMA);
    else for (; n !== u.RBRACE; ) r.push(U()), n !== u.RBRACE && C(u.COMMA);
    return (c = D), C(u.RBRACE), m({ type: e.RecordType, fields: r }, [t, c]);
  }
  function q() {
    var r = f,
      t = D - r.length;
    return (
      C(u.NAME),
      n === u.COLON &&
        (r === 'module' || r === 'external' || r === 'event') &&
        (g(u.COLON), (r += ':' + f), C(u.NAME)),
      m({ type: e.NameExpression, name: r }, [t, F])
    );
  }
  function ru() {
    var r = [];
    for (r.push(V()); n === u.COMMA; ) g(u.COMMA), r.push(V());
    return r;
  }
  function j() {
    var r,
      t,
      c = D - f.length;
    return (
      (r = q()),
      n === u.DOT_LT || n === u.LT
        ? (L(),
          (t = ru()),
          C(u.GT),
          m({ type: e.TypeApplication, expression: r, applications: t }, [
            c,
            F,
          ]))
        : r
    );
  }
  function tu() {
    return (
      g(u.COLON, 'ResultType should start with :'),
      n === u.NAME && f === 'void' ? (g(u.NAME), { type: e.VoidLiteral }) : k()
    );
  }
  function S() {
    for (var r = [], t = !1, c, A = !1, a, l = D - 3, h; n !== u.RPAREN; )
      n === u.REST && (g(u.REST), (A = !0)),
        (a = F),
        (c = k()),
        c.type === e.NameExpression &&
          n === u.COLON &&
          ((h = F - c.name.length),
          g(u.COLON),
          (c = m({ type: e.ParameterType, name: c.name, expression: k() }, [
            h,
            F,
          ]))),
        n === u.EQUAL
          ? (g(u.EQUAL),
            (c = m({ type: e.OptionalType, expression: c }, [a, F])),
            (t = !0))
          : t && T.throwError('unexpected token'),
        A && (c = m({ type: e.RestType, expression: c }, [l, F])),
        r.push(c),
        n !== u.RPAREN && C(u.COMMA);
    return r;
  }
  function au() {
    var r,
      t,
      c,
      A,
      a,
      l = D - f.length;
    return (
      T.assert(
        n === u.NAME && f === 'function',
        "FunctionType should start with 'function'"
      ),
      g(u.NAME),
      C(u.LPAREN),
      (r = !1),
      (c = []),
      (t = null),
      n !== u.RPAREN &&
        (n === u.NAME && (f === 'this' || f === 'new')
          ? ((r = f === 'new'),
            g(u.NAME),
            C(u.COLON),
            (t = j()),
            n === u.COMMA && (g(u.COMMA), (c = S())))
          : (c = S())),
      C(u.RPAREN),
      (A = null),
      n === u.COLON && (A = tu()),
      (a = m({ type: e.FunctionType, params: c, result: A }, [l, F])),
      t && ((a.this = t), r && (a.new = !0)),
      a
    );
  }
  function z() {
    var r, t;
    switch (n) {
      case u.STAR:
        return g(u.STAR), m({ type: e.AllLiteral }, [F - 1, F]);
      case u.LPAREN:
        return P();
      case u.LBRACK:
        return o();
      case u.LBRACE:
        return d();
      case u.NAME:
        if (((t = D - f.length), f === 'null'))
          return g(u.NAME), m({ type: e.NullLiteral }, [t, F]);
        if (f === 'undefined')
          return g(u.NAME), m({ type: e.UndefinedLiteral }, [t, F]);
        if (f === 'true' || f === 'false')
          return (
            g(u.NAME),
            m({ type: e.BooleanLiteralType, value: f === 'true' }, [t, F])
          );
        if (((r = y.save()), f === 'function'))
          try {
            return au();
          } catch {
            r.restore();
          }
        return j();
      case u.STRING:
        return (
          L(), m({ type: e.StringLiteralType, value: f }, [F - f.length - 2, F])
        );
      case u.NUMBER:
        return (
          L(),
          m({ type: e.NumericLiteralType, value: f }, [F - String(f).length, F])
        );
      default:
        T.throwError('unexpected token');
    }
  }
  function k() {
    var r, t;
    return n === u.QUESTION
      ? ((t = D - 1),
        g(u.QUESTION),
        n === u.COMMA ||
        n === u.EQUAL ||
        n === u.RBRACE ||
        n === u.RPAREN ||
        n === u.PIPE ||
        n === u.EOF ||
        n === u.RBRACK ||
        n === u.GT
          ? m({ type: e.NullableLiteral }, [t, F])
          : m({ type: e.NullableType, expression: z(), prefix: !0 }, [t, F]))
      : n === u.BANG
        ? ((t = D - 1),
          g(u.BANG),
          m({ type: e.NonNullableType, expression: z(), prefix: !0 }, [t, F]))
        : ((t = F),
          (r = z()),
          n === u.BANG
            ? (g(u.BANG),
              m({ type: e.NonNullableType, expression: r, prefix: !1 }, [t, F]))
            : n === u.QUESTION
              ? (g(u.QUESTION),
                m({ type: e.NullableType, expression: r, prefix: !1 }, [t, F]))
              : n === u.LBRACK
                ? (g(u.LBRACK),
                  C(
                    u.RBRACK,
                    'expected an array-style type declaration (' + f + '[])'
                  ),
                  m(
                    {
                      type: e.TypeApplication,
                      expression: m({ type: e.NameExpression, name: 'Array' }, [
                        t,
                        F,
                      ]),
                      applications: [r],
                    },
                    [t, F]
                  ))
                : r);
  }
  function V() {
    var r, t;
    if (((r = k()), n !== u.PIPE)) return r;
    for (t = [r], g(u.PIPE); t.push(k()), n === u.PIPE; ) g(u.PIPE);
    return m({ type: e.UnionType, elements: t }, [0, D]);
  }
  function G() {
    var r;
    return n === u.REST
      ? (g(u.REST), m({ type: e.RestType, expression: V() }, [0, D]))
      : ((r = V()),
        n === u.EQUAL
          ? (g(u.EQUAL), m({ type: e.OptionalType, expression: r }, [0, D]))
          : r);
  }
  function Du(r, t) {
    var c;
    return (
      (i = r),
      (s = i.length),
      (D = 0),
      (F = 0),
      (_ = t && t.range),
      (I = (t && t.startIndex) || 0),
      L(),
      (c = V()),
      t && t.midstream
        ? { expression: c, index: F }
        : (n !== u.EOF && T.throwError('not reach to EOF'), c)
    );
  }
  function iu(r, t) {
    var c;
    return (
      (i = r),
      (s = i.length),
      (D = 0),
      (F = 0),
      (_ = t && t.range),
      (I = (t && t.startIndex) || 0),
      L(),
      (c = G()),
      t && t.midstream
        ? { expression: c, index: F }
        : (n !== u.EOF && T.throwError('not reach to EOF'), c)
    );
  }
  function N(r, t, c) {
    var A, a, l;
    switch (r.type) {
      case e.NullableLiteral:
        A = '?';
        break;
      case e.AllLiteral:
        A = '*';
        break;
      case e.NullLiteral:
        A = 'null';
        break;
      case e.UndefinedLiteral:
        A = 'undefined';
        break;
      case e.VoidLiteral:
        A = 'void';
        break;
      case e.UnionType:
        for (c ? (A = '') : (A = '('), a = 0, l = r.elements.length; a < l; ++a)
          (A += N(r.elements[a], t)), a + 1 !== l && (A += t ? '|' : ' | ');
        c || (A += ')');
        break;
      case e.ArrayType:
        for (A = '[', a = 0, l = r.elements.length; a < l; ++a)
          (A += N(r.elements[a], t)), a + 1 !== l && (A += t ? ',' : ', ');
        A += ']';
        break;
      case e.RecordType:
        for (A = '{', a = 0, l = r.fields.length; a < l; ++a)
          (A += N(r.fields[a], t)), a + 1 !== l && (A += t ? ',' : ', ');
        A += '}';
        break;
      case e.FieldType:
        r.value ? (A = r.key + (t ? ':' : ': ') + N(r.value, t)) : (A = r.key);
        break;
      case e.FunctionType:
        for (
          A = t ? 'function(' : 'function (',
            r.this &&
              (r.new
                ? (A += t ? 'new:' : 'new: ')
                : (A += t ? 'this:' : 'this: '),
              (A += N(r.this, t)),
              r.params.length !== 0 && (A += t ? ',' : ', ')),
            a = 0,
            l = r.params.length;
          a < l;
          ++a
        )
          (A += N(r.params[a], t)), a + 1 !== l && (A += t ? ',' : ', ');
        (A += ')'), r.result && (A += (t ? ':' : ': ') + N(r.result, t));
        break;
      case e.ParameterType:
        A = r.name + (t ? ':' : ': ') + N(r.expression, t);
        break;
      case e.RestType:
        (A = '...'), r.expression && (A += N(r.expression, t));
        break;
      case e.NonNullableType:
        r.prefix
          ? (A = '!' + N(r.expression, t))
          : (A = N(r.expression, t) + '!');
        break;
      case e.OptionalType:
        A = N(r.expression, t) + '=';
        break;
      case e.NullableType:
        r.prefix
          ? (A = '?' + N(r.expression, t))
          : (A = N(r.expression, t) + '?');
        break;
      case e.NameExpression:
        A = r.name;
        break;
      case e.TypeApplication:
        for (
          A = N(r.expression, t) + '.<', a = 0, l = r.applications.length;
          a < l;
          ++a
        )
          (A += N(r.applications[a], t)), a + 1 !== l && (A += t ? ',' : ', ');
        A += '>';
        break;
      case e.StringLiteralType:
        A = '"' + r.value + '"';
        break;
      case e.NumericLiteralType:
        A = String(r.value);
        break;
      case e.BooleanLiteralType:
        A = String(r.value);
        break;
      default:
        T.throwError('Unknown type ' + r.type);
    }
    return A;
  }
  function w(r, t) {
    return t == null && (t = {}), N(r, t.compact, t.topLevel);
  }
  (H.parseType = Du),
    (H.parseParamType = iu),
    (H.stringify = w),
    (H.Syntax = e);
})();
(function (e) {
  (function () {
    var u, i, s, D, F;
    (D = X), (u = H), (i = J);
    function n(C, P, o) {
      return C.slice(P, o);
    }
    F = (function () {
      var C = Object.prototype.hasOwnProperty;
      return function (o, M) {
        return C.call(o, M);
      };
    })();
    function f(C) {
      var P = {},
        o;
      for (o in C) C.hasOwnProperty(o) && (P[o] = C[o]);
      return P;
    }
    function x(C) {
      return (
        (C >= 97 && C <= 122) || (C >= 65 && C <= 90) || (C >= 48 && C <= 57)
      );
    }
    function T(C) {
      return C === 'param' || C === 'argument' || C === 'arg';
    }
    function I(C) {
      return C === 'return' || C === 'returns';
    }
    function _(C) {
      return C === 'property' || C === 'prop';
    }
    function E(C) {
      return (
        T(C) ||
        _(C) ||
        C === 'alias' ||
        C === 'this' ||
        C === 'mixes' ||
        C === 'requires'
      );
    }
    function y(C) {
      return E(C) || C === 'const' || C === 'constant';
    }
    function m(C) {
      return _(C) || T(C);
    }
    function B(C) {
      return _(C) || T(C);
    }
    function p(C) {
      return (
        T(C) ||
        I(C) ||
        C === 'define' ||
        C === 'enum' ||
        C === 'implements' ||
        C === 'this' ||
        C === 'type' ||
        C === 'typedef' ||
        _(C)
      );
    }
    function W(C) {
      return (
        p(C) ||
        C === 'throws' ||
        C === 'const' ||
        C === 'constant' ||
        C === 'namespace' ||
        C === 'member' ||
        C === 'var' ||
        C === 'module' ||
        C === 'constructor' ||
        C === 'class' ||
        C === 'extends' ||
        C === 'augments' ||
        C === 'public' ||
        C === 'private' ||
        C === 'protected'
      );
    }
    var K =
        '[ \\f\\t\\v\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000\\ufeff]',
      eu =
        '(' +
        K +
        '*(?:\\*' +
        K +
        `?)?)(.+|[\r
\u2028\u2029])`;
    function L(C) {
      return C.replace(/^\/\*\*?/, '')
        .replace(/\*\/$/, '')
        .replace(new RegExp(eu, 'g'), '$2')
        .replace(/\s*$/, '');
    }
    function g(C, P) {
      for (
        var o = C.replace(/^\/\*\*?/, ''), M = 0, U = new RegExp(eu, 'g'), d;
        (d = U.exec(o));

      )
        if (((M += d[1].length), d.index + d[0].length > P + M))
          return P + M + C.length - o.length;
      return C.replace(/\*\/$/, '').replace(/\s*$/, '').length;
    }
    (function (C) {
      var P, o, M, U, d, q, ru, j, tu;
      function S() {
        var A = d.charCodeAt(o);
        return (
          (o += 1),
          D.code.isLineTerminator(A) &&
            !(A === 13 && d.charCodeAt(o) === 10) &&
            (M += 1),
          String.fromCharCode(A)
        );
      }
      function au() {
        var A = '';
        for (S(); o < U && x(d.charCodeAt(o)); ) A += S();
        return A;
      }
      function z() {
        var A,
          a,
          l = o;
        for (a = !1; l < U; ) {
          if (
            ((A = d.charCodeAt(l)),
            D.code.isLineTerminator(A) &&
              !(A === 13 && d.charCodeAt(l + 1) === 10))
          )
            a = !0;
          else if (a) {
            if (A === 64) break;
            D.code.isWhiteSpace(A) || (a = !1);
          }
          l += 1;
        }
        return l;
      }
      function k(A, a, l) {
        for (var h, b, v, O, $ = !1; o < a; )
          if (((h = d.charCodeAt(o)), D.code.isWhiteSpace(h))) S();
          else if (h === 123) {
            S();
            break;
          } else {
            $ = !0;
            break;
          }
        if ($) return null;
        for (b = 1, v = ''; o < a; )
          if (((h = d.charCodeAt(o)), D.code.isLineTerminator(h))) S();
          else {
            if (h === 125) {
              if (((b -= 1), b === 0)) {
                S();
                break;
              }
            } else h === 123 && (b += 1);
            v === '' && (O = o), (v += S());
          }
        return b !== 0
          ? i.throwError('Braces are not balanced')
          : B(A)
            ? u.parseParamType(v, { startIndex: N(O), range: l })
            : u.parseType(v, { startIndex: N(O), range: l });
      }
      function V(A) {
        var a;
        if (
          !D.code.isIdentifierStartES5(d.charCodeAt(o)) &&
          !d[o].match(/[0-9]/)
        )
          return null;
        for (a = S(); o < A && D.code.isIdentifierPartES5(d.charCodeAt(o)); )
          a += S();
        return a;
      }
      function G(A) {
        for (
          ;
          o < A &&
          (D.code.isWhiteSpace(d.charCodeAt(o)) ||
            D.code.isLineTerminator(d.charCodeAt(o)));

        )
          S();
      }
      function Du(A, a, l) {
        var h = '',
          b,
          v;
        if ((G(A), o >= A)) return null;
        if (d.charCodeAt(o) === 91)
          if (a) (b = !0), (h = S());
          else return null;
        if (((h += V(A)), l))
          for (
            d.charCodeAt(o) === 58 &&
              (h === 'module' || h === 'external' || h === 'event') &&
              ((h += S()), (h += V(A))),
              d.charCodeAt(o) === 91 &&
                d.charCodeAt(o + 1) === 93 &&
                ((h += S()), (h += S()));
            d.charCodeAt(o) === 46 ||
            d.charCodeAt(o) === 47 ||
            d.charCodeAt(o) === 35 ||
            d.charCodeAt(o) === 45 ||
            d.charCodeAt(o) === 126;

          )
            (h += S()), (h += V(A));
        if (b) {
          if ((G(A), d.charCodeAt(o) === 61)) {
            (h += S()), G(A);
            for (var O, $ = 1; o < A; ) {
              if (
                ((O = d.charCodeAt(o)),
                D.code.isWhiteSpace(O) && (v || (G(A), (O = d.charCodeAt(o)))),
                O === 39 && (v ? v === "'" && (v = '') : (v = "'")),
                O === 34 && (v ? v === '"' && (v = '') : (v = '"')),
                O === 91)
              )
                $++;
              else if (O === 93 && --$ === 0) break;
              h += S();
            }
          }
          if ((G(A), o >= A || d.charCodeAt(o) !== 93)) return null;
          h += S();
        }
        return h;
      }
      function iu() {
        for (; o < U && d.charCodeAt(o) !== 64; ) S();
        return o >= U ? !1 : (i.assert(d.charCodeAt(o) === 64), !0);
      }
      function N(A) {
        return d === q ? A : g(q, A);
      }
      function w(A, a) {
        (this._options = A),
          (this._title = a.toLowerCase()),
          (this._tag = { title: a, description: null }),
          this._options.lineNumbers && (this._tag.lineNumber = M),
          (this._first = o - a.length - 1),
          (this._last = 0),
          (this._extra = {});
      }
      (w.prototype.addError = function (a) {
        var l = Array.prototype.slice.call(arguments, 1),
          h = a.replace(/%(\d)/g, function (b, v) {
            return (
              i.assert(v < l.length, 'Message reference must be in range'), l[v]
            );
          });
        return (
          this._tag.errors || (this._tag.errors = []),
          tu && i.throwError(h),
          this._tag.errors.push(h),
          ru
        );
      }),
        (w.prototype.parseType = function () {
          if (p(this._title))
            try {
              if (
                ((this._tag.type = k(
                  this._title,
                  this._last,
                  this._options.range
                )),
                !this._tag.type &&
                  !T(this._title) &&
                  !I(this._title) &&
                  !this.addError('Missing or invalid tag type'))
              )
                return !1;
            } catch (A) {
              if (((this._tag.type = null), !this.addError(A.message)))
                return !1;
            }
          else if (W(this._title))
            try {
              this._tag.type = k(this._title, this._last, this._options.range);
            } catch {}
          return !0;
        }),
        (w.prototype._parseNamePath = function (A) {
          var a;
          return (
            (a = Du(this._last, j && B(this._title), !0)),
            !a && !A && !this.addError('Missing or invalid tag name')
              ? !1
              : ((this._tag.name = a), !0)
          );
        }),
        (w.prototype.parseNamePath = function () {
          return this._parseNamePath(!1);
        }),
        (w.prototype.parseNamePathOptional = function () {
          return this._parseNamePath(!0);
        }),
        (w.prototype.parseName = function () {
          var A, a;
          if (y(this._title))
            if (
              ((this._tag.name = Du(
                this._last,
                j && B(this._title),
                m(this._title)
              )),
              this._tag.name)
            )
              (a = this._tag.name),
                a.charAt(0) === '[' &&
                  a.charAt(a.length - 1) === ']' &&
                  ((A = a.substring(1, a.length - 1).split('=')),
                  A.length > 1 && (this._tag.default = A.slice(1).join('=')),
                  (this._tag.name = A[0]),
                  this._tag.type &&
                    this._tag.type.type !== 'OptionalType' &&
                    (this._tag.type = {
                      type: 'OptionalType',
                      expression: this._tag.type,
                    }));
            else {
              if (!E(this._title)) return !0;
              if (T(this._title) && this._tag.type && this._tag.type.name)
                (this._extra.name = this._tag.type),
                  (this._tag.name = this._tag.type.name),
                  (this._tag.type = null);
              else if (!this.addError('Missing or invalid tag name')) return !1;
            }
          return !0;
        }),
        (w.prototype.parseDescription = function () {
          var a = n(d, o, this._last).trim();
          return (
            a &&
              (/^-\s+/.test(a) && (a = a.substring(2)),
              (this._tag.description = a)),
            !0
          );
        }),
        (w.prototype.parseCaption = function () {
          var a = n(d, o, this._last).trim(),
            l = '<caption>',
            h = '</caption>',
            b = a.indexOf(l),
            v = a.indexOf(h);
          return (
            b >= 0 && v >= 0
              ? ((this._tag.caption = a.substring(b + l.length, v).trim()),
                (this._tag.description = a.substring(v + h.length).trim()))
              : (this._tag.description = a),
            !0
          );
        }),
        (w.prototype.parseKind = function () {
          var a, l;
          return (
            (l = {
              class: !0,
              constant: !0,
              event: !0,
              external: !0,
              file: !0,
              function: !0,
              member: !0,
              mixin: !0,
              module: !0,
              namespace: !0,
              typedef: !0,
            }),
            (a = n(d, o, this._last).trim()),
            (this._tag.kind = a),
            !(!F(l, a) && !this.addError("Invalid kind name '%0'", a))
          );
        }),
        (w.prototype.parseAccess = function () {
          var a;
          return (
            (a = n(d, o, this._last).trim()),
            (this._tag.access = a),
            !(
              a !== 'private' &&
              a !== 'protected' &&
              a !== 'public' &&
              !this.addError("Invalid access name '%0'", a)
            )
          );
        }),
        (w.prototype.parseThis = function () {
          var a = n(d, o, this._last).trim();
          if (a && a.charAt(0) === '{') {
            var l = this.parseType();
            return (l && this._tag.type.type === 'NameExpression') ||
              this._tag.type.type === 'UnionType'
              ? ((this._tag.name = this._tag.type.name), !0)
              : this.addError('Invalid name for this');
          } else return this.parseNamePath();
        }),
        (w.prototype.parseVariation = function () {
          var a, l;
          return (
            (l = n(d, o, this._last).trim()),
            (a = parseFloat(l, 10)),
            (this._tag.variation = a),
            !(isNaN(a) && !this.addError("Invalid variation '%0'", l))
          );
        }),
        (w.prototype.ensureEnd = function () {
          var A = n(d, o, this._last).trim();
          return !(A && !this.addError("Unknown content '%0'", A));
        }),
        (w.prototype.epilogue = function () {
          var a;
          return (
            (a = this._tag.description),
            !(
              B(this._title) &&
              !this._tag.type &&
              a &&
              a.charAt(0) === '[' &&
              ((this._tag.type = this._extra.name),
              this._tag.name || (this._tag.name = void 0),
              !j && !this.addError('Missing or invalid tag name'))
            )
          );
        }),
        (P = {
          access: ['parseAccess'],
          alias: ['parseNamePath', 'ensureEnd'],
          augments: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          constructor: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          class: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          extends: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          example: ['parseCaption'],
          deprecated: ['parseDescription'],
          global: ['ensureEnd'],
          inner: ['ensureEnd'],
          instance: ['ensureEnd'],
          kind: ['parseKind'],
          mixes: ['parseNamePath', 'ensureEnd'],
          mixin: ['parseNamePathOptional', 'ensureEnd'],
          member: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          method: ['parseNamePathOptional', 'ensureEnd'],
          module: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          func: ['parseNamePathOptional', 'ensureEnd'],
          function: ['parseNamePathOptional', 'ensureEnd'],
          var: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          name: ['parseNamePath', 'ensureEnd'],
          namespace: ['parseType', 'parseNamePathOptional', 'ensureEnd'],
          private: ['parseType', 'parseDescription'],
          protected: ['parseType', 'parseDescription'],
          public: ['parseType', 'parseDescription'],
          readonly: ['ensureEnd'],
          requires: ['parseNamePath', 'ensureEnd'],
          since: ['parseDescription'],
          static: ['ensureEnd'],
          summary: ['parseDescription'],
          this: ['parseThis', 'ensureEnd'],
          todo: ['parseDescription'],
          typedef: ['parseType', 'parseNamePathOptional'],
          variation: ['parseVariation'],
          version: ['parseDescription'],
        }),
        (w.prototype.parse = function () {
          var a, l, h, b;
          if (!this._title && !this.addError('Missing or invalid title'))
            return null;
          for (
            this._last = z(this._title),
              this._options.range &&
                (this._tag.range = [
                  this._first,
                  d.slice(0, this._last).replace(/\s*$/, '').length,
                ].map(N)),
              F(P, this._title)
                ? (h = P[this._title])
                : (h = [
                    'parseType',
                    'parseName',
                    'parseDescription',
                    'epilogue',
                  ]),
              a = 0,
              l = h.length;
            a < l;
            ++a
          )
            if (((b = h[a]), !this[b]())) return null;
          return this._tag;
        });
      function r(A) {
        var a, l, h;
        if (!iu()) return null;
        for (a = au(), l = new w(A, a), h = l.parse(); o < l._last; ) S();
        return h;
      }
      function t(A) {
        var a = '',
          l,
          h;
        for (h = !0; o < U && ((l = d.charCodeAt(o)), !(h && l === 64)); )
          D.code.isLineTerminator(l)
            ? (h = !0)
            : h && !D.code.isWhiteSpace(l) && (h = !1),
            (a += S());
        return A ? a : a.trim();
      }
      function c(A, a) {
        var l = [],
          h,
          b,
          v,
          O,
          $;
        if (
          (a === void 0 && (a = {}),
          typeof a.unwrap == 'boolean' && a.unwrap ? (d = L(A)) : (d = A),
          (q = A),
          a.tags)
        )
          if (Array.isArray(a.tags))
            for (v = {}, O = 0, $ = a.tags.length; O < $; O++)
              typeof a.tags[O] == 'string'
                ? (v[a.tags[O]] = !0)
                : i.throwError('Invalid "tags" parameter: ' + a.tags);
          else i.throwError('Invalid "tags" parameter: ' + a.tags);
        for (
          U = d.length,
            o = 0,
            M = 0,
            ru = a.recoverable,
            j = a.sloppy,
            tu = a.strict,
            b = t(a.preserveWhitespace);
          (h = r(a)), !!h;

        )
          (!v || v.hasOwnProperty(h.title)) && l.push(h);
        return { description: b, tags: l };
      }
      C.parse = c;
    })((s = {})),
      (e.version = i.VERSION),
      (e.parse = s.parse),
      (e.parseType = u.parseType),
      (e.parseParamType = u.parseParamType),
      (e.unwrapComment = L),
      (e.Syntax = f(u.Syntax)),
      (e.Error = i.DoctrineError),
      (e.type = {
        Syntax: e.Syntax,
        parseType: u.parseType,
        parseParamType: u.parseParamType,
        stringify: u.stringify,
      });
  })();
})(Fu);
const Gu = Tu(Fu),
  { combineParameters: Ju } = __STORYBOOK_MODULE_PREVIEW_API__;
var Bu = /^['"]|['"]$/g,
  Qu = (e) => e.replace(Bu, ''),
  qu = (e) => Bu.test(e),
  cu = (e) => {
    let u = Qu(e);
    return qu(e) || Number.isNaN(Number(u)) ? u : Number(u);
  },
  zu = (e) => {
    switch (e.type) {
      case 'function':
        return { name: 'function' };
      case 'object':
        let u = {};
        return (
          e.signature.properties.forEach((i) => {
            u[i.key] = Z(i.value);
          }),
          { name: 'object', value: u }
        );
      default:
        throw new Error(`Unknown: ${e}`);
    }
  },
  Z = (e) => {
    let { name: u, raw: i } = e,
      s = {};
    switch ((typeof i < 'u' && (s.raw = i), e.name)) {
      case 'string':
      case 'number':
      case 'symbol':
      case 'boolean':
        return { ...s, name: u };
      case 'Array':
        return { ...s, name: 'array', value: e.elements.map(Z) };
      case 'signature':
        return { ...s, ...zu(e) };
      case 'union':
        let D;
        return (
          e.elements.every((F) => F.name === 'literal')
            ? (D = {
                ...s,
                name: 'enum',
                value: e.elements.map((F) => cu(F.value)),
              })
            : (D = { ...s, name: u, value: e.elements.map(Z) }),
          D
        );
      case 'intersection':
        return { ...s, name: u, value: e.elements.map(Z) };
      default:
        return { ...s, name: 'other', value: u };
    }
  },
  Hu = (e) => e.name === 'literal',
  Yu = (e) => e.value.replace(/['|"]/g, ''),
  Xu = (e) => {
    switch (e.type) {
      case 'function':
        return { name: 'function' };
      case 'object':
        let u = {};
        return (
          e.signature.properties.forEach((i) => {
            u[i.key] = uu(i.value);
          }),
          { name: 'object', value: u }
        );
      default:
        throw new Error(`Unknown: ${e}`);
    }
  },
  uu = (e) => {
    let { name: u, raw: i } = e,
      s = {};
    switch ((typeof i < 'u' && (s.raw = i), e.name)) {
      case 'literal':
        return { ...s, name: 'other', value: e.value };
      case 'string':
      case 'number':
      case 'symbol':
      case 'boolean':
        return { ...s, name: u };
      case 'Array':
        return { ...s, name: 'array', value: e.elements.map(uu) };
      case 'signature':
        return { ...s, ...Xu(e) };
      case 'union':
        return e.elements.every(Hu)
          ? { ...s, name: 'enum', value: e.elements.map(Yu) }
          : { ...s, name: u, value: e.elements.map(uu) };
      case 'intersection':
        return { ...s, name: u, value: e.elements.map(uu) };
      default:
        return { ...s, name: 'other', value: u };
    }
  },
  Zu = /^\(.*\) => /,
  Y = (e) => {
    let { name: u, raw: i, computed: s, value: D } = e,
      F = {};
    switch ((typeof i < 'u' && (F.raw = i), u)) {
      case 'enum': {
        let f = s ? D : D.map((x) => cu(x.value));
        return { ...F, name: u, value: f };
      }
      case 'string':
      case 'number':
      case 'symbol':
        return { ...F, name: u };
      case 'func':
        return { ...F, name: 'function' };
      case 'bool':
      case 'boolean':
        return { ...F, name: 'boolean' };
      case 'arrayOf':
      case 'array':
        return { ...F, name: 'array', value: D && Y(D) };
      case 'object':
        return { ...F, name: u };
      case 'objectOf':
        return { ...F, name: u, value: Y(D) };
      case 'shape':
      case 'exact':
        let n = gu(D, (f) => Y(f));
        return { ...F, name: 'object', value: n };
      case 'union':
        return { ...F, name: 'union', value: D.map((f) => Y(f)) };
      case 'instanceOf':
      case 'element':
      case 'elementType':
      default: {
        if ((u == null ? void 0 : u.indexOf('|')) > 0)
          try {
            let T = u.split('|').map((I) => JSON.parse(I));
            return { ...F, name: 'enum', value: T };
          } catch {}
        let f = D ? `${u}(${D})` : u,
          x = Zu.test(u) ? 'function' : 'other';
        return { ...F, name: x, value: f };
      }
    }
  },
  Au = (e) => {
    let { type: u, tsType: i, flowType: s } = e;
    return u != null ? Y(u) : i != null ? Z(i) : s != null ? uu(s) : null;
  },
  ue = ((e) => (
    (e.JAVASCRIPT = 'JavaScript'),
    (e.FLOW = 'Flow'),
    (e.TYPESCRIPT = 'TypeScript'),
    (e.UNKNOWN = 'Unknown'),
    e
  ))(ue || {}),
  ee = ['null', 'undefined'];
function su(e) {
  return ee.some((u) => u === e);
}
var re = (e) => {
  if (!e) return '';
  if (typeof e == 'string') return e;
  throw new Error(`Description: expected string, got: ${JSON.stringify(e)}`);
};
function pu(e) {
  return !!e.__docgenInfo;
}
function te(e) {
  return e != null && Object.keys(e).length > 0;
}
function De(e, u) {
  return pu(e) ? e.__docgenInfo[u] : null;
}
function ne(e) {
  return pu(e) && re(e.__docgenInfo.description);
}
function ae(e) {
  return e != null && e.includes('@');
}
function ie(e, u) {
  let i;
  try {
    i = Gu.parse(e, { tags: u, sloppy: !0 });
  } catch (s) {
    throw (console.error(s), new Error('Cannot parse JSDoc tags.'));
  }
  return i;
}
var Ae = {
    tags: ['param', 'arg', 'argument', 'returns', 'ignore', 'deprecated'],
  },
  se = (e, u = Ae) => {
    if (!ae(e)) return { includesJsDoc: !1, ignore: !1 };
    let i = ie(e, u.tags),
      s = Fe(i);
    return s.ignore
      ? { includesJsDoc: !0, ignore: !0 }
      : {
          includesJsDoc: !0,
          ignore: !1,
          description: i.description,
          extractedTags: s,
        };
  };
function Fe(e) {
  let u = { params: null, deprecated: null, returns: null, ignore: !1 };
  for (let i = 0; i < e.tags.length; i += 1) {
    let s = e.tags[i];
    if (s.title === 'ignore') {
      u.ignore = !0;
      break;
    } else
      switch (s.title) {
        case 'param':
        case 'arg':
        case 'argument': {
          let D = Ce(s);
          D != null && (u.params == null && (u.params = []), u.params.push(D));
          break;
        }
        case 'deprecated': {
          let D = Ee(s);
          D != null && (u.deprecated = D);
          break;
        }
        case 'returns': {
          let D = oe(s);
          D != null && (u.returns = D);
          break;
        }
      }
  }
  return u;
}
function Ce(e) {
  let u = e.name;
  return u != null && u !== 'null-null'
    ? {
        name: e.name,
        type: e.type,
        description: e.description,
        getPrettyName: () =>
          u.includes('null')
            ? u.replace('-null', '').replace('.null', '')
            : e.name,
        getTypeName: () => (e.type != null ? Q(e.type) : null),
      }
    : null;
}
function Ee(e) {
  return e.title != null ? e.description : null;
}
function oe(e) {
  return e.type != null
    ? { type: e.type, description: e.description, getTypeName: () => Q(e.type) }
    : null;
}
function Q(e) {
  return e.type === 'NameExpression'
    ? e.name
    : e.type === 'RecordType'
      ? `({${e.fields
          .map((u) => {
            if (u.value != null) {
              let i = Q(u.value);
              return `${u.key}: ${i}`;
            }
            return u.key;
          })
          .join(', ')}})`
      : e.type === 'UnionType'
        ? `(${e.elements.map(Q).join('|')})`
        : e.type === 'ArrayType'
          ? '[]'
          : e.type === 'TypeApplication' &&
              e.expression != null &&
              e.expression.name === 'Array'
            ? `${Q(e.applications[0])}[]`
            : e.type === 'NullableType' ||
                e.type === 'NonNullableType' ||
                e.type === 'OptionalType'
              ? Q(e.expression)
              : e.type === 'AllLiteral'
                ? 'any'
                : null;
}
function fu(e) {
  return e.length > 90;
}
function le(e) {
  return e.length > 50;
}
function R(e, u) {
  return e === u ? { summary: e } : { summary: e, detail: u };
}
function hu({ name: e, value: u, elements: i, raw: s }) {
  return u ?? (i != null ? i.map(hu).join(' | ') : s ?? e);
}
function Be({ name: e, raw: u, elements: i }) {
  return i != null
    ? R(i.map(hu).join(' | '))
    : u != null
      ? R(u.replace(/^\|\s*/, ''))
      : R(e);
}
function ce({ type: e, raw: u }) {
  return u != null ? R(u) : R(e);
}
function pe({ type: e, raw: u }) {
  return u != null ? (fu(u) ? R(e, u) : R(u)) : R(e);
}
function fe(e) {
  let { type: u } = e;
  return u === 'object' ? pe(e) : ce(e);
}
function he({ name: e, raw: u }) {
  return u != null ? (fu(u) ? R(e, u) : R(u)) : R(e);
}
function de(e) {
  if (e == null) return null;
  switch (e.name) {
    case 'union':
      return Be(e);
    case 'signature':
      return fe(e);
    default:
      return he(e);
  }
}
function me(e, u) {
  if (e != null) {
    let { value: i } = e;
    if (!su(i)) return le(i) ? R(u.name, i) : R(i);
  }
  return null;
}
var ye = (e, u) => {
  let { flowType: i, description: s, required: D, defaultValue: F } = u;
  return {
    name: e,
    type: de(i),
    required: D,
    description: s,
    defaultValue: me(F, i),
  };
};
function xe({ tsType: e, required: u }) {
  if (e == null) return null;
  let i = e.name;
  return (
    u || (i = i.replace(' | undefined', '')),
    R(['Array', 'Record', 'signature'].includes(e.name) ? e.raw : i)
  );
}
function ge({ defaultValue: e }) {
  if (e != null) {
    let { value: u } = e;
    if (!su(u)) return R(u);
  }
  return null;
}
var Te = (e, u) => {
  let { description: i, required: s } = u;
  return {
    name: e,
    type: xe(u),
    required: s,
    description: i,
    defaultValue: ge(u),
  };
};
function ve(e) {
  return e != null ? R(e.name) : null;
}
function Se(e) {
  let { computed: u, func: i } = e;
  return typeof u > 'u' && typeof i > 'u';
}
function Ne(e) {
  return e
    ? e.name === 'string'
      ? !0
      : e.name === 'enum'
        ? Array.isArray(e.value) &&
          e.value.every(
            ({ value: u }) =>
              typeof u == 'string' && u[0] === '"' && u[u.length - 1] === '"'
          )
        : !1
    : !1;
}
function we(e, u) {
  if (e != null) {
    let { value: i } = e;
    if (!su(i)) return Se(e) && Ne(u) ? R(JSON.stringify(i)) : R(i);
  }
  return null;
}
function du(e, u, i) {
  let { description: s, required: D, defaultValue: F } = i;
  return {
    name: e,
    type: ve(u),
    required: D,
    description: s,
    defaultValue: we(F, u),
  };
}
function nu(e, u) {
  var i;
  if (u.includesJsDoc) {
    let { description: s, extractedTags: D } = u;
    s != null && (e.description = u.description);
    let F = {
      ...D,
      params:
        (i = D == null ? void 0 : D.params) == null
          ? void 0
          : i.map((n) => ({
              name: n.getPrettyName(),
              description: n.description,
            })),
    };
    Object.values(F).filter(Boolean).length > 0 && (e.jsDocTags = F);
  }
  return e;
}
var be = (e, u, i) => {
    let s = du(e, u.type, u);
    return (s.sbType = Au(u)), nu(s, i);
  },
  Re = (e, u, i) => {
    let s = Te(e, u);
    return (s.sbType = Au(u)), nu(s, i);
  },
  Oe = (e, u, i) => {
    let s = ye(e, u);
    return (s.sbType = Au(u)), nu(s, i);
  },
  _e = (e, u, i) => {
    let s = du(e, { name: 'unknown' }, u);
    return nu(s, i);
  },
  mu = (e) => {
    switch (e) {
      case 'JavaScript':
        return be;
      case 'TypeScript':
        return Re;
      case 'Flow':
        return Oe;
      default:
        return _e;
    }
  },
  yu = (e) =>
    e.type != null
      ? 'JavaScript'
      : e.flowType != null
        ? 'Flow'
        : e.tsType != null
          ? 'TypeScript'
          : 'Unknown',
  Pe = (e) => {
    let u = yu(e[0]),
      i = mu(u);
    return e.map((s) => {
      var F;
      let D = s;
      return (
        (F = s.type) != null &&
          F.elements &&
          (D = { ...s, type: { ...s.type, value: s.type.elements } }),
        xu(D.name, D, u, i)
      );
    });
  },
  Ie = (e) => {
    let u = Object.keys(e),
      i = yu(e[u[0]]),
      s = mu(i);
    return u
      .map((D) => {
        let F = e[D];
        return F != null ? xu(D, F, i, s) : null;
      })
      .filter(Boolean);
  },
  We = (e, u) => {
    let i = De(e, u);
    return te(i) ? (Array.isArray(i) ? Pe(i) : Ie(i)) : [];
  };
function xu(e, u, i, s) {
  let D = se(u.description);
  return D.includesJsDoc && D.ignore
    ? null
    : {
        propDef: s(e, u, D),
        jsDocTags: D.extractedTags,
        docgenInfo: u,
        typeSystem: i,
      };
}
function Ve(e) {
  return e != null && ne(e);
}
var Ke = (e) => {
    let {
        component: u,
        argTypes: i,
        parameters: { docs: s = {} },
      } = e,
      { extractArgTypes: D } = s,
      F = D && u ? D(u) : {};
    return F ? Ju(F, i) : i;
  },
  ke = 'storybook/docs',
  $e = `${ke}/snippet-rendered`,
  Le = ((e) => (
    (e.AUTO = 'auto'), (e.CODE = 'code'), (e.DYNAMIC = 'dynamic'), e
  ))(Le || {});
export {
  $e as S,
  ue as T,
  Ke as a,
  Le as b,
  R as c,
  We as d,
  Ve as e,
  fu as f,
  De as g,
  pu as h,
  le as i,
  re as s,
  X as u,
};
