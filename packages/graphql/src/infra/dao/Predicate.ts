export default class Predicate {
  id: number;
  address: string;
  bytecode: any;

  constructor(predicate: any) {
    this.id = predicate._id;
    this.address = predicate.address;
    this.bytecode = predicate.bytecode;
  }

  toGQLNode() {
    return {
      bytecode: this.bytecode,
      address: this.address,
    };
  }
}
