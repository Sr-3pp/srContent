export const EmitHandler = (
  $event: Component,
  component: Component,
  callback: Function
) => {
  const data = $event || component;
  callback(data);
};
