// SVG
declare module "*.svg" {
  const content: string;
  export default content;
}

// CSS
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}