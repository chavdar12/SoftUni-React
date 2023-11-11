#!/bin/bash

# Prompt for component name
read -p "Enter the component name: " name

# Create directory
mkdir -p src/blocks/$name

# Create .tsx file with example content
cat <<EOT > src/blocks/$name/${name}.tsx

import { Block } from "#components";

function ${name}() {
  return (
    <Block>
    </Block>
  );
}
export default ${name};
EOT

# Create index.ts file with example content
echo "export { default as ${name} } from './${name}';" > src/blocks/$name/index.ts

echo "Component $name created successfully."
