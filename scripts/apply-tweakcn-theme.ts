#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ThemeColors {
  [key: string]: string
}

interface Theme {
  name: string
  description: string
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
}

interface TweakcnConfig {
  themes: {
    [key: string]: Theme
  }
  default: string
}

function generateCSSVariables(colors: ThemeColors, isDark: boolean = false): string {
  let css = isDark ? '  .dark {\n' : '  :root {\n'
  
  if (!isDark) {
    css += '    /* Theme Applied via tweakcn */\n'
  }
  
  Object.entries(colors).forEach(([key, value]) => {
    css += `    --${key}: ${value};\n`
  })
  
  if (!isDark) {
    css += '    --radius: 1rem;\n'
  }
  
  css += '  }\n'
  return css
}

function applyTheme(themeName?: string) {
  try {
    // Read tweakcn config
    const configPath = join(process.cwd(), 'theme', 'tweakcn.json')
    const configContent = readFileSync(configPath, 'utf-8')
    const config: TweakcnConfig = JSON.parse(configContent)
    
    // Use provided theme or default
    const selectedTheme = themeName || config.default
    
    if (!config.themes[selectedTheme]) {
      console.error(`❌ Theme "${selectedTheme}" not found in tweakcn.json`)
      console.log('📋 Available themes:', Object.keys(config.themes).join(', '))
      process.exit(1)
    }
    
    const theme = config.themes[selectedTheme]
    console.log(`🎨 Applying theme: ${theme.name}`)
    console.log(`📝 Description: ${theme.description}`)
    
    // Generate CSS content
    const lightCSS = generateCSSVariables(theme.colors.light, false)
    const darkCSS = generateCSSVariables(theme.colors.dark, true)
    
    // Read current globals.css
    const globalsPath = join(process.cwd(), 'src', 'app', 'globals.css')
    let globalsContent = readFileSync(globalsPath, 'utf-8')
    
    // Find and replace the theme variables section
    const themeStart = '@layer base {\n  :root {'
    const themeEndPattern = /  }\n\n  \.dark \{[\s\S]*?  }\n}/
    
    const startIndex = globalsContent.indexOf(themeStart)
    if (startIndex === -1) {
      console.error('❌ Could not find theme section in globals.css')
      process.exit(1)
    }
    
    const match = globalsContent.match(themeEndPattern)
    if (!match) {
      console.error('❌ Could not find complete theme section in globals.css')
      process.exit(1)
    }
    
    const endIndex = startIndex + match.index! + match[0].length
    
    const beforeTheme = globalsContent.substring(0, startIndex)
    const afterTheme = globalsContent.substring(endIndex)
    
    const newThemeSection = `@layer base {\n${lightCSS}\n${darkCSS}}`
    
    const newGlobalsContent = beforeTheme + newThemeSection + afterTheme
    
    // Write updated globals.css
    writeFileSync(globalsPath, newGlobalsContent)
    
    console.log('✅ Theme applied successfully!')
    console.log(`📁 Updated: ${globalsPath}`)
    console.log(`🚀 You can now run 'npm run dev' to see the changes`)
    
  } catch (error) {
    console.error('❌ Error applying theme:', error)
    process.exit(1)
  }
}

// CLI usage
const themeName = process.argv[2]

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🎨 tweakcn Theme Switcher

Usage:
  tsx scripts/apply-tweakcn-theme.ts [theme-name]
  npm run theme:apply [theme-name]

Available commands:
  npm run theme:apply                    # Apply default theme
  npm run theme:apply yellowPurpleBlack  # Apply specific theme
  npm run theme:apply sageMint           # Apply sage mint theme  
  npm run theme:apply flamingo           # Apply flamingo theme

Examples:
  tsx scripts/apply-tweakcn-theme.ts sageMint
  npm run theme:sage
`)
  process.exit(0)
}

applyTheme(themeName)