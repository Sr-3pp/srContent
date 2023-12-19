export const validateForm = ($event: Event, callback: Function) => {
  const formData = new FormData($event.target as any);
  const data: any = {};
  [...formData.entries()].forEach(([key, value]) => {
    data[key] = value;
  });
  return callback(data);
};
