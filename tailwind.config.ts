
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
				orbitron: ['Orbitron', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				neon: {
					blue: 'hsl(var(--neon-blue))',
					green: 'hsl(var(--neon-green))',
					red: 'hsl(var(--neon-red))',
					purple: 'hsl(var(--neon-purple))',
				},
				core: 'hsl(var(--core))',
				space: 'hsl(var(--space))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1)',
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(1.2)',
					},
				},
				'text-glow': {
					'0%, 100%': { 
						textShadow: '0 0 4px rgba(14, 165, 233, 0.7)',
					},
					'50%': { 
						textShadow: '0 0 15px rgba(14, 165, 233, 0.9), 0 0 20px rgba(14, 165, 233, 0.4)',
					}
				},
				'scanning': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' },
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'10%, 30%, 50%, 70%, 90%': { opacity: '0.6' },
					'20%, 40%, 60%, 80%': { opacity: '0.8' },
				},
				'appear': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.9)',
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				'slide-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)',
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'slide-right': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-20px)',
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'fade': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'core-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(239, 68, 68, 0.7)',
						backgroundColor: 'rgba(239, 68, 68, 0.3)',
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(239, 68, 68, 0.9), 0 0 40px rgba(239, 68, 68, 0.5)',
						backgroundColor: 'rgba(239, 68, 68, 0.5)',
					}
				},
				'starry-bg': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' },
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' },
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'radial-pulse': {
					'0%': { 
						opacity: '1',
						transform: 'scale(0.1)',
					},
					'100%': { 
						opacity: '0',
						transform: 'scale(2)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'text-glow': 'text-glow 2s ease-in-out infinite',
				'scanning': 'scanning 15s ease infinite alternate',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'spin-slow': 'spin-slow 10s linear infinite',
				'flicker': 'flicker 3s ease-in-out infinite',
				'appear': 'appear 0.4s cubic-bezier(0.26, 0.53, 0.74, 1.48)',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'fade': 'fade 0.5s ease-in-out',
				'core-pulse': 'core-pulse 4s ease-in-out infinite',
				'starry-bg': 'starry-bg 60s ease infinite alternate',
				'glitch': 'glitch 0.8s ease-in-out infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 0.7s step-end infinite',
				'radial-pulse': 'radial-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
			},
			backgroundImage: {
				'starry-pattern': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
				'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
				'gradient-scan': 'linear-gradient(45deg, transparent 45%, rgba(14, 165, 233, 0.1) 50%, transparent 55%)',
				'core-glow': 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
				'holographic': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
				'data-stream': 'linear-gradient(0deg, transparent 0%, rgba(0,255,0,0.2) 50%, transparent 100%)',
			},
			boxShadow: {
				'neon': '0 0 5px rgba(14, 165, 233, 0.3), 0 0 20px rgba(14, 165, 233, 0.2)',
				'neon-strong': '0 0 10px rgba(14, 165, 233, 0.5), 0 0 30px rgba(14, 165, 233, 0.3)',
				'core': '0 0 10px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
				'neon-green': '0 0 10px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3)',
				'neon-purple': '0 0 10px rgba(161, 0, 255, 0.5), 0 0 30px rgba(161, 0, 255, 0.3)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
