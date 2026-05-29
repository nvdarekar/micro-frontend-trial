declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

// custom fields on the global window object
interface Window {
  IS_DEVELOPMENT: boolean;
}
