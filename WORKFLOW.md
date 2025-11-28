# Phoebe Charts - Complete Workflow

Visual guide showing how everything connects.

## 📊 Project Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PHOEBE CHARTS PROJECT                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Library Source  │         │   Demo App       │         │
│  │                   │         │                  │         │
│  │  projects/        │────────▶│  projects/demo/  │         │
│  │  phoebe-charts/   │         │                  │         │
│  │                   │         │  (for testing)   │         │
│  └────────┬──────────┘         └──────────────────┘         │
│           │                                                  │
│           │ npm run build                                    │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   Built Package   │                                       │
│  │                   │                                       │
│  │  dist/            │                                       │
│  │  phoebe-charts/   │                                       │
│  │                   │                                       │
│  │  ├── package.json │                                       │
│  │  ├── README.md    │                                       │
│  │  ├── LICENSE      │                                       │
│  │  ├── *.d.ts       │                                       │
│  │  └── *.mjs        │                                       │
│  └────────┬──────────┘                                       │
│           │                                                  │
│           │ npm publish                                      │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │   NPM Registry    │                                       │
│  │   npmjs.com       │                                       │
│  └──────────────────┘                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Development to Publication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT CYCLE                        │
└─────────────────────────────────────────────────────────────┘

1️⃣  DEVELOP
   ├─ Edit library code in projects/phoebe-charts/src/
   ├─ Test locally with demo app (npm start)
   └─ Run tests (npm test)
           │
           ▼
2️⃣  BUILD
   ├─ npm run build
   ├─ Compiles TypeScript → JavaScript
   ├─ Generates type definitions (.d.ts)
   ├─ Creates ESM bundles
   └─ Copies README, LICENSE → dist/
           │
           ▼
3️⃣  VERIFY
   ├─ Check dist/phoebe-charts/ contents
   ├─ Review package.json
   └─ Test with npm pack --dry-run
           │
           ▼
4️⃣  PUBLISH
   ├─ npm login (one time)
   ├─ cd dist/phoebe-charts
   ├─ npm publish --access public
   └─ Package goes live on npmjs.com
           │
           ▼
5️⃣  CONSUME
   ├─ Others: npm install @you/phoebe-charts
   ├─ Import components in their apps
   └─ Create beautiful charts!
```

## 📁 File Organization

```
phoebe-charts/
│
├── 📄 README.md                      # ← Main project README
├── 📄 README_NPM_SETUP.md           # ← 🎯 START HERE for publishing
├── 📄 QUICK_START.md                # ← Fast-track guide
├── 📄 NPM_PUBLISHING_GUIDE.md       # ← Detailed instructions
├── 📄 CONSUMING_LIBRARY.md          # ← Usage examples
├── 📄 PUBLISH_CHECKLIST.md          # ← Pre-publish verification
├── 📄 WORKFLOW.md                   # ← This file
├── 🔧 publish-to-npm.sh             # ← Automated publish script
├── 📦 package.json                  # ← Root package config
│
├── projects/
│   ├── phoebe-charts/               # ← 📚 YOUR LIBRARY
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   │   └── line-chart/
│   │   │   │   │       ├── line-chart.component.ts    # ← Main component
│   │   │   │   │       └── line-chart.component.spec.ts
│   │   │   │   └── models/
│   │   │   │       └── chart-data.model.ts            # ← Type definitions
│   │   │   └── public-api.ts        # ← What gets exported
│   │   ├── package.json             # ← 📝 EDIT THIS before publishing!
│   │   ├── README.md                # ← Goes to NPM
│   │   └── LICENSE                  # ← MIT License
│   │
│   └── demo/                        # ← 🎨 Demo app for testing
│       └── src/
│           └── app/
│               └── app.component.ts # ← Example usage
│
└── dist/                            # ← 📦 Built package (ready for NPM)
    └── phoebe-charts/
        ├── package.json
        ├── README.md
        ├── LICENSE
        ├── index.d.ts
        ├── esm2022/
        └── fesm2022/
```

## 🚀 Publishing Workflow (Step by Step)

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLISHING CHECKLIST                      │
└─────────────────────────────────────────────────────────────┘

📝 PREPARATION (One time)
   ┌────────────────────────────────────────────────┐
   │ 1. Create NPM account (npmjs.com)             │
   │ 2. Login locally: npm login                   │
   │ 3. Update package.json:                       │
   │    - name: @your-username/phoebe-charts       │
   │    - version: 1.0.0                           │
   │    - repository: your-github-url              │
   │    - author: your-name                        │
   │ 4. (Optional) Setup git repository            │
   └────────────────────────────────────────────────┘
                      │
                      ▼
🔨 BUILD
   ┌────────────────────────────────────────────────┐
   │ npm run build                                  │
   │                                                │
   │ Creates: dist/phoebe-charts/                  │
   └────────────────────────────────────────────────┘
                      │
                      ▼
✅ VERIFY
   ┌────────────────────────────────────────────────┐
   │ cd dist/phoebe-charts                         │
   │ npm pack --dry-run                            │
   │                                                │
   │ Review what will be published                 │
   └────────────────────────────────────────────────┘
                      │
                      ▼
🚀 PUBLISH
   ┌────────────────────────────────────────────────┐
   │ npm publish --access public                   │
   │                                                │
   │ OR use: ./publish-to-npm.sh (automated)       │
   └────────────────────────────────────────────────┘
                      │
                      ▼
🎉 SUCCESS!
   ┌────────────────────────────────────────────────┐
   │ Visit: npmjs.com/package/@you/phoebe-charts   │
   │                                                │
   │ Your library is now public!                   │
   └────────────────────────────────────────────────┘
```

## 🔄 Update Workflow (Future Changes)

```
1. Make changes to code
   └─ Edit files in projects/phoebe-charts/src/

2. Test locally
   └─ npm start (runs demo app)

3. Update version
   └─ Edit projects/phoebe-charts/package.json
   └─ Follow semantic versioning:
      • 1.0.0 → 1.0.1 (patch: bug fixes)
      • 1.0.0 → 1.1.0 (minor: new features)
      • 1.0.0 → 2.0.0 (major: breaking changes)

4. Commit changes (if using git)
   └─ git commit -am "Version x.y.z: description"

5. Rebuild
   └─ npm run build

6. Publish
   └─ cd dist/phoebe-charts && npm publish

7. Tag release (if using git)
   └─ git tag vx.y.z
   └─ git push --tags
```

## 🧪 Testing Workflow

```
LOCAL TESTING (Before Publishing)
┌────────────────────────────────────────┐
│ npm start                              │
│ └─ Opens demo app at localhost:4200   │
│    Test your changes here             │
└────────────────────────────────────────┘

EXTERNAL TESTING (After Publishing)
┌────────────────────────────────────────┐
│ 1. Create new Angular app              │
│    ng new test-app                     │
│                                        │
│ 2. Install your package                │
│    npm install @you/phoebe-charts d3   │
│                                        │
│ 3. Import and use                      │
│    import { LineChartComponent }       │
│      from '@you/phoebe-charts';        │
│                                        │
│ 4. Verify it works                     │
│    ng serve                            │
└────────────────────────────────────────┘
```

## 📚 Documentation Map

```
QUICK REFERENCE              DETAILED GUIDES
┌─────────────────┐         ┌──────────────────────────┐
│ README_NPM_     │         │ NPM_PUBLISHING_GUIDE.md  │
│ SETUP.md        │────────▶│ • Git setup              │
│                 │         │ • Version management     │
│ • Overview      │         │ • Troubleshooting        │
│ • Next steps    │         │ • Best practices         │
└─────────────────┘         └──────────────────────────┘
        │
        └──────────┐         ┌──────────────────────────┐
                   │         │ CONSUMING_LIBRARY.md     │
    ┌──────────────┴────────▶│ • Installation           │
    │              │         │ • Basic usage            │
    │              │         │ • Advanced examples      │
    │              │         │ • API reference          │
    │              │         └──────────────────────────┘
    │              │
    │              │         ┌──────────────────────────┐
    │              └────────▶│ PUBLISH_CHECKLIST.md     │
    │                        │ • Pre-publish tasks      │
    │                        │ • Quality checklist      │
    │                        │ • Post-publish steps     │
    │                        └──────────────────────────┘
    │
    ▼
┌─────────────────┐
│ QUICK_START.md  │
│                 │
│ • Fast track    │
│ • 10-min guide  │
│ • Essential     │
│   steps only    │
└─────────────────┘
```

## 🎯 What to Read When

```
"I want to publish RIGHT NOW!"
└─▶ QUICK_START.md (10 minutes)

"I want to understand the full process"
└─▶ README_NPM_SETUP.md → NPM_PUBLISHING_GUIDE.md

"I published, now what? How do people use it?"
└─▶ CONSUMING_LIBRARY.md

"I want to make sure I didn't miss anything"
└─▶ PUBLISH_CHECKLIST.md

"I need to understand the structure"
└─▶ WORKFLOW.md (this file)

"I want automation"
└─▶ ./publish-to-npm.sh (run the script)
```

## 💡 Tips

1. **Development**: Use `npm run watch` for auto-rebuild during development
2. **Testing**: Always test in demo app before publishing
3. **Versioning**: Follow semantic versioning strictly
4. **Git**: Tag releases for easy rollback
5. **NPM**: Use scoped packages to avoid naming conflicts
6. **Documentation**: Update README with each major feature

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Package name taken" | Use `@your-username/phoebe-charts` |
| "Not logged in" | Run `npm login` |
| "Permission denied" | Add `--access public` flag |
| "Version exists" | Update version in package.json |
| "Build failed" | Check TypeScript errors |
| "Module not found" | Rebuild library: `npm run build` |

## 📞 Help Resources

- **NPM Documentation**: https://docs.npmjs.com/
- **Angular Libraries**: https://angular.io/guide/libraries
- **D3.js Docs**: https://d3js.org/
- **Semantic Versioning**: https://semver.org/

---

**Ready to publish?** Start with [README_NPM_SETUP.md](./README_NPM_SETUP.md)!

