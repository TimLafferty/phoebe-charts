# GitHub Setup Guide

Your local git repository has been successfully created! 🎉

## ✅ What's Been Done

- ✓ Git repository initialized
- ✓ All project files committed
- ✓ Working on `main` branch
- ✓ Commit hash: `4a6b767`
- ✓ 43 files tracked (17,456+ lines)

## 📊 Repository Status

```
Repository: phoebe-charts
Branch: main
Commits: 1
Status: Clean working tree
Files tracked: 43
```

## 🚀 Connect to GitHub (Next Steps)

### Option 1: Using GitHub CLI (Fastest)

If you have GitHub CLI installed:

```bash
cd /Users/timlafferty/Repos/phoebe-charts
gh repo create phoebe-charts --public --source=. --remote=origin --push
```

This will:
- Create the repo on GitHub
- Add it as remote origin
- Push your code automatically

### Option 2: Using GitHub Web Interface (Recommended)

#### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `phoebe-charts`
3. Description: `Angular charting library built on D3.js`
4. Visibility: **Public** (required for free NPM packages)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click "Create repository"

#### Step 2: Connect Your Local Repository

GitHub will show you commands. Use these:

```bash
cd /Users/timlafferty/Repos/phoebe-charts

# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/phoebe-charts.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your actual GitHub username!

### Option 3: Using SSH (If you have SSH keys set up)

```bash
cd /Users/timlafferty/Repos/phoebe-charts

# Add remote using SSH
git remote add origin git@github.com:YOUR-USERNAME/phoebe-charts.git

# Push to GitHub
git push -u origin main
```

## 📝 After Connecting to GitHub

### Update Package.json

Once your GitHub repo is created, update the repository URL in:

**`projects/phoebe-charts/package.json`:**

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/phoebe-charts.git"
  }
}
```

### Commit This Change

```bash
git add projects/phoebe-charts/package.json
git commit -m "Update repository URL in package.json"
git push
```

## 🏷️ Adding a Version Tag

After your first NPM publish, create a git tag:

```bash
# After successful NPM publish
git tag v1.0.0
git push origin v1.0.0
```

This allows you to:
- Track releases
- Roll back if needed
- Create GitHub releases

## 📦 GitHub Release (Optional but Recommended)

After pushing your tag:

1. Go to: `https://github.com/YOUR-USERNAME/phoebe-charts/releases`
2. Click "Create a new release"
3. Choose tag: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description:
   ```markdown
   ## 🎉 Initial Release
   
   Phoebe Charts v1.0.0 - Angular charting library built on D3.js
   
   ### Features
   - 📊 LineChartComponent with D3.js
   - 🎨 Customizable styling and configuration
   - ⚡ Smooth animations
   - 📱 Responsive design
   - 🎯 Full TypeScript support
   
   ### Installation
   ```bash
   npm install @your-username/phoebe-charts d3
   ```
   
   ### Documentation
   See [README](https://github.com/YOUR-USERNAME/phoebe-charts#readme) for usage examples.
   ```
6. Click "Publish release"

## 🔄 Daily Workflow

After initial setup, your typical workflow:

```bash
# Make changes to your code
# ...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add new feature: XYZ"

# Push to GitHub
git push

# When ready to publish new version:
# 1. Update version in package.json
# 2. Commit version bump
# 3. Create tag
# 4. Push tag
# 5. Publish to NPM
```

## 🎯 Quick Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote info
git remote -v

# Create and push a tag
git tag v1.0.0
git push origin v1.0.0

# View all tags
git tag

# Push all tags at once
git push --tags
```

## 🔒 Important: Keep .gitignore Updated

Your `.gitignore` already excludes:
- ✓ `/node_modules`
- ✓ `/dist`
- ✓ `/.angular/cache`
- ✓ IDE files

These should **never** be committed!

## 🌟 Add Badges to README (After Publishing)

Add these to your GitHub README after publishing to NPM:

```markdown
[![npm version](https://badge.fury.io/js/%40YOUR-USERNAME%2Fphoebe-charts.svg)](https://www.npmjs.com/package/@YOUR-USERNAME/phoebe-charts)
[![npm downloads](https://img.shields.io/npm/dm/@YOUR-USERNAME/phoebe-charts.svg)](https://www.npmjs.com/package/@YOUR-USERNAME/phoebe-charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

## ✅ Verification Checklist

After connecting to GitHub, verify:

- [ ] Repository visible at `github.com/YOUR-USERNAME/phoebe-charts`
- [ ] All 43 files showing on GitHub
- [ ] README.md displays correctly
- [ ] LICENSE file visible
- [ ] Can clone: `git clone https://github.com/YOUR-USERNAME/phoebe-charts.git`

## 🆘 Troubleshooting

### "Remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR-USERNAME/phoebe-charts.git
```

### "Permission denied" or authentication issues

For HTTPS, use a Personal Access Token:
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Select scopes: `repo` (all)
4. Use token as password when pushing

Or switch to SSH:
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys
3. Use SSH remote URL

### "Updates were rejected because the remote contains work"

This shouldn't happen for a fresh repo, but if it does:

```bash
git pull origin main --rebase
git push -u origin main
```

## 📚 Resources

- [GitHub Docs](https://docs.github.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub CLI](https://cli.github.com/)

---

**Your local git repository is ready!**

Next step: Create the GitHub repository and connect it using the instructions above. ⬆️

After that, you'll be ready to publish to NPM! 🚀

