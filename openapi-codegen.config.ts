import { generateSchemaTypes } from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';

export default defineConfig({
  api: {
    from: {
      source: 'url',
      url: `http://localhost:8080/v3/api-docs`
    },
    outputDir: '/src/api',
    to: async (context) => {
      const filenamePrefix = 'api';

      await generateSchemaTypes(context, {
        filenamePrefix
      });
    }
  }
});
