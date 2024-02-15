export default {
  api: {
    input: './temp/spec.json',
    output: {
      target: './src/generated/api.ts',
      mode: 'single',
      client: 'axios-functions',
      override: {
        mutator: {
          path: './src/axiosInstance.ts'
        }
      }
    }
  }
}
