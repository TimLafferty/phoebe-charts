# Quick Start Guide - Publishing Phoebe Charts to NPM

This guide will help you quickly publish your library to NPM and consume it from an external application.

## Prerequisites

1. **NPM Account**: Sign up at [npmjs.com](https://www.npmjs.com/)
2. **Node.js & NPM**: Already installed ✓
3. **Library Built**: Already completed ✓

## Step 1: Prepare for Publishing (5 minutes)

### A. Login to NPM

```bash
npm login
```

Enter your NPM credentials when prompted.

### B. Update Package Information

Edit `projects/phoebe-charts/package.json`:

**Option 1: Scoped Package (Recommended)**

Replace `your-username` with your NPM username:

```json
{
  "name": "@your-username/phoebe-charts",
  "version": "1.0.0",
  "description": "Angular charting library built on D3.js for data visualizations",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/phoebe-charts.git"
  }
}
```

**Option 2: Unscoped Package**

Keep as `phoebe-charts` (check availability first):
```bash
npm search phoebe-charts
```

### C. Initialize Git (Optional but Recommended)

```bash
git init
git add .
git commit -m "Initial commit: Phoebe Charts v1.0.0"
```

If you have a GitHub repo:
```bash
git remote add origin https://github.com/your-username/phoebe-charts.git
git push -u origin main
```

## Step 2: Publish to NPM (2 minutes)

### Option A: Using the Helper Script (Easiest)

```bash
./publish-to-npm.sh
```

This script will:
- Check your NPM authentication
- Verify package configuration
- Build the library
- Guide you through publication

### Option B: Manual Publishing

```bash
# Build the library
npm run build

# Navigate to dist folder
cd dist/phoebe-charts

# Verify what will be published
npm pack --dry-run

# Publish
npm publish --access public  # For scoped packages
# OR
npm publish                  # For unscoped packages

# Go back to root
cd ../..
```

## Step 3: Verify Publication (1 minute)

Visit your package page:
- Scoped: `https://www.npmjs.com/package/@your-username/phoebe-charts`
- Unscoped: `https://www.npmjs.com/package/phoebe-charts`

Check that:
- ✓ README displays correctly
- ✓ Version is correct
- ✓ Files are listed

## Step 4: Test in External App (5 minutes)

### Create a Test Application

```bash
# Navigate to a different directory (outside this project)
cd ..

# Create new Angular app
ng new test-phoebe-app
cd test-phoebe-app

# Install your published package
npm install @your-username/phoebe-charts d3
```

### Use the Library

Edit `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <div style="padding: 2rem;">
      <h1>Testing Phoebe Charts</h1>
      <phoebe-line-chart
        [data]="data"
        [config]="config">
      </phoebe-line-chart>
    </div>
  `
})
export class AppComponent {
  data: DataPoint[] = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 },
    { x: 4, y: 50 }
  ];

  config: ChartConfig = {
    width: 800,
    height: 400,
    xAxisLabel: 'X Axis',
    yAxisLabel: 'Y Axis',
    showGrid: true,
    animate: true
  };
}
```

### Run the Test App

```bash
ng serve
```

Open `http://localhost:4200` - you should see your chart! 🎉

## Common Issues & Solutions

### ❌ "Package name already exists"

**Solution**: Use a scoped name `@your-username/phoebe-charts`

### ❌ "You do not have permission"

**Solution**: Run `npm login` and use `--access public` for scoped packages

### ❌ "Version already published"

**Solution**: Update version in `projects/phoebe-charts/package.json` and rebuild

### ❌ "Module not found" in test app

**Solutions**:
1. Verify installation: `npm list @your-username/phoebe-charts`
2. Check import path matches package name
3. Restart dev server

### ❌ Chart not displaying

**Solutions**:
1. Check browser console for errors
2. Verify container has dimensions
3. Ensure data is properly formatted

## Next Steps

### Update Your Package

When you make changes:

1. **Update version** in `projects/phoebe-charts/package.json`:
   ```json
   {
     "version": "1.0.1"  // Increment based on semantic versioning
   }
   ```

2. **Rebuild and republish**:
   ```bash
   npm run build
   cd dist/phoebe-charts
   npm publish
   ```

3. **Test the update**:
   ```bash
   # In your test app
   npm update @your-username/phoebe-charts
   ```

### Semantic Versioning Guide

- **1.0.0 → 1.0.1**: Patch (bug fixes)
- **1.0.0 → 1.1.0**: Minor (new features, backward compatible)
- **1.0.0 → 2.0.0**: Major (breaking changes)

## Documentation Reference

- 📖 **CONSUMING_LIBRARY.md** - Detailed usage examples
- 📋 **PUBLISH_CHECKLIST.md** - Complete pre-publish checklist
- 📚 **NPM_PUBLISHING_GUIDE.md** - Comprehensive publishing guide
- 🛠️ **publish-to-npm.sh** - Automated publishing script

## Development Workflow

```bash
# Make changes to library
# ...

# Test in demo app
npm start

# Build library
npm run build

# Watch mode for development
npm run watch

# Run tests
npm test

# Publish updates
./publish-to-npm.sh
```

## Getting Help

1. Check the documentation files listed above
2. Review error messages carefully
3. Check NPM and Angular documentation
4. Open an issue on GitHub

## Success Checklist

- [x] Library built successfully
- [ ] Package.json updated with your information
- [ ] Logged into NPM
- [ ] Published to NPM
- [ ] Package visible on npmjs.com
- [ ] Tested installation in external app
- [ ] Chart renders correctly in test app

---

**Congratulations! 🎉**

Your library is now published and ready to use. Share it with the world!

```bash
# Share your package
echo "Check out my new Angular charting library:"
echo "npm install @your-username/phoebe-charts"
```

