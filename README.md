# Phoebe Charts

A modern Angular charting library built on D3.js for creating beautiful and interactive data visualizations.

## 🚀 Ready to Publish to NPM!

Your library is **built and ready** for NPM publication. 

**👉 Start here**: [README_NPM_SETUP.md](./README_NPM_SETUP.md)

### Quick Publish (3 steps)

```bash
# 1. Update your info in projects/phoebe-charts/package.json
# 2. Login to NPM
npm login

# 3. Publish
./publish-to-npm.sh
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[README_NPM_SETUP.md](./README_NPM_SETUP.md)** | **START HERE** - Overview and next steps |
| **[QUICK_START.md](./QUICK_START.md)** | Fast-track publishing guide (10 min) |
| **[NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)** | Detailed publishing instructions |
| **[CONSUMING_LIBRARY.md](./CONSUMING_LIBRARY.md)** | Usage examples for consumers |
| **[PUBLISH_CHECKLIST.md](./PUBLISH_CHECKLIST.md)** | Pre-publication checklist |

## 🛠️ Development

### Library Development

```bash
# Build library
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch

# Run tests
npm test
```

### Demo Application

```bash
# Run demo app
npm start

# Build demo app
npm run build:demo
```

Visit `http://localhost:4200/` to see the demo.

## 📦 Project Structure

```
phoebe-charts/
├── projects/
│   ├── phoebe-charts/          # Main library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/ # Chart components
│   │   │   │   └── models/     # Type definitions
│   │   │   └── public-api.ts   # Public exports
│   │   ├── package.json        # Library package config
│   │   ├── README.md          # NPM package README
│   │   └── LICENSE            # MIT License
│   └── demo/                   # Demo application
│       └── src/
│           └── app/
└── dist/                       # Build output (ready for NPM)
    └── phoebe-charts/
```

## ✨ Features

- 🚀 Angular 17+ with standalone components
- 📊 D3.js powered visualizations
- 🎨 Highly customizable
- ⚡ Performant and responsive
- 📱 Mobile-friendly
- 🎯 Full TypeScript support

## 🧪 Library Status

```
✅ Built and tested
✅ Documentation complete
✅ Ready for NPM publication
✅ Demo app functional
✅ TypeScript definitions included
⏳ Awaiting NPM publication
```

## 📝 Before Publishing

Update `projects/phoebe-charts/package.json`:

1. Package name (use `@your-username/phoebe-charts`)
2. Version number (start with `1.0.0`)
3. Repository URL (your GitHub)
4. Author information

See [QUICK_START.md](./QUICK_START.md) for details.

## 🚀 Publishing

Use the automated script:

```bash
./publish-to-npm.sh
```

Or manually:

```bash
npm run build
cd dist/phoebe-charts
npm publish --access public
```

## 🧪 Testing After Publication

```bash
# Create test app
ng new test-app
cd test-app

# Install your package
npm install @your-username/phoebe-charts d3

# Use in components
import { LineChartComponent } from '@your-username/phoebe-charts';
```

## 📖 API Preview

### LineChartComponent

```typescript
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';

// Use in your template
<phoebe-line-chart [data]="chartData" [config]="config"></phoebe-line-chart>

// Define your data
chartData: DataPoint[] = [
  { x: 0, y: 30 },
  { x: 1, y: 45 },
  // ...
];

config: ChartConfig = {
  width: 800,
  height: 400,
  xAxisLabel: 'Time',
  yAxisLabel: 'Value',
  showGrid: true,
  animate: true
};
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - see [LICENSE](./projects/phoebe-charts/LICENSE) file for details.

## 🆘 Need Help?

- **Publishing**: See [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)
- **Usage**: See [CONSUMING_LIBRARY.md](./CONSUMING_LIBRARY.md)
- **Issues**: Check troubleshooting sections in documentation

---

**Next Step**: Read [README_NPM_SETUP.md](./README_NPM_SETUP.md) to get started!
