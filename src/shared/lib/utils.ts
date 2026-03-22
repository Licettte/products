export type Error = {
  name: string;
  message?: string;
  stack?: string;
  isSystem?: boolean;
};

export type AppError = {
  name?: string
  message?: string
  stack?: string
  isSystem?: boolean
}

export const handleError = (error: unknown): void => {
  const normalizedError = error as AppError

  const message = normalizedError?.message ?? 'Произошла неизвестная ошибка'
  const isSystem = normalizedError?.isSystem

  if (isSystem === false) {
    window.alert(message)
  }

  console.error(message)
}
