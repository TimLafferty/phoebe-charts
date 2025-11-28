# NPM Publishing Guide for Phoebe Charts

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **NPM CLI Login**: Run `npm login` to authenticate

## Step 1: Initialize Git Repository

```bash
cd /Users/timlafferty/Repos/phoebe-charts
git init
git add .
git commit -m "Initial commit: Phoebe Charts library"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `phoebe-charts`
3. Don't initialize with README (we already have one)
4. Copy the repository URL

## Step 3: Link Local to Remote Repository

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/phoebe-charts.git
git branch -M main
git push -u origin main
```

## Step 4: Update Package.json Repository URL

Edit `projects/phoebe-charts/package.json` and update:
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/phoebe-charts.git"
  }
}
```

## Step 5: Choose Package Name

You have two options:

### Option A: Scoped Package (Recommended)
Update package name to `@your-username/phoebe-charts` in `projects/phoebe-charts/package.json`:
```json
{
  "name": "@your-username/phoebe-charts"
}
```

Benefits:
- No naming conflicts with existing packages
- Can publish public or private
- Professional appearance

### Option B: Unscoped Package
Keep name as `phoebe-charts` (must be globally unique on NPM)

**Important**: Check if the name is available:
```bash
npm search phoebe-charts
```

## Step 6: Update Version

In `projects/phoebe-charts/package.json`, update version if needed:
```json
{
  "version": "1.0.0"  // Change from 0.0.1 for initial release
}
```

## Step 7: Build the Library

```bash
npm run build
```

This creates the distributable files in `dist/phoebe-charts/`

## Step 8: Publish to NPM

```bash
cd dist/phoebe-charts
npm publish
```

For scoped packages (if public):
```bash
npm publish --access public
```

## Step 9: Verify Publication

Visit: `https://www.npmjs.com/package/@your-username/phoebe-charts`

## Step 10: Test Installation in External App

Create a new Angular app and install your package:
```bash
ng new test-app
cd test-app
npm install @your-username/phoebe-charts d3
```

## Future Updates

When you make changes:

1. Update version in `projects/phoebe-charts/package.json` (follow [Semantic Versioning](https://semver.org/))
2. Rebuild: `npm run build`
3. Commit and push changes to GitHub
4. Publish: `cd dist/phoebe-charts && npm publish`

## Version Guidelines

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

## NPM Scripts Reference

```bash
npm run build          # Build library
npm run build:demo     # Build demo app
npm run start          # Run demo app
npm run watch          # Build library in watch mode (for development)
npm test              # Run tests
```

## Troubleshooting

### "Package name already exists"
- Use a scoped package name: `@your-username/phoebe-charts`
- Or choose a different unique name

### "You must be logged in"
```bash
npm login
```

### "403 Forbidden"
- For scoped packages, add `--access public`
- Check if you have permission to publish

### "Version already published"
- Update version number in `package.json`
- Can't republish same version

## Adding a License File

Create `projects/phoebe-charts/LICENSE`:
```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

