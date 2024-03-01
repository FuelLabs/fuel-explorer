export interface IUseCase<Input, ReturnValue> {
  execute(input: Input): Promise<ReturnValue>;
}
