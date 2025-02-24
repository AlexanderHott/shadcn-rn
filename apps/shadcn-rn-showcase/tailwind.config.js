/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      // },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": {
          "--background": "0 0% 100%;",
          "--foreground": "0 0% 3.9%;",
          "--card": "0 0% 100%;",
          "--card-foreground": "0 0% 3.9%;",
          "--popover": "0 0% 100%;",
          "--popover-foreground": "0 0% 3.9%;",
          "--primary": "0 0% 9%;",
          "--primary-foreground": "0 0% 98%;",
          "--secondary": "0 0% 96.1%;",
          "--secondary-foreground": "0 0% 9%;",
          "--muted": "0 0% 96.1%;",
          "--muted-foreground": "0 0% 45.1%;",
          "--accent": "0 0% 96.1%;",
          "--accent-foreground": "0 0% 9%;",
          "--destructive": "0 84.2% 60.2%;",
          "--destructive-foreground": "0 0% 98%;",
          "--border": "0 0% 89.8%;",
          "--input": "0 0% 89.8%;",
          "--ring": "0 0% 3.9%;",
          "--chart-1": "12 76% 61%;",
          "--chart-2": "173 58% 39%;",
          "--chart-3": "197 37% 24%;",
          "--chart-4": "43 74% 66%;",
          "--chart-5": "27 87% 67%;",
          "--radius": "0.5rem",
        },
      }),
  ],
};
