# Pre-Publishing Checklist

Before publishing to NPM, complete these steps:

## 1. ✅ Update Package Information

- [ ] Update `projects/phoebe-charts/package.json`:
  - [ ] Set package name (scoped recommended: `@your-username/phoebe-charts`)
  - [ ] Set version (start with `1.0.0` for first release)
  - [ ] Update repository URL with your GitHub username
  - [ ] Update author information

Example:
```json
{
  "name": "@your-username/phoebe-charts",
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/phoebe-charts.git"
  }
}
```

## 2. ✅ Setup Git Repository

```bash
# Initialize git
git init

# Create .gitignore if needed
echo "node_modules/
dist/
.angular/
*.log" > .gitignore

# Initial commit
git add .
git commit -m "Initial commit: Phoebe Charts v1.0.0"

# Create GitHub repo and link it
git remote add origin https://github.com/your-username/phoebe-charts.git
git branch -M main
git push -u origin main
```

## 3. ✅ Test the Library Locally

```bash
# Build the library
npm run build

# Check the dist folder
ls -la dist/phoebe-charts

# Verify package.json in dist
cat dist/phoebe-charts/package.json
```

## 4. ✅ NPM Setup

```bash
# Login to NPM (one time)
npm login

# Verify you're logged in
npm whoami
```

## 5. ✅ Publish to NPM

```bash
# Build one more time to ensure latest changes
npm run build

# Navigate to dist folder
cd dist/phoebe-charts

# Check what will be published
npm pack --dry-run

# Publish (for scoped public package)
npm publish --access public

# Or for unscoped package
npm publish
```

## 6. ✅ Verify Publication

- [ ] Visit: https://www.npmjs.com/package/@your-username/phoebe-charts
- [ ] Check that README displays correctly
- [ ] Verify version number is correct

## 7. ✅ Test Installation in New Project

```bash
# Create new test project
ng new test-phoebe-charts
cd test-phoebe-charts

# Install your published package
npm install @your-username/phoebe-charts d3

# Test import in a component
# See CONSUMING_LIBRARY.md for examples
```

## 8. ✅ Update GitHub Repository

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Create a release on GitHub
# Go to: https://github.com/your-username/phoebe-charts/releases/new
```

## Future Updates

When making changes for a new version:

1. Make your code changes
2. Update version in `projects/phoebe-charts/package.json`
3. Update CHANGELOG.md (if you have one)
4. Commit changes: `git commit -am "Version x.y.z: description"`
5. Tag: `git tag vx.y.z`
6. Push: `git push && git push --tags`
7. Build: `npm run build`
8. Publish: `cd dist/phoebe-charts && npm publish`

## Common Issues

### "Package name already taken"
Solution: Use a scoped name `@your-username/phoebe-charts`

### "You do not have permission to publish"
Solution: 
- Make sure you're logged in: `npm whoami`
- For scoped packages: use `npm publish --access public`

### "Version already exists"
Solution: Update version number in `package.json` and rebuild

### "Git working directory not clean"
Solution: Commit or stash changes before tagging

## Package Quality Checklist

- [x] README.md with clear documentation
- [x] LICENSE file
- [x] TypeScript definitions included
- [x] Peer dependencies specified
- [x] Keywords for discoverability
- [ ] Examples in README
- [ ] API documentation
- [ ] Tests passing
- [ ] No security vulnerabilities: `npm audit`
- [ ] Proper .npmignore (or use files field in package.json)

## Post-Publication

1. Announce on social media
2. Create a demo website (GitHub Pages)
3. Write a blog post
4. Add badges to README:
   - NPM version
   - NPM downloads
   - License
   - Build status

Example badges:
```markdown
[![npm version](https://badge.fury.io/js/%40your-username%2Fphoebe-charts.svg)](https://www.npmjs.com/package/@your-username/phoebe-charts)
[![npm downloads](https://img.shields.io/npm/dm/@your-username/phoebe-charts.svg)](https://www.npmjs.com/package/@your-username/phoebe-charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

