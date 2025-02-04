export const isNanoId = (value: string) => {
   return /^[a-z0-9]{12}$/.test(value);
}