/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react';
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pf-cell': {
          'clear': 'transparent',
          'entry': 'var(--colors-primary-400)',
          'exit': 'var(--colors-success-400)',
          'wall': 'var(--colors-secondary)',
          'visited': 'var(--colors-secondary-100)',
          'visited-start': 'var(--colors-primary-700)',
          'visited-mid': 'var(--colors-primary-400)',
          'path': 'var(--colors-primary-600)',
          'path-border': 'var(--colors-warning-400)',
        }
      },
      spacing: {
        'pf-cell-size': '25px',
      },
      keyframes: {
        visitedAnimation: {
          '0%': {
            transform: 'scale(0.3)',
            borderRadius: '50%',
            backgroundColor: 'var(--colors-primary-700)',
          },
          '30%': {
            transform: 'scale(0.6)',
            borderRadius: '65%',
            backgroundColor: 'var(--colors-primary-400)',
          },
          '60%': {
            transform: 'scale(1.05)',
            borderRadius: '80%',
          },
          '100%': {
            transform: 'scale(1)',
            backgroundColor: 'var(--colors-secondary-100)',
          },
        },
        wallAnimation: {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0.75',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        scaleOut: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.2)',
            backgroundColor: 'var(--colors-danger-400)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '0',
          },
        },
        pulseArrow: {
          '0%': {
            opacity: '0.5',
            transform: 'translateX(0)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateX(4px)',
          },
          '100%': {
            opacity: '0.5',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'visitedAnimation': 'visitedAnimation 1s',
        'wallAnimation': 'wallAnimation 0.5s',
        'scale-in': 'scaleIn 0.5s ease-in-out',
        'scale-out': 'scaleOut 0.5s ease-in-out',
        'pulse-arrow': 'pulseArrow 1.5s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      "themes": {
        "light": {
        "colors": {
          "default": {
         "50": "#dfedfd",
          "100": "#b3d4fa",
          "200": "#86bbf7",
          "300": "#59a1f4",
          "400": "#2d88f1",
          "500": "#006fee",
          "600": "#005cc4",
          "700": "#00489b",
          "800": "#003571",
          "900": "#002147",
          "foreground": "#fff",
          "DEFAULT": "#006fee"
          },
          "primary": {
          "50": "#fefefe",
          "100": "#fefefe",
          "200": "#fdfdfd",
          "300": "#fcfcfc",
          "400": "#fbfbfb",
          "500": "#fafafa",
          "600": "#cecece",
          "700": "#a3a3a3",
          "800": "#777777",
          "900": "#4b4b4b",
          "foreground": "#000",
          "DEFAULT": "#fafafa"
          },
          "secondary": {
          "50": "#e0e0e0",
          "100": "#b6b6b6",
          "200": "#8b8b8b",
          "300": "#606060",
          "400": "#353535",
          "500": "#0a0a0a",
          "600": "#080808",
          "700": "#070707",
          "800": "#050505",
          "900": "#030303",
          "foreground": "#fff",
          "DEFAULT": "#0a0a0a"
          },
          "success": {
          "50": "#f0fdf5",
          "100": "#dbfae6",
          "200": "#c6f7d8",
          "300": "#b0f5c9",
          "400": "#9bf2bb",
          "500": "#86efac",
          "600": "#6fc58e",
          "700": "#579b70",
          "800": "#407252",
          "900": "#284834",
          "foreground": "#000",
          "DEFAULT": "#86efac"
          },
          "warning": {
          "50": "#fffbe8",
          "100": "#fef6c8",
          "200": "#fef0a8",
          "300": "#feeb87",
          "400": "#fde567",
          "500": "#fde047",
          "600": "#d1b93b",
          "700": "#a4922e",
          "800": "#786a22",
          "900": "#4c4315",
          "foreground": "#000",
          "DEFAULT": "#fde047"
          },
          "danger": {
          "50": "#feeded",
          "100": "#fdd4d4",
          "200": "#fcbcbc",
          "300": "#faa3a3",
          "400": "#f98a8a",
          "500": "#f87171",
          "600": "#cd5d5d",
          "700": "#a14949",
          "800": "#763636",
          "900": "#4a2222",
          "foreground": "#000",
          "DEFAULT": "#f87171"
          },
          "background": "#ffffff",
          "foreground": {
          "50": "#dfdfdf",
          "100": "#b3b3b3",
          "200": "#868686",
          "300": "#595959",
          "400": "#2d2d2d",
          "500": "#000000",
          "600": "#000000",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000",
          "foreground": "#fff",
          "DEFAULT": "#000000"
          },
          "content1": {
          "DEFAULT": "#ffffff",
          "foreground": "#000"
          },
          "content2": {
          "DEFAULT": "#f4f4f5",
          "foreground": "#000"
          },
          "content3": {
          "DEFAULT": "#e4e4e7",
          "foreground": "#000"
          },
          "content4": {
          "DEFAULT": "#d4d4d8",
          "foreground": "#000"
          },
          "focus": "#09090b",
          "overlay": "#000000",
          "divider": "#111111"
        }
        },
        "dark": {
        "colors": {
          "default": {
          "50": "#dfedfd",
          "100": "#b3d4fa",
          "200": "#86bbf7",
          "300": "#59a1f4",
          "400": "#2d88f1",
          "500": "#006fee",
          "600": "#005cc4",
          "700": "#00489b",
          "800": "#003571",
          "900": "#002147",
          "foreground": "#fff",
          "DEFAULT": "#006fee"
          },
          "primary": {
          "50": "#010101",
          "100": "#010101",
          "200": "#020202",
          "300": "#020202",
          "400": "#030303",
          "500": "#2f2f2f",
          "600": "#5b5b5b",
          "700": "#878787",
          "800": "#b3b3b3",
          "900": "#e0e0e0",
          "foreground": "#fff",
          "DEFAULT": "#030303"
          },
          "secondary": {
          "50": "#4b4b4b",
          "100": "#777777",
          "200": "#a3a3a3",
          "300": "#cecece",
          "400": "#fafafa",
          "500": "#fbfbfb",
          "600": "#fcfcfc",
          "700": "#fdfdfd",
          "800": "#fefefe",
          "900": "#fefefe",
          "foreground": "#000",
          "DEFAULT": "#fafafa"
          },
          "success": {
          "50": "#0a3b1c",
          "100": "#105e2d",
          "200": "#16803d",
          "300": "#1ca34e",
          "400": "#22c55e",
          "500": "#49cf7a",
          "600": "#6fd996",
          "700": "#96e3b3",
          "800": "#bdeecf",
          "900": "#e3f8eb",
          "foreground": "#000",
          "DEFAULT": "#22c55e"
          },
          "warning": {
          "50": "#4b390b",
          "100": "#775b11",
          "200": "#a37c17",
          "300": "#cf9e1e",
          "400": "#fbbf24",
          "500": "#fcca4a",
          "600": "#fcd571",
          "700": "#fde197",
          "800": "#feecbd",
          "900": "#fff7e4",
          "foreground": "#000",
          "DEFAULT": "#fbbf24"
          },
          "danger": {
          "50": "#420b0b",
          "100": "#691212",
          "200": "#8f1919",
          "300": "#b61f1f",
          "400": "#dc2626",
          "500": "#e24c4c",
          "600": "#e87272",
          "700": "#ee9898",
          "800": "#f5bebe",
          "900": "#fbe4e4",
          "foreground": "#fff",
          "DEFAULT": "#dc2626"
          },
          "background": "#000000",
          "foreground": {
          "50": "#4d4d4d",
          "100": "#797979",
          "200": "#a6a6a6",
          "300": "#d2d2d2",
          "400": "#ffffff",
          "500": "#ffffff",
          "600": "#ffffff",
          "700": "#ffffff",
          "800": "#ffffff",
          "900": "#ffffff",
          "foreground": "#000",
          "DEFAULT": "#ffffff"
          },
          "content1": {
          "DEFAULT": "#18181b",
          "foreground": "#fff"
          },
          "content2": {
          "DEFAULT": "#27272a",
          "foreground": "#fff"
          },
          "content3": {
          "DEFAULT": "#3f3f46",
          "foreground": "#fff"
          },
          "content4": {
          "DEFAULT": "#52525b",
          "foreground": "#fff"
          },
          "focus": "#fafafa",
          "overlay": "#ffffff",
          "divider": "#ffffff"
        }
        }
      },
      "layout": {
        "fontSize": {
        "tiny": "0.75rem",
        "small": "0.875rem",
        "medium": "1rem",
        "large": "1.125rem"
        },
        "lineHeight": {
        "tiny": "1rem",
        "small": "1.25rem",
        "medium": "1.5rem",
        "large": "1.75rem"
        },
        "radius": {
        "small": "0.5rem",
        "medium": "0.75rem",
        "large": "0.875rem"
        },
        "borderWidth": {
        "small": "1px",
        "medium": "2px",
        "large": "3px"
        },
        "disabledOpacity": "0.5",
        "dividerWeight": "1",
        "hoverOpacity": "0.8"
      }
      })
  ],
};
