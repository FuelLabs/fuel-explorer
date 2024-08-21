import ReceiptsParser from './ReceiptsParser';

export default class ReceiptsParserAdapter {
  constructor(readonly receiptsParser: ReceiptsParser) {}

  parse(receipts: any) {
    const output = this.receiptsParser.parse(receipts);
    return this.convert(output);
  }

  convert(output: any) {
    if (!output) return [];
    const data: any = [];
    let pointer = data;
    const lastPointer: any = {};
    for (const [index, item] of output.entries()) {
      const next = output[index + 1];
      const obj = { type: item.type, item: item.data } as any;
      if (['CALL', 'RETURN'].includes(item.type)) obj.receipts = [];
      pointer.push(obj);
      if (next && next.indent > item.indent) {
        lastPointer[item.indent] = pointer;
        pointer = obj.receipts;
      }
      if (next && next.indent < item.indent) {
        pointer = lastPointer[next.indent];
      }
    }
    const groups = [];
    for (const group of data) {
      if (group.type === 'CALL') {
        const top = {
          type: 'FROM_CONTRACT',
          receipts: [] as any,
        };
        top.receipts.push({ item: group.item });
        top.receipts.push(...group.receipts);
        groups.push(top);
      }
      if (group.type === 'RETURN') {
        const top = {
          type: 'FINAL_RESULT',
          receipts: [] as any,
        };
        top.receipts.push({ item: group.item });
        top.receipts.push(...group.receipts);
        groups.push(top);
      } else {
        if (group.type === 'SCRIPT_RESULT') {
          const top = {
            type: 'FINAL_RESULT',
            receipts: [] as any,
          };
          top.receipts.push({ item: group.item });
          if (group.receipts) top.receipts.push(...group.receipts);
          groups.push(top);
        }
      }
    }
    return groups;
  }
}
