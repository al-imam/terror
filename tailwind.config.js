const { fontFamily } = require("tailwindcss/defaultTheme")
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")
const { parseColor } = require("tailwindcss/lib/util/color")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      __colors: ({ theme }) => {
        const flatPalette = flattenColorPalette(theme("colors"))

        return Object.fromEntries(
          Object.entries(flatPalette)
            .map(([key, value]) => [key, parseColor(value)?.color.join(" ")])
            .filter(([, value]) => value)
        )
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        shade: {
          DEFAULT: "rgb(var(--shade-500))",
          "p-500": "rgb(var(--shade-p-500))",
          "p-400": "rgb(var(--shade-p-400))",
          "p-300": "rgb(var(--shade-p-300))",
          "p-200": "rgb(var(--shade-p-200))",
          "p-100": "rgb(var(--shade-p-100))",
          0: "rgb(var(--shade-0))",
          "n-100": "rgb(var(--shade-n-100))",
          "n-200": "rgb(var(--shade-n-200))",
          "n-300": "rgb(var(--shade-n-300))",
          "n-400": "rgb(var(--shade-n-400))",
          "n-500": "rgb(var(--shade-n-500))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-layout"),
    require("tailwindcss-debug-screens"),
    plugin(({ addBase, theme }) => {
      addBase({
        ":root": {
          "--shade-p-500": theme("__colors.zinc-50"),
          "--shade-p-400": theme("__colors.zinc-100"),
          "--shade-p-300": theme("__colors.zinc-200"),
          "--shade-p-200": theme("__colors.zinc-300"),
          "--shade-p-100": theme("__colors.zinc-400"),
          "--shade-0": theme("__colors.zinc-500"),
          "--shade-n-100": theme("__colors.zinc-600"),
          "--shade-n-200": theme("__colors.zinc-700"),
          "--shade-n-300": theme("__colors.zinc-800"),
          "--shade-n-400": theme("__colors.zinc-900"),
          "--shade-n-500": theme("__colors.zinc-950"),
        },

        ".dark": {
          "--shade-p-500": theme("__colors.zinc-900"),
          "--shade-p-400": theme("__colors.zinc-800"),
          "--shade-p-300": theme("__colors.zinc-700"),
          "--shade-p-200": theme("__colors.zinc-600"),
          "--shade-p-100": theme("__colors.zinc-500"),
          "--shade-0": theme("__colors.zinc-400"),
          "--shade-n-100": theme("__colors.zinc-300"),
          "--shade-n-200": theme("__colors.zinc-200"),
          "--shade-n-300": theme("__colors.zinc-100"),
          "--shade-n-400": theme("__colors.zinc-50"),
          "--shade-n-500": theme("__colors.white"),
        },
      })
    }),
    plugin(({ addComponents }) => {
      addComponents({
        ".no-scrollbar::-webkit-scrollbar": { display: "none" },
        ".no-scrollbar": { msOverflowStyle: "none", scrollbarWidth: "none" },

        [[".debug-css *", ".debug-css"]]: {
          "@apply bg-red-500/5 outline outline-1 outline-red-500/20": {},
        },

        ".dragging-none": { WebkitUserDrag: "none", userDrag: "none" },
        ".dragging-auto": { WebkitUserDrag: "auto", userDrag: "auto" },

        ".writing-vertical": {
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        },

        ".stack-content": {
          display: "grid",
          gridTemplate: "'container'",
          isolation: "isolate",
        },
        ".stack-content > *": { gridArea: "container" },

        [[
          "input:-webkit-autofill",
          "input:-webkit-autofill:hover",
          "input:-webkit-autofill:focus",
          "input:-webkit-autofill:active",
        ]]: {
          transition: [
            "background-color 50000s ease-in-out 0s",
            "color 5000s ease-in-out 0s",
          ].join(", "),
        },

        [[".overlay-left", ".overlay-right", ".overlay"]]: {
          "--overlay-width": "10%",
          "--bg-color": "rgb(255 255 255 / 1)",
          "--transparent": "rgb(0 0 0 / 0)",
        },

        [[
          ":is(.overlay-left, .overlay-right, .overlay)::before",
          ":is(.overlay-left, .overlay-right, .overlay)::after",
        ]]: {
          background: "linear-gradient(to right, var(--g-start), var(--g-end))",
          position: "absolute",
          pointerEvents: "none",
          width: "var(--overlay-width)",
          zIndex: 10,
        },

        ":is(.overlay-left, .overlay)::before": {
          "--g-start": "var(--bg-color)",
          "--g-end": "var(--transparent)",
          content: '""',
          inset: "0 auto 0 0",
        },

        ":is(.overlay-right, .overlay)::before": {
          "--g-end": "var(--bg-color)",
          "--g-start": "var(--transparent)",
          content: '""',
          inset: "0 0 0 auto",
        },
      })
    }),
  ],
}
