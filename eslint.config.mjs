// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Reglas base para Next.js, Core Web Vitals y TypeScript
  ...compat.extends("next", "next/core-web-vitals", "next/typescript"),

  // Configuración personalizada
  {
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // React
      "react/react-in-jsx-scope": "off", // Next.js ya incluye React automáticamente
      "react/prop-types": "off",

      // Estilo de código
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      "indent": ["error", 2, { SwitchCase: 1 }],
      "comma-dangle": ["error", "always-multiline"],

      // Tailwind CSS (opcional, si usas la extensión eslint-plugin-tailwindcss)
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
];

export default eslintConfig;
