#!/bin/bash

# Prompt for component name
read -p "Enter the component name: " name

# Create directory
mkdir -p src/pages/$name

# Create .tsx file with example content
cat <<EOT > src/pages/$name/${name}.tsx
import "./${name}-page.scss";

import { Page } from "#blocks";

function ${name}Page() {
  return (
    <Page>
    </Page>
  );
}
export default ${name}Page;
EOT

# Create index.ts file with example content
echo "export { default as ${name} } from './${name}';" > src/pages/$name/index.ts

echo "Component $name created successfully."
