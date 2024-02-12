import type z from 'zod';
import { fromZodError } from 'zod-validation-error';

type ActionType<InputType extends z.ZodTypeAny, ResponseType> = (
  input: z.infer<InputType>,
) => Promise<ResponseType>;

export type Action<InputType extends z.ZodTypeAny, ResponseType> = ActionType<
  InputType,
  ResponseType
>;

export function act<InputType extends z.ZodTypeAny, ResponseType>(
  validator: InputType,
  action: ActionType<InputType, ResponseType>,
) {
  // The wrapper that actually validates
  const validatedAction = async (input: z.infer<InputType>) => {
    // This will throw if the input is invalid
    const result = validator.safeParse(input);

    if (!result.success) {
      const validatedError = fromZodError(result.error);
      throw validatedError;
    }
    return await action(input);
  };

  return validatedAction as Action<InputType, ResponseType>;
}
