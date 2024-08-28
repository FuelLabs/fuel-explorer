export default class ReceiptsParser {
  parse(receipts: any) {
    if (!receipts) return [];
    let indent = 0;
    const flow = [];
    for (const [index, item] of receipts.entries()) {
      const type = item.receiptType;
      const previousItem = receipts[index - 1] || {};
      if (previousItem.receiptType !== 'RETURN' && type === 'SCRIPT_RESULT')
        indent = 0;
      const arrow = `${'-'.repeat(indent + 1)}>`;
      flow.push({ indent, arrow, type, data: this.clean(item) });
      if (['CALL', 'RETURN'].includes(type)) indent++;
      if (['RETURN_DATA'].includes(type) && indent > 0) indent--;
    }
    return flow;
  }

  clean(obj: any) {
    return Object.entries(obj).reduce((a: any, [k, v]) => {
      if (v != null) {
        a[k] = v;
      }
      return a;
    }, {});
  }
}
