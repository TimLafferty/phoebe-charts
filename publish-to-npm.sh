#!/bin/bash

# Phoebe Charts - NPM Publishing Script
# This script helps automate the publishing process

set -e  # Exit on error

echo "🚀 Phoebe Charts - NPM Publishing Helper"
echo "========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }
print_info() { echo -e "ℹ $1"; }

# Check if logged into NPM
echo "1. Checking NPM authentication..."
if npm whoami &> /dev/null; then
    NPM_USER=$(npm whoami)
    print_success "Logged in as: $NPM_USER"
else
    print_error "Not logged into NPM"
    echo "Please run: npm login"
    exit 1
fi

# Check package.json
echo ""
echo "2. Checking package configuration..."
PKG_NAME=$(node -p "require('./phoebe-charts/package.json').name")
PKG_VERSION=$(node -p "require('./phoebe-charts/package.json').version")
PKG_REPO=$(node -p "require('./phoebe-charts/package.json').repository.url")

print_info "Package name: $PKG_NAME"
print_info "Version: $PKG_VERSION"
print_info "Repository: $PKG_REPO"

# Check if repository URL needs updating
if [[ $PKG_REPO == *"your-username"* ]]; then
    print_warning "Repository URL still contains 'your-username'"
    print_warning "Update it in: projects/phoebe-charts/package.json"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if package name needs updating
if [[ $PKG_NAME == "phoebe-charts" ]]; then
    print_warning "Using unscoped package name"
    print_info "Consider using scoped name: @$NPM_USER/phoebe-charts"
    read -p "Continue with current name? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build the library
echo ""
echo "3. Building library..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Verify dist folder
echo ""
echo "4. Verifying dist folder..."
if [ -d "dist/phoebe-charts" ]; then
    print_success "dist/phoebe-charts exists"

    # List files that will be published
    echo ""
    print_info "Files to be published:"
    cd dist/phoebe-charts
    npm pack --dry-run 2>&1 | grep -E "^npm notice"
    cd ../..
else
    print_error "dist/phoebe-charts not found"
    exit 1
fi

# Confirm publication
echo ""
echo "5. Ready to publish"
print_warning "This will publish $PKG_NAME@$PKG_VERSION to NPM"
read -p "Proceed with publication? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Publishing to NPM..."
    cd dist/phoebe-charts

    # Check if scoped package
    if [[ $PKG_NAME == @* ]]; then
        npm publish --access public
    else
        npm publish
    fi

    if [ $? -eq 0 ]; then
        print_success "Successfully published $PKG_NAME@$PKG_VERSION"
        echo ""
        print_info "View at: https://www.npmjs.com/package/$PKG_NAME"
        echo ""
        echo "Next steps:"
        echo "  1. Create git tag: git tag v$PKG_VERSION"
        echo "  2. Push tag: git push origin v$PKG_VERSION"
        echo "  3. Create GitHub release"
        echo "  4. Test installation: npm install $PKG_NAME"
    else
        print_error "Publication failed"
        cd ../..
        exit 1
    fi
    cd ../..
else
    print_info "Publication cancelled"
    exit 0
fi

