
export const formatError = (error: any) => {
    const errorKey = error?._key;
  const errorMessage = error?._object?.[errorKey];

  return errorMessage?.data;
}