import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
	fontFamily: {
		'inter': ['inter'],
		'body': ['mali'],
		'thai': ['IBM Plex Sans Thai Looped'],
		'starcansay': ['starcansay'],
		'chulanarak': ['chulanarak'],
		'ibm-plex-sans-thai': ['IBM Plex Sans Thai'],
	},
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			starcansaypink:{
				light: '#E5CDD7',
				DEFAULT: '#F4AACA'
			},
			starcansaywhite:{
				DEFAULT: ''
			},

			starcansayblue:{
				DEFAULT: '#4E6AB3',
				background: '#DBE2F5'
			},
			starcansaylightpink:{
				DEFAULT: '#FFEAEA',
			},
			starcansaygreen: {
				DEFAULT: '#89C18F',
				background: '#E4E8E5'
			},
			starcansayred: {
				DEFAULT: '#E46C6C',
				background: '#FBE0E0'
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	},
	  screens: {
		'sm': '640px',
		'md': '769px',
		'lg': '1024px',
		'xl': '1280px',
	  },
  },
};
export default config;
